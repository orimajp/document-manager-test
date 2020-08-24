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
          <template v-slot:default>
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

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import { IDocumentList } from '~/models/document/IDocumentList'
import { useRouter } from '~/hooks/useRouter'

type Props = {
  complete: boolean
  list: Array<IDocumentList>
}

export default defineComponent({
  props: {
    list: Array as PropType<Array<IDocumentList>>,
    complete: Boolean as PropType<boolean>
  },
  setup(props: Props) {
    const empty = computed(() => props.complete && props.list.length === 0)
    const exists = computed(() => props.complete && props.list.length !== 0)
    const loading = computed(() => !props.complete)

    const { router } = useRouter()
    const goViewer = (pageId: string): void => {
      router.push(`/document/view/${pageId}`)
    }

    return {
      loading,
      exists,
      empty,
      goViewer
    }
  }
})
</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
