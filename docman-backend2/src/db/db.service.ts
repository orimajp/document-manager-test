import { Injectable } from '@nestjs/common';
import { INode } from '../nodes/node.interface';
import { Asset, collections, Node, Page } from './db';
import { BulkWriteOperation, ObjectId } from 'mongodb';
import { Binary } from 'bson';
import { IDocument } from '../documents/document.interface';
import { NewDocument } from '../documents/new-document.interface';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { IPage } from '../pages/page.interface';
import { IDocumentList } from '../documents/document-list.interface';
import { IAsset } from '../assets/asset.interface';
import { IIndex } from '../indexes/index.interface';
import { UpdateDocumentNodes } from '../documents/update-document-nodes.interface';
import { NewPage } from '../pages/new-page.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const remark = require('remark');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const strip = require('strip-markdown');

// FIXME 正直DBに無関係な処理は別に持って行った方がいい気がする

interface IModifiableNode {
  pageId: string;
  parentId: string;
  nodes: Array<string>;
}

@Injectable()
export class DbService {
  /**
   * 全ドキュメントリスト取得
   */
  async getAllDocumentList(): Promise<Array<IDocumentList>> {
    // 同じドキュメント項目の比較
    // https://docs.mongodb.com/manual/reference/operator/query/expr/
    return await collections.pages
      .find<Page>({
        $expr: { $eq: ['$_id', '$documentId'] },
      })
      .map((page) => {
        return {
          id: page._id.toHexString(),
          title: page.pageTitle,
          createdAt: page.createdAt,
          updatedAt: page.updatedAt,
        };
      })
      .toArray();
  }

  /**
   * ドキュメント取得
   * @param targetDocumentId 対象ドキュメントID
   */
  async getDocumentByDocumentId(
    targetDocumentId: string,
  ): Promise<IDocument | null> {
    const page = await collections.pages.findOne<Page>({
      _id: new ObjectId(targetDocumentId),
    });
    if (!page) {
      return null;
    }

    const node = await getNodeByDocumentId(targetDocumentId);
    return {
      documentId: page._id.toHexString(),
      documentTitle: page.pageTitle,
      node: node,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
    };
  }

  /**
   * 新規ドキュメント登録
   * @param document 新規ドキュメント
   */
  async registerDocument(document: NewDocument): Promise<IDocument | null> {
    const date = dayjs().format();
    const page: Page = {
      pageTitle: document.documentTitle,
      pageData: document.documentData,
      searchData: createSearchData(document.documentData),
      createdAt: date,
      updatedAt: date,
    };

    const newPage = await collections.pages.insertOne(page);
    const id = newPage.insertedId;
    await collections.pages.updateOne(
      {
        _id: id,
      },
      {
        $set: { documentId: id },
      },
    );

    const node: Node = {
      _id: id,
      documentId: id,
      parentId: id,
      nodes: [],
    };
    await collections.nodes.insertOne(node);

    return this.getDocumentByDocumentId(id.toHexString());
  }

  /**
   * ノード更新
   * @param documentId ドキュメントID
   * @param updateDocumentNodes 更新ノード
   */
  async updateDocumentNodes(
    documentId: string,
    updateDocumentNodes: UpdateDocumentNodes,
  ): Promise<IDocument | null> {
    // ノード更新対象ドキュメント取得
    const page = await collections.pages.findOne<Page>({
      _id: new ObjectId(documentId),
    });
    if (!page) {
      return null;
    }

    // 更新ノードをMap化
    const iNodeKeyMap = createINodeKeyMap(documentId, updateDocumentNodes);

    // ノードカーソル取得
    const nodeCursor = await collections.nodes.find({
      documentId: new ObjectId(documentId),
    });

    // 件数比較、違ってたらエラー
    const iNodeKeyCount = iNodeKeyMap.size;
    const nodeCount = await nodeCursor.count();
    // documentノード分加算して比較
    if (iNodeKeyCount + 1 !== nodeCount) {
      throw new Error(
        '更新件数不一致 iNodeKeyCount=' +
          iNodeKeyCount +
          ', nodeCount=' +
          nodeCount,
      );
    }

    // ドキュメントNode配列
    const documentNodes = updateDocumentNodes.nodes;

    // ノードリスト更新、マッチしなかったらエラー
    const nodeList = await nodeCursor.toArray();
    updateNodeList(documentNodes, iNodeKeyMap, nodeList);

    // ノードリスト保存

    const updateNodeCommandList = createUpdateNodeCommandList(nodeList);
    const results = await collections.nodes.bulkWrite(updateNodeCommandList);
    if (results.upsertedCount !== nodeCount) {
      throw new Error('更新実行件数エラー');
    }

    const node = await getNodeByDocumentId(documentId);
    return {
      documentId: page._id.toHexString(),
      documentTitle: page.pageTitle,
      node: node,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
    };
  }

