import { Builder } from 'lunr'
import LunrIndexContainer from '~/containers/lunr-index-container'
import { useIndexApi } from '~/composables/use-index'
import { createIndexSearchResult } from '~/models/index/IndexSearchResultFactory'
// @ts-ignore
const lunr = require('lunr')
// @ts-ignore
require('lunr-languages/lunr.stemmer.support.js')(lunr)
// @ts-ignore
require('lunr-languages/tinyseg.js')(lunr)
// @ts-ignore
require('lunr-languages/lunr.ja.js')(lunr)

const getElapsedTime = (start: Date): number => {
  const end = new Date()
  return end.getTime() - start.getTime()
}

// https://koirand.github.io/blog/2018/pulp-search/
// https://koirand.github.io/blog/2018/pulp-search2/
// https://blog.kozakana.net/2019/03/lunr-node/
// https://www.npmjs.com/package/@types/lunr
// https://github.com/koirand/pulp/blob/master/assets/js/search.js
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/lunr/index.d.ts
export const useViewIndexSearch = () => {
  const {
    searchIndex,
    pageIndex,
    available,
    searchKeyword
  } = LunrIndexContainer.useContainer()
  const { getIndexList } = useIndexApi()

  const fetchIndex = (documentId: string) => {
    console.log('fetchIndex(): called.')
    const start = new Date()
    getIndexList(documentId).then((list) => {
      pageIndex.value = list
      searchIndex.value = lunr((builder: Builder) => {
        builder.pipeline.reset()
        builder.ref('ref')
        // builder.field('title', { boost: 10 })
        builder.field('title')
        builder.field('body')
        builder.use(lunr.ja)
        builder.metadataWhitelist = ['position']
        for (const item of list) {
          builder.add(item)
        }
      })
      available.value = true
      console.log(`Search Index available. time=${getElapsedTime(start)}ms`)
    })
  }

  const searchWord = (str: string) => {
    if (!available.value || !str || str === '' || str.length < 2) {
      return []
    }
    const lunrResult = searchIndex.value.search(str)
    return createIndexSearchResult(lunrResult, pageIndex.value)
  }

  return {
    available,
    searchKeyword,
    fetchIndex,
    searchWord
  }
}
