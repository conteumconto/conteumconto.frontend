<script>
import NewBook from './new_book.vue'
import CardBook from './card_book.vue'

export default {
  name: 'list_book',
  components: {
    NewBook,
    CardBook
  },
  props: ['home'],
  data () {
    return {
      launchNewBook: false,
      search: ''
    }
  },
  created: function () {
    this.$store.dispatch('loadBookDataFromApi', this.$store.getters.dataStudent.login)
  },
  methods: {
    close_new_book: function () {
      this.launchNewBook = false
      this.$store.dispatch('loadBookDataFromApi', this.$store.getters.dataStudent.login)
    }
  },
  computed: {
    list () {
      if (this.search) {
        return this.$store.getters.studentBooks.filter((book) => {
          return book.title.match(this.search)
        })
      } else {
        return this.$store.getters.studentBooks
      }
    }
  }
}
</script>
<template>
<div>
  <NewBook v-if="launchNewBook" @close="this.close_new_book"></NewBook>
  <div v-if="!this.$store.getters.haveBooks" class="emptyWrapper">
    <h1 class="title-large title-down">Comece a escrever!</h1>
    <button class="btn btn-large" @click="launchNewBook = true"> Novo Livro </button>
  </div>

  <div v-if="this.$store.getters.haveBooks" class="book-list">
    <h1 v-if="!home" class="title-large title-down">Meus Livros</h1>
    <div v-if="!home" class="book_search">
      <input class="search" type="text" placeholder="Busque pelo nome do livro" v-model="search">
      <button class="btn btn-green" @click="launchNewBook = true" > Novo Livro </button>
    </div>
    <CardBook v-for='book in this.list' :book="book"></CardBook>
  </div>
</div>
</template>
<style scoped lang="sass">
@import './../../../assets/bases.sass'

.btn
  margin: 0

.book-list
  display: flex
  flex-direction: column
  align-items: center


.search
  font:
    size: 1rem
    family: $title_alter_font
  margin: 1rem

.book_search
  height: 60px
  width: 65%
  background: #fff
  margin: 1rem
  border-radius: 20px/20px
  display: flex
  justify-content: space-between

.emptyWrapper
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

button
    flex: 0
</style>