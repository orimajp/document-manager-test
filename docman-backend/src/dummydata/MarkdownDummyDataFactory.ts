import * as dayjs from 'dayjs'
import 'dayjs/locale/ja';
import { INode } from '~/node/node.interface';
import { IDocument } from '~/document/document.interface';
import { IPage } from '~/page/page.interface';

const createDate = dayjs('2020-07-07').format()
const updateDate = dayjs('2020/08/08').format()

const pageData: string = `
# (見出し1)
## (見出し2)
### (見出し3)
#### (見出し4)
##### (見出し5)
###### (見出し6)

> 引用

# リンクテスト
\`[]()\`記述によるリンクが通常のアンカータグになるためか遷移が遅いため、相対リンクの場合はNuxt.jsの画面遷移処理を実行する。

* [page0(/document/view/page0)](/document/view/page0)
* [page8(/document/view/page8)](/document/view/page8)
* [page8(http://localhost:3030/document/view/page8)](http://localhost:3030/document/view/page8)
* [Google(外部リンク)](https://www.google.com/)

## 内部リンク用画面遷移処理の参考になったページ
このうち\`HtmlParser.global.vue\`をアレンジして利用した。

* https://github.com/nuxt-community/modules/issues/185
* https://github.com/nuxt/nuxtjs.org/blob/master/components/commons/HtmlParser.global.vue
* https://bitto.jp/posts/blog/nuxt%E5%8C%96/nuxt-md-anchor-convert/https://bitto.jp/posts/blog/nuxt%E5%8C%96/nuxt-md-anchor-convert/

# コード
## TypeScript

\`\`\`ts
import { DocumentPage } from '~/models/document/DocumentPage'

export class DocumentPageHolder {
  private pageMap: Map<string, DocumentPage>
  constructor() {
    this.pageMap = new Map<string, DocumentPage>()
  }

  getPage(pageKey: string): DocumentPage | null {
    const page = this.pageMap.get(pageKey)
    return page || null // narrowing
  }

  addPage(pageKey: string, page: DocumentPage): void {
    this.pageMap.set(pageKey, page)
  }

  clearPageCache(): void {
    this.pageMap.clear()
  }
}
\`\`\`

## Vue.js

\`\`\`vue
<template>
  <div>
    <v-content>
      <v-container>
        <h1>ナビゲーション</h1>
        <ul>
          <li>
            <nuxt-link to="/document/view/page0">
              ツリー構造テスト(page0)
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/document/view/md-page0">
              markdownレンダリングテスト(md-page0)
            </nuxt-link>
          </li>
        </ul>
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style></style>
\`\`\`

# markdown-it-sanitizer
<b>これは強調されるが以下のscriptタグは無効化される。</b>

<script>
alert('危険!')
</script>

# markdown-it-container
とりあえずBootstrap風スタイル。

::: alert-primary
Primary
:::

::: alert-secondary
Secondary
:::

::: alert-success
Success
:::

::: alert-info
Info
:::

::: alert-warning
Warning
:::

::: alert-danger
Danger
:::

# markdown-it-plantuml

@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml

# markdown-it-mark
==ハイライト表示== のテストです。
このプラグインは分かち書きが必要っぽい。

# markdown-it-footnote
これは脚注[^1]のテストです

[^1]:これは１つ目の脚注の内容です

# markdown-it-ins
++下線++

# markdown-it-sub

H~2~o

# markdown-it-abbr
The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium

# markdown-it-deflist
改行の制御はmarkdown-itのbreaksパラメータの影響を受けているっぽい。

名前 1
:  定義1
定義1の改行

名前2 *名前のマークアッップ*

:  定義2

# markdown-it-video
@[vimeo](365349055)

`

const pages:Array<IPage> = [
  {
    documentId: 'md-page0',
    pageId: 'md-page0',
    pageTitle: 'マークダウン:md-page0',
    pageData: pageData,
    createdAt: createDate,
    updatedAt: updateDate
  }
]

const node: INode = {
  pageTitle: pages[0].pageTitle,
  pageId: pages[0].pageId,
  nodes: []
}

const document: IDocument = {
  documentId: pages[0].documentId,
  documentTile: pages[0].pageTitle,
  node: node,
  createdAt: pages[0].createdAt,
  updatedAt: pages[0].updatedAt
}

export function getMarkdownDummyDocument(): IDocument {
  return document
}

export function getMarkdownDummyPages(): Array<IPage> {
  return pages
}
