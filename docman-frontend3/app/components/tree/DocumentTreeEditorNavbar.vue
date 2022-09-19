<script setup lang="ts">
import { computed, useRouter } from '@nuxtjs/composition-api'

interface Props {
  pageTitle: string
}

const props = defineProps<Props>()

const pageTitle = computed(() => props.pageTitle)

const router = useRouter()
const goTop = () => router.push('/')
</script>

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
