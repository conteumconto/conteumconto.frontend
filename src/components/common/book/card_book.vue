<script>
import globalConfig from '../../../services/GlobalConfigs'
import common from '../../../services/CommonServices'
import Auth from '../../../auth/index'

const API_URL = globalConfig.getApiURL()

import NewBook from './new_book.vue'
import BookEdit from './edit_book.vue'

export default {
  name: 'card_book',
  components: {
    NewBook,
    BookEdit
  },
  data () {
    return {
      newBookComponent: false,
      edit: false,
      newChapterUrl: '',
      chaptersMetaData: []
    }
  },
  props: ['book'],
  computed: {
    hide: function () {
      return (common.isEmptyArray(this.book.chapters))
    }
  },
  methods: {
    removeBook: function () {
      let self = this
      this.$swal({
        title: 'Você tem certeza?',
        text: 'Este livro deixará de existir após a confirmação!',
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir este livro',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then(() => {
        self.$http.delete(API_URL + '/book/id/' + self.book._id + '/',
          {headers: Auth.getAuthHeader()}
        ).then(({body}) => {
          if (body !== null) {
            // reload the store with new book
            self.$store.dispatch('loadBookDataFromApi', self.$store.getters.dataStudent.login)
          }
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    removeChapter: function (chapter) {
      let self = this
      this.$swal({
        title: 'Você tem certeza?',
        text: 'Este capítulo deixará de existir após a confirmação!',
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir este capítulo',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then(() => {
        self.$http.delete(API_URL + '/chapter/id/' + chapter.id + '/',
          {headers: Auth.getAuthHeader()}
        ).then(({body}) => {
          if (body !== null) {
            self.$store.dispatch('loadBookDataFromApi', self.$store.getters.dataStudent.login)
          }
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  }
}
</script>
<template>
      <div class="book-wrapper">
        <BookEdit v-if="edit" @close="edit = false" :book="this.book"></BookEdit>
        <div class="book-content">
          <div class="book-image">
            <div class="image">
              <img src='../../../assets/img/kids1.jpg'>
            </div>
            <a class="new" :href="this.book.newChapterUrl">
              Novo Capitulo
            </a>
          </div>
          <div class="book-info">
            <div class="book-up">
              <h1 class="book-title">{{this.book.title}}</h1>
            </div>

            <div v-if='!this.hide' class="book-chapters">
              <div v-for='chapter in this.book.chapters' class="chapter-items">
                <a class="chapter open-chapter" :href="chapter.url" >{{chapter.title}} </a>
                <a class="chapter close-chapter" @click="removeChapter(chapter)" ><i class="fa fa-times" aria-hidden="true"></i> </a>
              </div>
            </div>
            <div v-if='this.hide' class="book-chapters">
                <div class="chapter-items">
                  <a class="chapter close-chapter" :href="this.book.newChapterUrl" >Comece a Escrever!</a>
                </div>
              </div>
          </div>
        </div>
        <div class="book-controls">
          <button class="btn-noBg disable">Finalizar LIVRO</button>
          <button class="btn-noBg warning" @click="edit = true" >Editar livro</button>
          <button class="btn-noBg danger" @click="removeBook" >Apagar Livro</button>
        </div>
        
      </div>
</template>
<style scoped lang="sass">
@import './../../../assets/bases.sass'

.book-wrapper
  display: flex
  width: 900px
  height: 400px
  display: flex
  flex-direction: column
  background: #fff
  margin: 1rem 0 1rem 0
  

.book-content
  flex: 1 1 auto
  display: flex

.book-image
  display: flex
  flex-direction: column

.image
  margin: 0

  img
    width: 100%
    height: 100%

.new
  background: $green
  flex: 1 1 auto
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  font-family: $title_alter_font
  font-weight: bold
  text-transform: uppercase
  color: #fff
  font-size: 1.2em
  padding: 2rem

.book-info
  flex: 2 1
  display: flex
  flex-direction: column


.book-up
  flex: 1 1
  display: flex
  align-items: center
  justify-content: center

.book-title
  color: $red
  font-family: $title_alter_font
  font-weight: bold
  font-size: 2.2em

.book-chapters
  flex: 2.5 1
  display: flex
  flex-direction: column

.chapter-items
  flex: 1 1
  display: flex

.chapter
  flex: 1 1
  background: #DFECFA
  color: $blue_lightier
  font-family: $title_font
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  font-size: 1.2em

.close-chapter
  background: $blue_dark
  color: #fff

.open-chapter
  background: $blue_lightier
  color: #fff


.book-controls
  display: flex
  justify-content: space-around

.btn-noBg
  flex: 1
  padding: 1.5em
  font:
    family: $title_alter_font
    size: 1em
    weight: bold
  text-transform: uppercase
  cursor: pointer

.btn-noBg.disable
  color: #B4B2B2

.btn-noBg.warning
  color: $orange_base
  transition: all .3s ease
.btn-noBg.warning:hover
  color: $orange_dark

.btn-noBg.danger
  color: $red
  transition: all .3s ease
.btn-noBg.danger:hover
  color: $red_dark
  
</style>