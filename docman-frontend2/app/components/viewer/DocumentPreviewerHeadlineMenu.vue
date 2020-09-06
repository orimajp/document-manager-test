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

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import {
  HeadlineMenuParam,
  HeadlineMenuProps
} from '~/hooks/view/headlinmenu/headlineMenuControllHook'
import { useHeadlineMenu } from '~/hooks/view/headlinmenu/headlineMenuHook'

export default defineComponent({
  props: {
    headlineMenuParam: Object as PropType<HeadlineMenuParam>
  },
  setup(props: HeadlineMenuProps, context: SetupContext) {
    const {
      showHeadlineMenu,
      headlineMenuX,
      headlineMenuY,
      copyMarkdownHash
    } = useHeadlineMenu(props, context)

    return {
      showHeadlineMenu,
      headlineMenuX,
      headlineMenuY,
      copyMarkdownHash
    }
  }
})
</script>

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
