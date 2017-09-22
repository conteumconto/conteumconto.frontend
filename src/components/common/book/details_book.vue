<script>
import globalConfig from '../../../services/GlobalConfigs'
import Auth from '../../../auth/index'

const API_URL = globalConfig.getApiURL()

export default {
  name: 'details_book',
  data () {
    return {
      title: '',
      summary: '',
      tags: [],
      edit: false
    }
  },
  props: ['book'],
  mounted: function () {
    this.title = this.book.title
    this.summary = this.book.summary
    this.tags = this.book.tags
  },
  methods: {
    saveChanges: function () {
      let self = this
      let newBook = {
        title: this.title,
        summary: this.summary,
        tags: this.tags
      }
      this.$http.put(API_URL + '/book/id/' + self.book._id + '/', newBook,
        {headers: Auth.getAuthHeader()}
      ).then(({body}) => {
        if (body !== null) {
          // reload the store with new book
          this.$store.dispatch('loadBookDataFromApi', self.$store.getters.dataStudent.login)
          this.$emit('close')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    removeBook: function () {
      this.$emit('close')
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
    }
  }
}
</script>
<template>
<div>
<transition name="modal">
  <div class="modal-mask">

    <div class="modal-wrapper">

      <div class='header-modal'>
        <h1 class="title-large dark">{{this.title}}</h1>
        <i class="fa fa-close fa-3x" aria-hidden="true"  @click="$emit('close')" ></i>
      </div>

      <md-tabs md-centered>
        <md-tab md-icon="list">

          <div class="body-modal">        
            <div class="modal-item">   
              <md-table v-once>
                <md-table-header>
                  <md-table-row>
                    <md-table-head>Capítulos</md-table-head>
                  </md-table-row>
                </md-table-header>

                <md-table-body>
                  <md-table-row v-for="chapter in this.book.chapters">
                    <md-table-cell>{{chapter.title}}</md-table-cell>
                    <md-table-cell><a class="edit" :href="chapter.url"> <md-icon>edit</md-icon></a></md-table-cell>
                  </md-table-row>
                </md-table-body>
              </md-table>
              <a class="btn-noBg sucess" :href="this.book.newChapterUrl" > Escrever </a>
            </div>

            <div class="modal-item">
              <div class="new-image">
                <div class="image">
                  <img src='../../../assets/img/kids1.jpg'>
                </div>
              </div>
            </div>

          </div>
        </md-tab>

        <md-tab md-icon="settings">

          <div class="body-modal">
            <div class="modal-item">
               <div class="form-group">
                  <h2 class="form-text">Título do seu livro</h2>
                  <input class="input-text" required type="text" v-model="title" minlength="2" placeholder="Qual o nome para sua aventura?">
                </div>
                <div class="form-group">
                  <h2 class="form-text">Resumo</h2>
                  <textarea class="input-text"  rows="7" v-model="summary"   placeholder="O que a sua história tem de legal?"></textarea>
                </div>
                <div class="form-group">
                  <h2 class="form-text">TAGS/Categorias</h2>
                  <md-chips v-model="tags" md-input-placeholder="Digite e aperte enter">
                    <template scope="chip">{{ chip.value }}</template>
                  </md-chips>
                </div>
                <button class="btn-noBg sucess" @click="saveChanges" > Salvar </button>
                <button class="btn-noBg danger"  @click="removeBook" > Apagar Livro </button>
            </div>

            <div class="modal-item">
              <div class="new-image">
                <div class="image">
                  <img src='../../../assets/img/kids1.jpg'>
                </div>
                
                <md-input-container>
                  <label >Trocar Imagem</label>
                  <md-file v-model="onlyImages" accept="image/*"></md-file>
                </md-input-container>
              </div>
            </div>
          </div>

        </md-tab>
      </md-tabs>

    </div>
  </div>
</transition>
</div>
</template>

<style lang="sass">
@import './../../../assets/bases.sass'

.edit
  color: $blue_base !important
  transition: all .3s ease
.edit:hover
  color: $blue_dark !important


.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, .5)
  display: flex
  justify-content: center
  align-items: center
  transition: opacity .3s ease

.modal-wrapper
  background: #fff
  width: 75%
  height: 700px

.header-modal
  display: flex
  justify-content: space-between
  align-items: center
  background: #ecf0f1

.header-modal i 
  color: #bfd3da
  margin: -1rem 2rem 0 0 
  padding: 0
  cursor: pointer


.body-modal
  display: flex
  justify-content: space-between
  aling-items: center

.modal-item
  flex: 1
  margin: 1rem 2.5rem

.form-group
  margin: 1rem

.new-image
  margin: 1.2rem
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

.form-text
  font-size: 14px
  font-weight: bold
  font-family: $title_font
  text-transform: uppercase
  color: $blue_dark
  margin: .5rem 0

.input-text
  font-size: 14px
  text-transform: none
  color: #333
  padding: .7rem .5rem 
  font-size: 1rem
  border: 1px solid $gray
  border-radius: 5px/5px
  font-family: $title_alter_font
  width: 100%


.image
  width: 300px
  height: 250px
  border-radius: 5px/5px
  background: #ecf0f1
  color: #bfd3da
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  margin-bottom: 1.5rem


.modal-enter
  opacity: 0

.modal-leave-active
  opacity: 0

.modal-enter .modal-container,
.modal-leave-active .modal-container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)

</style>