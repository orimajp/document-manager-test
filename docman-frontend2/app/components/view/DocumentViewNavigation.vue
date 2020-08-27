<template>
  <div class="navigation">
    <v-row>
      <v-col cols="12" sm="6">
        <div v-if="existsPrevPage" class="nav-link prev" @click="goPrev">
          <v-icon class="chevron left">mdi-chevron-left</v-icon>
          <div class="page-link">
            {{ prevTitle }}
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div v-if="existsNextPage" class="nav-link next" @click="goNext">
          <div class="page-link">
            {{ nextTitle }}
          </div>
          <v-icon class="chevron right">mdi-chevron-right</v-icon>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { NavInfoProp, useViewNavigation } from '~/hooks/view/viewNavigationHook'

export default defineComponent({
  props: {
    pageId: String as PropType<string>
  },
  setup(props: NavInfoProp) {
    const {
      existsPrevPage,
      existsNextPage,
      prevId,
      nextId,
      prevTitle,
      nextTitle,
      goPrev,
      goNext
    } = useViewNavigation(props)

    return {
      existsPrevPage,
      existsNextPage,
      prevId,
      nextId,
      prevTitle,
      nextTitle,
      goPrev,
      goNext
    }
  }
})
</script>

<style scoped>
.navigation {
  position: relative;
  border-top: thin solid #eeeeee;
  border-bottom: thin solid #eeeeee;
  /*border-top: thin solid #e0e0e0;
  border-bottom: thin solid #e0e0e0;*/
}
.nav-link {
  height: 4em;
  /*height: 50px;*/
  color: #eeeeee;
  /*color: #e0e0e0;*/
  font-weight: bold;
  /*font-size: 20px;*/
  cursor: pointer;
}
.nav-link:hover {
  color: #e0e0e0;
  /*color: #bdbdbd;*/
}
.nav-link.prev {
  display: flex;
  align-items: center;
}
.nav-link.next {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.chevron {
  font-size: 80px;
  color: #eeeeee;
  /*color: #e0e0e0;*/
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.chevron.left {
  margin-left: -22px;
  margin-right: -25px;
}
.chevron.right {
  margin-left: -25px;
  margin-right: -22px;
}
</style>
