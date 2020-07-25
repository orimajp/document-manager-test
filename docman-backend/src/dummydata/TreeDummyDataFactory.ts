import { IDocument } from '~/document/document.interface';
import { INode } from '~/node/node.interface';
import { IPage } from '~/page/page.interface';
// import dayjs from 'dayjs';
import * as dayjs from 'dayjs'
import 'dayjs/locale/ja';
import { IDocumentList } from '~/document/document-list.interface';
import { DocumentList } from '~/document/document-list';

const node: INode = {
  pageTitle: 'ページ0のタイトル(ツリーテスト)',
  pageId: 'page0',
  nodes: [
    {
      pageTitle: 'ページ1',
      pageId: 'page1',
      nodes: []
    },
    {
      pageTitle: 'ページ2',
      pageId: 'page2',
      nodes: [
        {
          pageTitle: 'ページ3',
          pageId: 'page3',
          nodes: []
        },
        {
          pageTitle: 'ページ4',
          pageId: 'page4',
          nodes: [
            {
              pageTitle: 'ページ5',
              pageId: 'page5',
              nodes: []
            },
            {
              pageTitle: 'ページ6',
              pageId: 'page6',
              nodes: [
                {
                  pageTitle: 'ページ7',
                  pageId: 'page7',
                  nodes: []
                },
                {
                  pageTitle: 'ページ8',
                  pageId: 'page8',
                  nodes: []
                }
              ]
            },
            {
              pageTitle: 'ページ9',
              pageId: 'page9',
              nodes: []
            }
          ]
        }
      ]
    },
    {
      pageTitle: 'ページ10',
      pageId: 'page10',
      nodes: []
    }
  ]
}

const createDate = dayjs('2020-07-07').format()
const updateDate = dayjs('2020/08/08').format()

const document: IDocument = {
  documentId: 'page0',
  documentTile: 'ページ0のタイトル(ツリーテスト)',
  node: node,
  createdAt: createDate,
  updatedAt: updateDate
}

const pages:Array<IPage> = [
  {
    documentId: 'page0',
    pageId: 'page0',
    pageTitle: 'ページ0のタイトル(ツリーテスト)',
    pageData: 'ページ0のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page0',
    pageId: 'page1',
    pageTitle: 'ページ1のタイトル',
    pageData: 'ページ1のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page0',
    pageId: 'page2',
    pageTitle: 'ページ2のタイトル',
    pageData: 'ページ2のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page0',
    pageId: 'page3',
    pageTitle: 'ページ3のタイトル',
    pageData: 'ページ3のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page0',
    pageId: 'page4',
    pageTitle: 'ページ4のタイトル',
    pageData: 'ページ4のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page0',
    pageId: 'page5',
    pageTitle: 'ページ5のタイトル',
    pageData: 'ページ5のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page0',
    pageId: 'page6',
    pageTitle: 'ページ6のタイトル',
    pageData: 'ページ6のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page0',
    pageId: 'page7',
    pageTitle: 'ページ7のタイトル',
    pageData: 'ページ7のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page0',
    pageId: 'page8',
    pageTitle: 'ページ8のタイトル',
    pageData: 'ページ8のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page0',
    pageId: 'page9',
    pageTitle: 'ページ9のタイトル',
    pageData: 'ページ9のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page0',
    pageId: 'page10',
    pageTitle: 'ページ10のタイトル',
    pageData: 'ページ10のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page100',
    pageId: 'page100',
    pageTitle: 'ページ100のタイトル',
    pageData: 'ページ100のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page100',
    pageId: 'page101',
    pageTitle: 'ページ101のタイトル',
    pageData: 'ページ101のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  },
  {
    documentId: 'page100',
    pageId: 'page102',
    pageTitle: 'ページ102のタイトル',
    pageData: 'ページ102のデータ',
    createdAt: createDate,
    updatedAt: updateDate
  }
]

export function getTreeDummyDocument(): IDocument {
  return document
}

export function getTreeDummyDocumentList(): IDocumentList {
  // console.log(document)
  return new DocumentList(document.documentId, document.documentTile, document.createdAt, document.updatedAt)
}

export function getTreeDummyPages(): Array<IPage> {
  // console.log(pages)
  return pages
}
