import * as dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { IPage } from '~/page/page.interface';
import { INode } from '~/node/node.interface';
import { IDocument } from '~/document/document.interface';
import * as fs from 'fs';
import * as path from 'path';

const createDate = dayjs('2020-07-07').format()
const updateDate = dayjs('2020/08/08').format()

const pages:Array<IPage> = []
const node: INode = {} as INode
const document: IDocument = {} as IDocument

const pageMap: Map<string, IPage> = new Map<string, IPage>()

interface JsonPage {
  documentId: string
  pageId: string
  pageTitle: string
}

interface JsonNode {
  pageId: string
  nodes: Array<JsonNode>
}

interface JsonData {
  pages: Array<JsonPage>
  node: JsonNode
}

try {
  const jsonBuf = fs.readFileSync(path.join(__dirname, '../../src/filedata/index.json'), { encoding: 'utf-8' })
  const jsonData = JSON.parse(jsonBuf.toString()) as JsonData
  console.log(jsonData)
  createData(jsonData)
  console.log(`page count=${pages.length}`)
  // console.log(document)
  if (!document.documentId) {
    console.error('ドキュメントが生成されていません。')
  }

} catch (err) {
  if (err.code === 'ENOENT') {
    console.warn('index.jsが見つかりません。')
  } else {
    console.error(err)
  }
}


function createData(jsonData: JsonData) {
  for (const jsonPage of jsonData.pages) {
    createPageDocument(jsonPage)
  }

  createNode(jsonData.node)
}

function createPageDocument(jsonPage: JsonPage) {
  console.log(`createPageDocument(): pageId=${jsonPage.pageId}`)
  if (jsonPage.documentId === jsonPage.pageId) {
    createDocument(jsonPage)
  }
  try {
    const buf = fs.readFileSync(path.join(__dirname, `../../src/filedata/data/${jsonPage.pageId}.md`), { encoding: 'utf-8' })
    const newPage = {
      documentId: jsonPage.documentId,
      pageId: jsonPage.pageId,
      pageTitle: jsonPage.pageTitle,
      pageData: buf.toString(),
      createdAt: createDate,
      updatedAt: updateDate
    } as IPage
    pages.push(newPage)
    pageMap.set(newPage.pageId, newPage)
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

function createDocument(jsonPage: JsonPage) {
  console.log(`createDocument(): documentId=${jsonPage.documentId}`)
  if (document.documentId) {
    const mes = `ドキュメント登録済み documentId=${document.documentId}`
    console.error(mes)
    throw new Error(mes)
  }
  document.documentId = jsonPage.documentId
  document.documentTitle = jsonPage.pageTitle
  document.node = node
  document.createdAt = createDate
  document.updatedAt = updateDate
}

function createNode(jsonNode: JsonNode) {
  console.log(`createNode()`)
  const currentPage = pageMap.get(jsonNode.pageId)
  node.pageId = currentPage.pageId
  node.pageTitle = currentPage.pageTitle
  node.nodes = []
  createNestedNode(jsonNode.nodes, node.nodes)
}

function createNestedNode(jsonNodes: Array<JsonNode>, targetNodes: Array<INode>) {
  for (const jsonNode of jsonNodes) {
    const newNode = createSingleNode(jsonNode)
    targetNodes.push(newNode)
    createNestedNode(jsonNode.nodes, newNode.nodes)
  }
}

function createSingleNode(jsonNode: JsonNode) {
  console.log(`createSingleNode(): pageId=${jsonNode.pageId}`)
  const currentPage = pageMap.get(jsonNode.pageId)
  return {
    pageId: currentPage.pageId,
    pageTitle: currentPage.pageTitle,
    nodes: []
  } as INode
}

export function getFileDummyDocument(): IDocument {
  return document
}

export function getFileDummyPages(): Array<IPage> {
  return pages
}

export function existFileData(): boolean {
  console.log(`existFileData(): pages.length=${pages.length}`)
  return pages.length !== 0
}
