import { Injectable } from '@nestjs/common';
import { dummyStore } from '~/dummystore/DummyStore';
import { nodeNestHandler, UNMATCH } from './node-nest-handler';
import { INode } from '~/node/node.interface';
import { IPage } from '~/page/page.interface';
import { Node } from '~/node/node';

@Injectable()
export class NodeService {
  createNodeFromPage(page: IPage): INode {
    return new Node(page.pageId, page.pageTitle, [])
  }

  prevendNewDocumentNode(
    targetPageId: string,
    documentId: string,
    newDocumentNode: INode
  ):void {
    const document = dummyStore.getDocument(documentId)
    if (!document) {
      throw new Error(`ドキュメントノード未発見 documentId=${documentId}`)
    }

    const result = nodeNestHandler.prevendChileTargetNode(
      targetPageId,
      document.node,
      newDocumentNode
    )

    if (!result) {
      throw new Error(`ドキュメントノード未発見 pageId=${targetPageId}`)
    }
  }

  appendNewDocumentNode(
    targetPageId: string,
    documentId: string,
    newDocumentNode: INode
  ): void {
    const document = dummyStore.getDocument(documentId)
    if (!document) {
      throw new Error(`ドキュメントノード未発見 documentId=${documentId}`)
    }

    const result = nodeNestHandler.appendNextTargetNode(
      targetPageId,
      document.node,
      newDocumentNode
    )

    if (result === UNMATCH) {
      throw new Error(`ドキュメントノード未発見 pageId=${targetPageId}`)
    }
  }
}
