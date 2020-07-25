<template>
  <v-navigation-drawer app right clipped color="grey lighten-3">
    <div class="toc">
      <ul class="menu-list">
        <li
          v-for="(headline, index) in headlines"
          :key="index"
          :class="headlineClass(headline)"
          @click="changeHash(headline.id)"
        >
          {{ headline.name }}
        </li>
      </ul>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HeadlineContanier from '~/containers/HeadlineContanier'
import { DocumentHeadline } from '~/models/document/DocumentHeadline'

export default defineComponent({
  setup() {
    const { headlines } = HeadlineContanier.useContainer()
    const headlineClass = (headline: DocumentHeadline): string => {
      return `headline-${headline.label}`
    }

    const changeHash = (hash: string): void => {
      window.location.hash = hash
    }

    return {
      headlines,
      headlineClass,
      changeHash
    }
  }
})
</script>

<style scoped>
.toc {
}
.menu-list {
  margin: 10px;
  padding: 0;
}
.menu-list li {
  list-style-type: none;
  font-size: 13px;
  padding-top: 4px;
  padding-bottom: 4px;
  word-wrap: break-word;
}
.menu-list li:hover {
  background-color: lightgrey;
}
.headline-1 {
  cursor: pointer;
}
.headline-2 {
  cursor: pointer;
  margin-left: 5px;
}
.headline-3 {
  cursor: pointer;
  margin-left: 10px;
}
.headline-4 {
  cursor: pointer;
  margin-left: 15px;
}
.headline-5 {
  cursor: pointer;
  margin-left: 20px;
}
.headline-6 {
  cursor: pointer;
  margin-left: 25px;
}
</style>
