<script>
import topnav from '../common/topnav.vue'
import ListBook from '../common/book/list_book.vue'

export default {
  name: 'bookcase',
  components: {
    topnav,
    ListBook
  }
}
</script>
<template>
  <div>
    <topnav></topnav>
    <ListBook v-bind:home='false'></ListBook>
  </div>
</template>