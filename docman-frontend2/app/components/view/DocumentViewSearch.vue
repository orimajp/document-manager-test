<template>
  <div class="search-box">
    <v-row>
      <v-col cols="12" sm="12">
        <v-text-field
          v-model="searchKeyword"
          label="検索"
          single-line
          outlined
          dense
          clearable
          :disabled="searchDisabled"
          :hide-details="true"
          background-color="grey lighten-2"
          class="search-text"
        />
      </v-col>
    </v-row>
    <v-list v-if="existsResult" dense three-line color="grey lighten-2">
      <template v-for="(item, index) in searchResult">
        <v-divider v-if="index !== 0" :key="index" />
        <v-list-item :key="item.path" @click="goPage(item.path)">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.body }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useViewSearch } from '~/hooks/view/viewSearchHook'

export default defineComponent({
  setup() {
    const {
      searchDisabled,
      searchKeyword,
      searchResult,
      existsResult,
      goPage
    } = useViewSearch()
    return {
      searchDisabled,
      searchKeyword,
      searchResult,
      existsResult,
      goPage
    }
  }
})
</script>

<style scoped>
.search-text {
  font-size: 14px;
}
.search-box {
  margin-left: 2px;
  margin-right: 2px;
}
</style>
