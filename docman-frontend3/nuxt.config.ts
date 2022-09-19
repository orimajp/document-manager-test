// import * as path from 'path'
import { NuxtConfig } from '@nuxt/types'
import colors from 'vuetify/es5/util/colors'
import { NuxtOptionsLoaders, NuxtWebpackEnv } from '@nuxt/types/config/build'
import { Configuration as WebpackConfiguration } from 'webpack'
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

const md = require('markdown-it')() // FIXME escapeのためだけに使うのはアホらしいのだが

const nuxtConfig: NuxtConfig = {
// export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  srcDir: 'app',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - docman-frontend3',
    title: 'docman-frontend3',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
//    'github-markdown-css',
    '../node_modules/github-markdown-css/github-markdown-light.css',
//    '../node_modules/highlight.js/styles/github-gist.css'
    '../node_modules/highlight.js/styles/github.css'
//    '../node_modules/highlight.js/styles/github-dark-dimmed.css'
//    '../node_modules/highlight.js/styles/googlecode.css'

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-text-highlight.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dayjs',
    '@nuxtjs/markdownit',
  ],

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  // https://github.com/highlightjs/highlightjs-vue
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    highlight: (str: string, lang: string) => {
      const hljs = require('highlight.js')
      const hljsDefineVue = require('highlightjs-vue')
      hljsDefineVue(hljs)
      hljs.initHighlightingOnLoad()
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (__) {}
        return '' // use external default escaping
      }
    },
    use: [
      ['markdown-it-container', 'alert-primary'],
      ['markdown-it-container', 'alert-secondary'],
      ['markdown-it-container', 'alert-info'],
      ['markdown-it-container', 'alert-success'],
      ['markdown-it-container', 'alert-warning'],
      ['markdown-it-container', 'alert-danger'],
      [
        'markdown-it-container',
        'notice',
        {
          validate(params: string) {
            return params.trim().match(/^notice\s+(.*)$/)
          },
          render(tokens: { info: string; nesting: number }[], idx: number) {
            const m = tokens[idx].info.trim().match(/^notice\s+(.*)$/) as []
            if (tokens[idx].nesting === 1) {
              // @ts-ignore
              const escapedHtml = md.utils.escapeHtml(m[1])
              return `<div class="notices ${escapedHtml}-style"><p>`
            }
            return '</p></div>'
          }
        }
      ],
      [
        '@liradb2000/markdown-it-mermaid',
        { themeVariables: { fontSize: '14px' } }
      ],
      'markdown-it-sanitizer',
      'markdown-it-plantuml',
      'markdown-it-anchor',
      'markdown-it-mark',
      'markdown-it-footnote',
      'markdown-it-ins',
      'markdown-it-sub',
      'markdown-it-abbr',
      'markdown-it-deflist',
      'markdown-it-video'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // dark: true,
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  proxy: {
    '/api': 'http://localhost:3001'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(
      config: WebpackConfiguration,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
//      ctx: { loaders: any }
      // eslint-disable-next-line
      ctx: { loaders: NuxtOptionsLoaders } & NuxtWebpackEnv
    ) {
      config.plugins?.push(new MonacoEditorPlugin())
    }
  },
}

module.exports = nuxtConfig
