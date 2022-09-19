<script setup lang="ts">
import {
  HeadlineMenuParam,
//  HeadlineMenuProps
} from '~/composables/view/headlinemenu/use-headline-menu-controll'
import { useHeadlineMenu } from '~/composables/view/headlinemenu/use-headline-menu'

interface Props {
  headlineMenuParam: HeadlineMenuParam
}

const props = defineProps<Props>()

const {
  showHeadlineMenu,
  headlineMenuX,
  headlineMenuY,
  copyMarkdownHash
} = useHeadlineMenu(props)
</script>

<template>
  <v-menu
    v-model="showHeadlineMenu"
    :position-x="headlineMenuX"
    :position-y="headlineMenuY"
    absolute
    offset-y
  >
    <v-list>
      <v-list-item class="menu-item" dense>
        <v-list-item-title @click="copyMarkdownHash">
          ハッシュをMarkdown形式でクリップボードにコピー
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.menu-item {
  /*font-size: 1em;*/
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}
.menu-item:hover {
  background-color: #fafafa;
}
</style>