  /**
   * ページ取得
   * @param pageId ページID
   */
  async getPage(pageId: string): Promise<IPage | null> {
    const page = await collections.pages.findOne<Page>({
      _id: new ObjectId(pageId),
    });
    if (!page) {
      return null;
    }

    return {
      pageId: page._id.toHexString(),
      documentId: page.documentId.toHexString(),
      pageTitle: page.pageTitle,
      pageData: page.pageData,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
    };
  }

  /**
   * ページ更新
   * @param updatePage 更新ページ
   */
  async putPage(updatePage: IPage): Promise<void> {
    const date = dayjs().format();
    await collections.pages.updateOne(
      { _id: new ObjectId(updatePage.pageId) },
      {
        $set: {
          pageTitle: updatePage.pageTitle,
          pageData: updatePage.pageData,
          searchData: createSearchData(updatePage.pageData),
          updatedAt: date,
        },
      },
    );
  }

  /**
   * ページ登録
   * @param newPage 新規ページ
   */
  async registerPage(newPage: NewPage): Promise<IPage> {
    const oDocumentId = new ObjectId(newPage.documentId);
    const date = dayjs().format();
    const page: Page = {
      documentId: oDocumentId,
      pageTitle: newPage.pageTitle,
      pageData: newPage.pageData,
      searchData: createSearchData(newPage.pageData),
      createdAt: date,
      updatedAt: date,
    };

    const result = await collections.pages.insertOne(page);
    const createdPage = await collections.pages.findOne<Page>({
      _id: result.insertedId,
    });

    return {
      pageId: result.insertedId.toHexString(),
      documentId: createdPage.documentId.toHexString(),
      pageTitle: createdPage.pageTitle,
      pageData: createdPage.pageData,
      createdAt: createdPage.createdAt,
      updatedAt: createdPage.updatedAt,
    };
  }

  /**
   * ドキュメント先頭にページ追加
   * @param page ページ
   */
  async postPageFirstNode(page: IPage): Promise<void> {
    const oDocumentId = new ObjectId(page.documentId);
    const node = await collections.nodes.findOne<Node>({
      _id: oDocumentId,
    });
    if (!node) {
      throw new Error('ページ未発見');
    }

    const nodes = node.nodes;
    const oPageId = new ObjectId(page.pageId);
    nodes.unshift(oPageId);
    await collections.nodes.updateOne(
      { _id: oDocumentId },
      { $set: { nodes: nodes } },
    );

    const newNode: Node = {
      _id: oPageId,
      documentId: oDocumentId,
      parentId: oDocumentId,
      nodes: [],
    };
    await collections.nodes.insertOne(newNode);
  }

  /**
   * 子要素の先頭にページ追加
   * @param targetPageId 対象ページID
   * @param page ページ
   */
  async postPagePreventChildTargetNode(
    targetPageId: string,
    page: IPage,
  ): Promise<void> {
    const oTargetPageId = new ObjectId(targetPageId);
    const node = await collections.nodes.findOne<Node>({
      _id: oTargetPageId,
    });
    if (!node) {
      throw new Error('ページ未発見');
    }

    const nodes = node.nodes;
    const oPageId = new ObjectId(page.pageId);
    nodes.unshift(oPageId);
    await collections.nodes.updateOne(
      { _id: oTargetPageId },
      { $set: { nodes: nodes } },
    );

    const oDocumentId = new ObjectId(page.documentId);
    const newNode: Node = {
      _id: oPageId,
      documentId: oDocumentId,
      parentId: oTargetPageId,
      nodes: [],
    };
    await collections.nodes.insertOne(newNode);
  }

  /**
   * 次要素にページ追加
   * @param targetPageId 対象ページID
   * @param page ページ
   */
  async postPageAppendNextTargetNode(
    targetPageId: string,
    page: IPage,
  ): Promise<void> {
    const oTargetPageId = new ObjectId(targetPageId);
    const node = await collections.nodes.findOne<Node>({
      _id: oTargetPageId,
    });
    if (!node) {
      throw new Error('ページ未発見');
    }

    const parentNode = await collections.nodes.findOne<Node>({
      _id: node.parentId,
    });
    if (!parentNode) {
      throw new Error('親ページ未発見');
    }

    const nodes = parentNode.nodes;
    const oPageId = new ObjectId(page.pageId);
    const addedNodes = nodes.concat(oPageId);
    await collections.nodes.updateOne(
      { _id: node.parentId },
      { $set: { nodes: addedNodes } },
    );

    const oDocumentId = new ObjectId(page.documentId);
    const newNode: Node = {
      _id: oPageId,
      documentId: oDocumentId,
      parentId: parentNode._id,
      nodes: [],
    };
    await collections.nodes.insertOne(newNode);
  }

  /**
   * アセット登録
   * @param newAsset 新規アセット
   */
  async registerAsset(newAsset: IAsset): Promise<string> {
    const asset: Asset = {
      fileName: newAsset.fileName,
      mimeType: newAsset.mimeType,
      data: new Binary(newAsset.buffer),
    };
    const createdAsset = await collections.assets.insertOne(asset);
    return createdAsset.insertedId.toHexString();
  }

