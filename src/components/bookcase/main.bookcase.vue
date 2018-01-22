<template>
  <div>
    <topnav></topnav>
    <ListBook v-bind:home='false'></ListBook>
  </div>
</template>

<script>
  import topnav from '../common/main.topnav'
  import ListBook from '../common/book/list.book'

  export default {
    name: 'bookcase',
    components: {
      topnav,
      ListBook
    }
  }
</script>
