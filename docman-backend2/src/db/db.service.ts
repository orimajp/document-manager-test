import { Injectable } from '@nestjs/common';
import { INode } from '../nodes/node.interface';
import { Asset, collections, Node, Page } from './db';
import { ObjectID } from 'mongodb';
import { IDocument } from '../documents/document.interface';
import { NewDocument } from '../documents/new-document.interface';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { IPage } from '../pages/page.interface';
import { IDocumentList } from '../documents/document-list.interface';
import { IAsset } from '../assets/asset.interface';
import { IIndex } from '../indexes/index.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const remark = require('remark');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const strip = require('strip-markdown');
import { UpdateDocumentNodes } from '../documents/update-document-nodes.interface';
import { NewPage } from '../pages/new-page.interface';

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
        $expr: { $eq: ['_id', 'documentId'] },
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
      _id: new ObjectID(targetDocumentId),
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
  async registerDocument(document: NewDocument): Promise<string> {
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

    return id.toHexString();
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
      _id: new ObjectID(documentId),
    });
    if (!page) {
      return null;
    }

    // 更新ノードをMap化
    const iNodeKeyMap = createINodeKeyMap(documentId, updateDocumentNodes);

    // ノードカーソル取得
    const nodeCursor = await collections.nodes.find({
      documentId: new ObjectID(documentId),
    });

    // 件数比較、違ってたらエラー
    const iNodeKeyCount = iNodeKeyMap.size;
    const nodeCount = await nodeCursor.count();
    if (iNodeKeyCount !== nodeCount) {
      throw new Error('更新件数不一致');
    }

    // ノードリスト更新、マッチしなかったらエラー
    const nodeList = await nodeCursor.toArray();
    updateNodeList(nodeList, iNodeKeyMap);

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
      _id: new ObjectID(pageId),
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
      { _id: new ObjectID(updatePage.pageId) },
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
    // 別途ノード登録も行う
    const date = dayjs().format();
    const page: Page = {
      documentId: new ObjectID(newPage.documentId),
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
    const node = await collections.pages.findOne<Node>({
      _id: new ObjectID(page.documentId),
    });
    if (!node) {
      throw new Error('ページ未発見');
    }

    const nodes = node.nodes;
    nodes.unshift(new ObjectID(page.pageId));
    await collections.pages.updateOne(
      { _id: new ObjectID(page.documentId) },
      { $set: { nodes: nodes } },
    );
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
    const node = await collections.pages.findOne<Node>({
      _id: new ObjectID(targetPageId),
    });
    if (!node) {
      throw new Error('ページ未発見');
    }

    const nodes = node.nodes;
    nodes.unshift(new ObjectID(page.pageId));
    await collections.pages.updateOne(
      { _id: new ObjectID(targetPageId) },
      { $set: { nodes: nodes } },
    );
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
    const node = await collections.pages.findOne<Node>({
      _id: new ObjectID(targetPageId),
    });
    if (!node) {
      throw new Error('ページ未発見');
    }
    const parentNode = await collections.pages.findOne<Node>({
      _id: node.parentId,
    });
    if (!parentNode) {
      throw new Error('親ページ未発見');
    }
    const nodes = parentNode.nodes;
    nodes.concat(new ObjectID(page.pageId));
    await collections.pages.updateOne(
      { _id: node.parentId },
      { $set: { nodes: nodes } },
    );
  }

  /**
   * アセット登録
   * @param newAsset 新規アセット
   */
  async registerAsset(newAsset: IAsset): Promise<string> {
    const asset: Asset = {
      fileName: newAsset.fileName,
      mimeType: newAsset.mimeType,
      buffer: newAsset.buffer,
    };
    const createdAsset = await collections.assets.insertOne(asset);
    return createdAsset.insertedId.toHexString();
  }

  /**
   * アセット取得
   * @param id アセットID
   */
  async getAsset(id: string): Promise<Asset | null> {
    const asset = collections.assets.findOne<Asset>({
      _id: new ObjectID(id),
    });

    return asset ? asset : null;
  }

  /**
   * インデックス取得
   * @param documentId
   */
  async getIndexList(documentId: string): Promise<Array<IIndex>> {
    return await collections.pages
      .find({
        _id: new ObjectID(documentId),
      })
      .map((page) => {
        return {
          ref: page._id.toHexString(),
          title: page.pageTitle,
          body: page.searchData,
        };
      })
      .toArray();
  }
}

async function getNodeByDocumentId(documentId: string): Promise<INode | null> {
  const nodePageMap = new Map<ObjectID, Node & { page: Page }>();

  await collections.nodes
    .aggregate<Node & { page: Page }>([
      {
        $match: { documentId: new ObjectID(documentId) },
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
      nodePages.forEach((nodePage) => nodePageMap.set(nodePage._id, nodePage));
    });

  const documentNode = nodePageMap.get(new ObjectID(documentId));
  if (!documentNode) {
    return null;
  }
  return toINode(documentNode, nodePageMap);
}

function toINode(
  targetNode: Node & { page: Page },
  map: Map<ObjectID, Node & { page: Page }>,
): INode {
  const returnINode = {
    pageId: targetNode._id.toHexString(),
    pageTitle: targetNode.page.pageTitle,
    nodes: [],
  };

  if (targetNode.nodes.length === 0) {
    return returnINode;
  }

  for (const id of targetNode.nodes) {
    const node = map.get(id);
    const iNode = toINode(node, map);
    returnINode.nodes.push(iNode);
  }
}

function createSearchData(pageData: string): string {
  return remark().use(strip).processSync(pageData).toString();
}

function createUpdateNodeCommandList(nodes: Node[]) {
  const list = [];
  nodes.forEach((node) => {
    list.push({
      updateOne: node,
    });
  });
  return list;
}

function updateNodeList(
  nodeList: Node[],
  iNodeKeyMap: Map<string, IModifiableNode>,
): void {
  nodeList.forEach((node) => {
    const modifyNode = iNodeKeyMap.get(node._id.toHexString());
    if (!modifyNode) {
      throw new Error('更新ノード不一致');
    }
    node.parentId = new ObjectID(modifyNode.parentId);
    const nodes = [];
    modifyNode.nodes.forEach((childId) => {
      nodes.push(new ObjectID(childId));
    });
    node.nodes = nodes;
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
