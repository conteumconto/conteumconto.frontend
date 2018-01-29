<template>
  <div>
    <BookDetails v-if="details" @close="details = false" :book="this.book"></BookDetails>
    <div class="book-wrapper"> 
      <div class="book-l">
        <h1 class="book-title">{{this.book.title}}</h1>
        <div class="tags-wrapper">
          <span v-for='tag in this.book.tags' v-bind:key='tag' class="book-tags">{{tag}}</span>
        </div>
        <button class="btn-noBg default" @click="openBook">Abrir Livro</button>
        <router-link class="btn-noBg sucess" :to="this.newChapterUrl">Escrever</router-link>
      </div>
      <div class='book-r'>
        <div class="image">
          <img :src="this.book.photo">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import common from '../../../services/common.service'
  import BookDetails from './details.book'

  export default {
    name: 'card_book',
    components: {
      BookDetails
    },
    data () {
      return {
        newChapterUrl: '',
        details: false
      }
    },
    props: ['book'],
    computed: {
      hide () {
        return (common.isEmptyArray(this.book.chapters))
      }
    },
    mounted () {
      if (!common.isEmpty(this.book)) this.newChapterUrl = {name: 'write-new-book', params: {book_id: this.book._id}}
    },
    methods: {
      openBook () {
        this.$store.dispatch('setActualBook', this.book._id)
        this.details = true
      }
    }
  }
</script>

<style scoped lang="sass">
  @import './../../../assets/bases.sass'

  .book-wrapper
    display: flex
    width: 900px
    height: 300px
    display: flex
    background: #fff
    flex-direction: row
    align-items: center
    margin: 1rem 0 1rem 0
    box-shadow: $shadow_1

  .book-title
    color: $red
    font-family: $title_alter_font
    font-weight: bold
    font-size: 2.2em

  .book-tags
    color: $red_dark
    font-family: $title_alter_font
    font-weight: 400
    font-size: 1em
    padding-right: .5rem

  .book-l
    flex: 1 0
    padding-left: 3rem

  .tags-wrapper
    margin-top: .5rem
    margin-left: .5rem
    margin-bottom: 1.5rem

  .book-image
    display: flex
    flex-direction: column

  .image
    margin: 0

  img
    width: auto
    height: auto
</style>