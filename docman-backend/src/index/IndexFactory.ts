import { IPage } from '~/page/page.interface';
import { Index } from '~/index/index';
const remark = require('remark')
const strip = require('strip-markdown')

export function createIndex(page: IPage): Index {
  const ref = createRef(page)
  const body = createBody(page)
  return {
    ref: ref,
    title: page.pageTitle,
    body: body
  }
}

function createRef(page: IPage) {
  return `/document/view/${page.pageId}`
}

function createBody(page: IPage) {
  return remark().use(strip).processSync(page.pageData).toString()
}
