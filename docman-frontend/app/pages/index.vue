<template>
  <v-main>
    <v-container>
      <v-main>
        <v-container>
          <h1>ドキュメント一覧</h1>
          <!--
          <v-alert type="info" v-if="isEmpty">
            ドキュメントがありません。
          </v-alert>
          -->
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
</template>

<script lang="ts">
// import { defineComponent, useAsync, computed } from 'nuxt-composition-api'
import { defineComponent, useAsync } from 'nuxt-composition-api'
import { userDocument } from '~/hooks/useDocument'
export default defineComponent({
  setup() {
    const { search } = userDocument()
    const list = useAsync(() => search())
    console.log(list)
    /*
    const isEmpty = () => {
      return list.value.length === 0
    }
     */
    /*
    const isEmpty = computed(() => {
      return list.value.length === 0
    })
     */
    return {
      list
      // isEmpty
    }
  }
})
</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
