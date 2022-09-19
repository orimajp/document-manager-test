<script setup lang="ts">
import { useRouter } from "@nuxtjs/composition-api";

const router = useRouter()

const goTop = () => {
  router.push('/')
}

const goCreateDocument = () => {
  router.push('/document/create/document')
}
</script>

<template>
  <div>
    <v-app-bar app clipped-left dark dense class="primary">
      <v-btn icon dark @click="goTop">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title>ドキュメント管理アプリモック</v-toolbar-title>
      <v-spacer />
      <v-btn color="info" depressed @click="goCreateDocument">
        新規ドキュメント
      </v-btn>
    </v-app-bar>
  </div>
</template>
