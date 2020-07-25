import { IDocument } from '~/document/document.interface';
import { INode } from '~/node/node.interface';
import { IPage } from '~/page/page.interface';
// import dayjs from 'dayjs';
import * as dayjs from 'dayjs'
import 'dayjs/locale/ja';

const createDate = dayjs('2020-07-07').format()
const updateDate = dayjs('2020/08/08').format()

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
  }
]

const node: INode = {
  pageTitle: pages[0].pageTitle,
  pageId: pages[0].pageId,
  nodes: [
    {
      pageTitle: pages[1].pageTitle,
      pageId: pages[1].pageId,
      nodes: []
    },
    {
      pageTitle: pages[2].pageTitle,
      pageId: pages[2].pageId,
      nodes: [
        {
          pageTitle: pages[3].pageTitle,
          pageId: pages[3].pageId,
          nodes: []
        },
        {
          pageTitle: pages[4].pageTitle,
          pageId: pages[4].pageId,
          nodes: [
            {
              pageTitle: pages[5].pageTitle,
              pageId: pages[5].pageId,
              nodes: []
            },
            {
              pageTitle: pages[6].pageTitle,
              pageId: pages[6].pageId,
              nodes: [
                {
                  pageTitle: pages[7].pageTitle,
                  pageId: pages[7].pageId,
                  nodes: []
                },
                {
                  pageTitle: pages[8].pageTitle,
                  pageId: pages[8].pageId,
                  nodes: []
                }
              ]
            },
            {
              pageTitle: pages[9].pageTitle,
              pageId: pages[9].pageId,
              nodes: []
            }
          ]
        }
      ]
    },
    {
      pageTitle: pages[10].pageTitle,
      pageId: pages[10].pageId,
      nodes: []
    }
  ]
}

const document: IDocument = {
  documentId: pages[0].documentId,
  documentTile: pages[0].pageTitle,
  node: node,
  createdAt: pages[0].createdAt,
  updatedAt: pages[0].updatedAt
}

export function getTreeDummyDocument(): IDocument {
  return document
}

export function getTreeDummyPages(): Array<IPage> {
  return pages
}
