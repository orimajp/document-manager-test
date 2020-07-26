import * as path from 'path'
import colors from 'vuetify/es5/util/colors'
import { NuxtConfig } from '@nuxt/types'
import { NuxtOptionsLoaders, NuxtWebpackEnv } from '@nuxt/types/config/build'
import { Configuration as WebpackConfiguration } from 'webpack'
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

const nuxtConfig: NuxtConfig = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  srcDir: 'app',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  // target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** for IntelliJ IDEA / WebStorm
   */
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    //    root: path.resolve(__dirname, 'app/'),
    alias: {
      '@': path.resolve(__dirname, 'app/'),
      '~': path.resolve(__dirname, 'app/')
    }
  },
  /*
   ** Global CSS
   */
  css: [
    'github-markdown-css',
    '../node_modules/highlight.js/styles/github-gist.css'
    // 'github-markdown-css' // github-gist.cssaが無いとハイライトされない
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  // plugins: ['~/plugins/composition-api.ts', '~/plugins/vuetify.ts'],
  plugins: ['~/plugins/composition-api.ts'],
  // plugins: ['~/plugins/vuetify.ts'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  // components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/markdownit'
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

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
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
          success: colors.green.accent3
        }
      }
    }
  },
  proxy: {
    '/api': 'http://localhost:3000'
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(
      config: WebpackConfiguration,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ctx: { loaders: NuxtOptionsLoaders } & NuxtWebpackEnv
    ) {
      config.plugins?.push(new MonacoEditorPlugin())
    }
  }
}

module.exports = nuxtConfig
