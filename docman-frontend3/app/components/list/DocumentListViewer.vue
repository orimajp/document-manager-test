<script setup lang="ts">
import { computed, useRouter } from "@nuxtjs/composition-api";
import { IDocumentList } from "~/models/document/IDocumentList";

type Props = {
  complete: boolean
  list: Array<IDocumentList>
}

const props = withDefaults(defineProps<Props>(), {
  complete: false,
  list: () => []
})

const empty = computed(() => props.complete && props.list.length === 0)
const exists = computed(() => props.complete && props.list.length !== 0)
const loading = computed(() => !props.complete)

const router = useRouter()
const goViewer = (pageId: string): void => {
  router.push(`/document/view/${pageId}`)
}
</script>

<template>
  <div>
    <v-main>
      <v-container>
        <h1>ドキュメント一覧</h1>
        <div v-if="loading" class="text-center">
          <v-progress-circular :size="100" color="primary" indeterminate />
        </div>
        <v-alert v-if="empty" type="info">ドキュメントがありません。</v-alert>
        <v-simple-table v-if="exists">
          <template #default>
            <thead>
              <tr>
                <td>ドキュメント名</td>
                <td>作成日時</td>
                <td>更新日時</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in list" :key="index">
                <td @click="goViewer(record.id)">
                  {{ record.title }}
                </td>
                <td @click="goViewer(record.id)">
                  {{ record.createdAt }}
                </td>
                <td @click="goViewer(record.id)">
                  {{ record.updatedAt }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
td {
  cursor: pointer;
}
</style>
