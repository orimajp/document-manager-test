<script setup lang="ts">
import { useViewNavigation } from '~/composables/view/use-view-navigation'

interface Props {
  pageId: string
}

const props = defineProps<Props>()

const {
  existsPrevPage,
  existsNextPage,
  prevTitle,
  nextTitle,
  goPrev,
  goNext
} = useViewNavigation(props)
</script>

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
  font-size: 14px;
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
  font-size: 40px;
  /*font-size: 24px;
  transform: scale(1, 4);*/
  transform: scale(1, 3);
  /*transform: scale(0.8, 3);*/
  color: #eeeeee;
  /*color: #e0e0e0;*/
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.chevron.left {
  /*margin-left: -22px;*/
  /*margin-right: -25px;*/
  /*margin-right: -12px;*/
}
.chevron.right {
  /*margin-left: -25px;*/
  /*margin-left: -12px;*/
  /*margin-right: -22px;*/
}
</style>
