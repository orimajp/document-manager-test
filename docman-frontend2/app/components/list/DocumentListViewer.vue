<template>
  <div>
    <v-main>
      <v-container>
        <h1>ドキュメント一覧</h1>
        <v-alert v-if="empty" type="info">
          ドキュメントがありません。
        </v-alert>
        <v-simple-table v-else>
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
// import { defineComponent, computed } from 'nuxt-composition-api'
// import { defineComponent, watchEffect } from 'nuxt-composition-api'
import { defineComponent, PropType } from '@vue/composition-api'
import { IDocumentList } from '~/models/document/IDocumentList'
import useRouter from '~/hooks/useRouter'

type Props = {
  list: Array<IDocumentList>
}

export default defineComponent({
  props: {
    list: Array as PropType<Array<IDocumentList>>
    /*
    list: {
      type:
    }
     */
  },
  setup(props: Props) {
    const list = props.list
    console.log('DocumentListViewer')
    console.log(props)
    console.log(list)
    console.log(list.length)
    // const empty = computed(() => list.length === 0)
    // let empty = false
    const empty = false
    /*
    watchEffect(() => {
      empty = list.length === 0
    })
     */

    const { router } = useRouter()

    const goViewer = (pageId: string): void => {
      router.push(`/document/view/${pageId}`)
    }

    return {
      // list:,
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
