<script>
import globalConfig from '../../../services/GlobalConfigs'
import common from '../../../services/CommonServices'
import Auth from '../../../auth/index'

const API_URL = globalConfig.getApiURL()

export default {
  name: 'new_book',
  data () {
    return {
      title: '',
      summary: '',
      tags: ['Ação', 'Aventura', 'Drama', 'Épico', 'Fantasia', 'Romance', 'Suspense'],
      snackBar: {
        vertical: 'top',
        horizontal: 'right',
        duration: 5000
      },
      situationText: ''
    }
  },
  computed: {
    student_data: function () {
      return this.$store.getters.dataStudent
    }
  },
  created: function () {
    this.$store.dispatch('loadStudentDataFromApi', this.student_data.login)
  },
  methods: {
    save: function () {
      let newBook = {
        _students: this.student_data._id,
        title: this.title,
        summary: this.summary,
        tags: this.tags
      }
      if (common.isEmpty(newBook.title)) {
        this.openSnackBar('Escreva um título para seu livro!')
      } else {
        this.$http.post(API_URL + '/book/' + this.student_data.login, newBook,
          {headers: Auth.getAuthHeader()}
        ).then(({body}) => {
          if (body !== null) {
            // reload the store with new book
            this.$store.dispatch('loadBookDataFromApi', this.student_data.login)
            this.$emit('close')
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    openSnackBar (text) {
      this.situationText = text
      this.$refs.snackbar.open()
    }
  }
}
</script>
<template>
<transition name="modal">
  <div class="modal-mask">

    <div class="modal-wrapper">

      <div class='header-modal'>
        <h1 class="title-large dark">Novo Livro</h1>
        <i class="fa fa-close fa-3x" aria-hidden="true"  @click="$emit('close')" ></i>
      </div>

      <div class="body-modal">
      
        <div class="modal-item">
          
          <div class="form-group">
            <h2 class="form-text">Título do seu livro</h2>
            <input class="input-text" required type="text" v-model="title" minlength="2" placeholder="Qual o nome para sua aventura?">
          </div>
          <div class="form-group">
            <h2 class="form-text">Resumo</h2>
            <textarea class="input-text" rows="7" v-model="summary" placeholder="O que a sua história tem de legal?"></textarea>
          </div>
          <div class="form-group">
            <h2 class="form-text">TAGS/Categorias</h2>
            <md-chips v-model="tags" md-input-placeholder="Remova as tags que você não quer em seu livro">
              <template scope="chip">{{ chip.value }}</template>
            </md-chips>
          </div>
        </div>

        <div class="modal-item">
          <div class="new-image">
            <div class="image">
              <img src='../../../assets/img/kids1.jpg'>
            </div>
            <button class="btn btn-green" @click="save" > Salvar </button>
            <md-snackbar class="snackbar" :md-position="snackBar.vertical + ' ' + snackBar.horizontal" ref="snackbar" :md-duration="snackBar.duration">
              <span>{{situationText}}</span>
              <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">OK</md-button>
            </md-snackbar>
          </div>
        </div>
      </div>

    </div>

  </div>
</transition>
</template>

<style lang="sass">
@import './../../../assets/bases.sass'

.modal-mask
  position: fixed
  z-index: 9997
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
  height: 600px

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

.snackbar
  z-index: 10000

</style>