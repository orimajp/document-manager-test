<template>
  <div class="search-box">
    <v-row>
      <v-col cols="12" sm="12">
        <v-text-field
          v-model="searchKeyword"
          :placeholder="placeholder"
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
        <v-list-item
          :key="item.path"
          :class="{ selectedItem: isSelected(item.id) }"
          @click="goPage(item.path)"
        >
          <v-list-item-content>
            <v-list-item-title>
              <text-highlight :queries="queries">
                {{ item.title }}
              </text-highlight>
            </v-list-item-title>
            <v-list-item-subtitle>
              <text-highlight :queries="queries">
                {{ item.body }}
              </text-highlight>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { useViewSearch, ViewSearchProps } from '~/hooks/view/viewSearchHook'

export default defineComponent({
  props: {
    pageId: String as PropType<string>
  },
  setup(props: ViewSearchProps) {
    const {
      searchDisabled,
      searchKeyword,
      placeholder,
      searchResult,
      existsResult,
      goPage,
      isSelected,
      queries
    } = useViewSearch(props)

    return {
      searchDisabled,
      searchKeyword,
      placeholder,
      searchResult,
      existsResult,
      goPage,
      isSelected,
      queries
    }
  }
})
</script>

<style scoped>
.search-text {
  font-size: 14px;
}
.search-box {
  margin-left: 5px;
  margin-right: 4px;
}
.selectedItem {
  background-color: #b3e5fc;
}
</style>
