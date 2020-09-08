import { Index } from 'lunr'
import { IIndex } from '~/models/index/IIndex'
import { IndexSearchResult } from '~/models/index/IndexSearchResult'

const BODY_LENGTH = 100
const MAX_PAGES = 20
// const MAX_PAGES = 10
// const MAX_PAGES = 30

const createPath = (id: string) => {
  return `/document/view/${id}`
}

// https://github.com/koirand/pulp/blob/master/assets/js/search.js
export function createIndexSearchResult(
  lunrResult: Index.Result[],
  pageIndex: Array<IIndex>
): Array<IndexSearchResult> {
  const results = lunrResult.map((result) => {
    return pageIndex.filter((page) => {
      return page.ref === result.ref
    })[0]
  })

  const searchResults: Array<IndexSearchResult> = []

  results.slice(0, MAX_PAGES).forEach((result, idx) => {
    const metadata = lunrResult[idx].matchData.metadata
    // @ts-ignore
    const tmp = metadata[Object.keys(metadata)[0]].body
    const matchPosition: number = tmp ? tmp.position[0][0] : 0
    const bodyStartPosition: number =
      matchPosition - BODY_LENGTH / 2 > 0 ? matchPosition - BODY_LENGTH / 2 : 0
    const title = result.title
    const path = createPath(result.ref)
    const body = result.body.substring(bodyStartPosition, BODY_LENGTH)
    const searchResult = new IndexSearchResult(path, title, body)
    searchResults.push(searchResult)
  })

  return searchResults
}
