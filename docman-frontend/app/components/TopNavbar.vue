<template>
  <v-app-bar app clipped-left dark dense class="primary">
    <v-btn icon dark @click="goTop">
      <v-icon>
        mdi-home
      </v-icon>
    </v-btn>
    <v-toolbar-title v-text="pageTitle" />
    <v-spacer />
    <v-btn color="info" depressed @click="goCreateDocument">
      新規ドキュメント
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import useRouter from '~/hooks/useRouter'

type Props = {
  pageTitle: String
}

export default defineComponent({
  props: {
    pageTitle: {
      type: String,
      default: 'ドキュメント管理アプリモック'
    }
  },
  // setup(props: Props) {
  setup() {
    const { router } = useRouter()

    const goTop = () => {
      router.push('/')
    }

    const goCreateDocument = () => {
      router.push('/document/create/document')
    }

    return {
      goTop,
      // pageTitle: props.pageTitle,
      goCreateDocument
    }
  }
})
</script>
