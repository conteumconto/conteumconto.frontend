<script>
import common from '../../../services/CommonServices'
import BookDetails from './details_book.vue'

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
    hide: function () {
      return (common.isEmptyArray(this.book.chapters))
    }
  }
}
</script>
<template>
  <div>
    <BookDetails v-if="details" @close="details = false" :book="this.book"></BookDetails>

    <div class="book-wrapper"> 
      <div class="book-l">
        <h1 class="book-title">{{this.book.title}}</h1>
        <div class="tags-wrapper">
          <span v-for='tag in this.book.tags' class="book-tags"> {{tag}}  </span>
        </div>
        <button class="btn-noBg default" @click="details = true" > Abrir Livro </button>
        <a class="btn-noBg sucess" :href="this.book.newChapterUrl" > Escrever </a>
      </div>
      <div class='book-r'>
        <div class="image">
          <img src='../../../assets/img/kids1.jpg'>
        </div>
      </div>
    </div>

  </div>
</template>
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
    width: 100%
    height: 100%


</style>