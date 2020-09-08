import { Builder } from 'lunr'
import LunrIndexContainer from '~/containers/LunrIndexContainer'
import { useIndexApi } from '~/hooks/indexApiHook'
import { createIndexSearchResult } from '~/models/index/IndexSearchResultFactory'
const lunr = require('lunr')
require('lunr-languages/lunr.stemmer.support.js')(lunr)
require('lunr-languages/tinyseg.js')(lunr)
require('lunr-languages/lunr.ja.js')(lunr)

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
    available
  } = LunrIndexContainer.useContainer()
  const { getIndexList } = useIndexApi()

  const fetchIndex = (documentId: string) => {
    console.log('fetchIndex(): called.')
    getIndexList(documentId).then((list) => {
      pageIndex.value = list
      searchIndex.value = lunr((builder: Builder) => {
        builder.pipeline.reset()
        builder.ref('ref')
        builder.field('title', { boost: 10 })
        builder.field('body')
        builder.use(lunr.ja)
        builder.metadataWhitelist = ['position']
        for (const item of list) {
          builder.add(item)
        }
      })
      available.value = true
      console.log('Search Index available.')
      // console.log(searchIndex.value)
      const result = serchIndex('テーブル')
      console.log(result)
    })
  }

  const serchIndex = (str: string) => {
    if (!available.value || str === '' || str.length < 2) {
      return []
    }
    const lunrResult = searchIndex.value.search(str)
    return createIndexSearchResult(lunrResult, pageIndex.value)
  }

  return {
    index: searchIndex,
    available,
    fetchIndex,
    serchIndex
  }
}
