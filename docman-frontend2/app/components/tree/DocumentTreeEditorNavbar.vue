<template>
  <v-app-bar appdark dense dark class="primary">
    <v-btn icon @click="goTop">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-toolbar-title>
      <small>メニュー階層編集: {{ pageTitle }}</small>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { useRouter } from '~/hooks/useRouter'

export default defineComponent({
  props: {
    pageTitle: String as PropType<string>
  },
  setup() {
    const { router } = useRouter()
    const goTop = () => router.push('/')

    return {
      goTop
    }
  }
})
</script>
