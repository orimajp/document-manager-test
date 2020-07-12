<template>
  <!--
  <v-main>
    <v-container>
      <v-main>
        <v-container>
          <h1>ドキュメント一覧</h1>
          <v-simple-table>
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
                  <td>
                    {{ record.title }}
                  </td>
                  <td>
                    {{ record.createdAt }}
                  </td>
                  <td>
                    {{ record.updatedAt }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-main>
    </v-container>
  </v-main>
  -->
  <div>
    <d-ocument-list-navbar />
    <document-list-viewer :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync } from 'nuxt-composition-api'
// import { defineComponent } from 'nuxt-composition-api'
// import { defineComponent, useAsync, unref } from 'nuxt-composition-api'
// import { defineComponent, useAsync, computed, unref } from 'nuxt-composition-api'
import { userDocument } from '~/hooks/useDocument'
import DOcumentListNavbar from '~/components/list/DocumentListNavbar'
import DocumentListViewer from '~/components/list/DocumentListViewer'
// import { useAxios } from '~/hooks/useAxios'
// import { IDocumentList } from '~/models/document/IDocumentList'

export default defineComponent({
  components: {
    DOcumentListNavbar,
    DocumentListViewer
  },
  setup() {
    const { search } = userDocument()
    // const { axios } = useAxios()

    const list = useAsync(() => search())
    // const list = await search()
    /*
    const list = useAsync(() =>
      axios.$get<Array<IDocumentList>>('/api/documents')
    )

     */
    console.log('index')

    // const unWrappedList = computed(() => list.value)

    console.log(list)
    console.log(list.getValue)
    return {
      // list: list.value
      list
    }
  }
})
</script>

<style scoped>
/*
td {
  cursor: pointer;
}
 */
</style>