  /**
   * アセット取得
   * @param id アセットID
   */
  async getAsset(id: string): Promise<IAsset | null> {
    const asset = await collections.assets.findOne<Asset>({
      _id: new ObjectId(id),
    });
    if (!asset) {
      return null;
    }

    return {
      fileName: asset.fileName,
      mimeType: asset.mimeType,
      buffer: asset.data.buffer,
    };
  }

  /**
   * インデックス取得
   * @param documentId
   */
  async getIndexList(documentId: string): Promise<Array<IIndex>> {
    const oDocumentId = new ObjectId(documentId);
    const indexes = [];

    await collections.nodes
      .aggregate<Node & { page: Page }>([
        {
          $match: { documentId: oDocumentId },
        },
        {
          $lookup: {
            from: 'pages',
            localField: '_id',
            foreignField: '_id',
            as: 'page',
          },
        },
      ])
      .toArray()
      .then((nodePages) => {
        nodePages.forEach((nodePage) => {
          const page = nodePage.page[0];
          const index = {
            ref: page._id.toHexString(),
            title: page.pageTitle,
            body: page.searchData,
          };
          indexes.push(index);
        });
      });
    return indexes;
  }
}

async function getNodeByDocumentId(documentId: string): Promise<INode | null> {
  const oDocumentId = new ObjectId(documentId);
  const nodePageMap = new Map<string, Node & { page: Page }>();

  await collections.nodes
    .aggregate<Node & { page: Page }>([
      {
        $match: { documentId: oDocumentId },
      },
      {
        $lookup: {
          from: 'pages',
          localField: '_id',
          foreignField: '_id',
          as: 'page',
        },
      },
    ])
    .toArray()
    .then((nodePages) => {
      nodePages.forEach((nodePage) =>
        nodePageMap.set(nodePage._id.toHexString(), nodePage),
      );
    });

  const documentNode = nodePageMap.get(documentId);
  if (!documentNode) {
    return null;
  }
  return toINode(documentNode, nodePageMap);
}

function toINode(
  targetNode: Node & { page: Page },
  map: Map<string, Node & { page: Page }>,
): INode {
  const returnINode = {
    pageId: targetNode._id.toHexString(),
    pageTitle: targetNode.page[0].pageTitle,
    nodes: [],
  };

  if (targetNode.nodes.length === 0) {
    return returnINode;
  }

  for (const id of targetNode.nodes) {
    const idString = id.toHexString();
    console.log(idString);
    const node = map.get(id.toHexString());
    const iNode = toINode(node, map);
    returnINode.nodes.push(iNode);
  }

  return returnINode;
}

function createSearchData(pageData: string): string {
  return remark().use(strip).processSync(pageData).toString();
}

function createUpdateNodeCommandList(
  nodes: Node[],
): Array<BulkWriteOperation<Node>> {
  const list: Array<BulkWriteOperation<Node>> = [];
  nodes.forEach((node) => {
    list.push({
      updateOne: {
        filter: { _id: node._id },
        update: {
          $set: {
            documentId: node.documentId,
            parentId: node.parentId,
            nodes: node.nodes,
          },
        },
      },
    });
  });
  return list;
}

function updateNodeList(
  documentNodes: INode[],
  iNodeKeyMap: Map<string, IModifiableNode>,
  nodeList: Node[],
): void {
  nodeList.forEach((node) => {
    if (node._id.toHexString() === node.documentId.toHexString()) {
      const documentNode = node;
      const oDocumentChildIds = [];
      documentNodes.forEach((node) => {
        oDocumentChildIds.push(new ObjectId(node.pageId));
      });
      documentNode.nodes = oDocumentChildIds;
    } else {
      const modifyNode = iNodeKeyMap.get(node._id.toHexString());
      if (!modifyNode) {
        throw new Error('更新ノード不一致');
      }
      node.parentId = new ObjectId(modifyNode.parentId);
      const nodes = [];
      modifyNode.nodes.forEach((childId) => {
        nodes.push(new ObjectId(childId));
      });
      node.nodes = nodes;
    }
  });
}

function createINodeKeyMap(
  documentId: string,
  updateDocumentNodes: UpdateDocumentNodes,
): Map<string, IModifiableNode> {
  const iNodeKeyMap = new Map<string, IModifiableNode>();
  updateDocumentNodes.nodes.forEach((node) => {
    updateINodeKeyMap(node.pageId, documentId, node.nodes, iNodeKeyMap);
  });
  return iNodeKeyMap;
}

function updateINodeKeyMap(
  pageId: string,
  parentId: string,
  nodes: Array<INode>,
  iNodeKeyMap: Map<string, IModifiableNode>,
): void {
  const childrenKey = [];
  nodes.forEach((node) => {
    childrenKey.push(node.pageId);
  });
  const modifiableNode: IModifiableNode = {
    pageId: pageId,
    parentId: parentId,
    nodes: childrenKey,
  };
  iNodeKeyMap.set(pageId, modifiableNode);
  nodes.forEach((node) => {
    updateINodeKeyMap(node.pageId, pageId, node.nodes, iNodeKeyMap);
  });
}
