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

interface Emits {
  (e: 'closeHeadlineMenu'): void
}

const emit = defineEmits<Emits>()

const closeHeadlineMenu = () => {
  emit('closeHeadlineMenu')
}

const {
  showHeadlineMenu,
  headlineMenuX,
  headlineMenuY,
  copyUrl,
  copyMarkdownPath,
  copyMarkdownHash
} = useHeadlineMenu(props, closeHeadlineMenu)
</script>

<template>
  <v-menu
    v-model="showHeadlineMenu"
    :position-x="headlineMenuX"
    :position-y="headlineMenuY"
    absolute
    offset-y
  >
    <v-list dense>
      <v-subheader>クリップボードにコピー</v-subheader>
      <v-list-item class="menu-item" dense @click="copyUrl">
        <v-list-item-title>ハッシュ付きURL</v-list-item-title>
      </v-list-item>
      <v-list-item class="menu-item" dense @click="copyMarkdownPath">
        <v-list-item-title>
          ハッシュ付きパスリンク(Markdown形式)
        </v-list-item-title>
      </v-list-item>
      <v-list-item class="menu-item" dense @click="copyMarkdownHash">
        <v-list-item-title>ハッシュリンク(Markdown形式)</v-list-item-title>
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
