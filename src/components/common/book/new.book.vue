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
                <img v-show="!isSaving" :src="photo.url">
                <md-spinner v-show="isSaving" md-indeterminate></md-spinner>
              </div>
              <div>
                <label for="bookNewPhoto" :disabled="isSaving" class="btn btn-green-outline">Inserir Foto</label>
                <input type="file" id="bookNewPhoto" name="photos" :disabled="isSaving" @change="newPhoto($event.target.name, $event.target.files);" accept="image/*" class="input-file">
              </div>
              <md-snackbar class="snackbar" :md-position="snackBar.vertical + ' ' + snackBar.horizontal" ref="snackbar" :md-duration="snackBar.duration">
                <span>{{situationText}}</span>
                <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">OK</md-button>
              </md-snackbar>
              <button class="btn btn-green" @click="save" > Salvar </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import common from '../../../services/common.service'
  import photoUpload from '../../../services/PhotoUpload.service'
  import CucHttpService from '../../../services/Cuc.Http.service'

  let cucHttp = new CucHttpService('conteumconto', null)

  const STATUS_INITIAL = 0
  const STATUS_SAVING = 1
  const STATUS_SUCCESS = 2
  const STATUS_FAILED = 3

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
        situationText: '',
        photo: {
          name: 'Foto Padrão',
          url: './static/img/kids1.jpg'
        },
        uploadStatus: STATUS_INITIAL
      }
    },
    computed: {
      student_data () {
        return this.$store.getters.dataStudent
      },
      isSaving () {
        return this.uploadStatus === STATUS_SAVING
      }
    },
    created () {
      this.$store.dispatch('loadStudentDataFromApi', this.student_data.login)
    },
    methods: {
      save () {
        let newBook = {
          _students: this.student_data._id,
          title: this.title,
          summary: this.summary,
          tags: this.tags,
          photo: this.photo
        }
        if (common.isEmpty(newBook.title)) {
          this.openSnackBar('Escreva um título para seu livro!')
        } else {
          cucHttp.setAuthHeaders(localStorage.getItem('token'))
          cucHttp.newBook(newBook, {studentLogin: this.student_data.login})
            .then(response => {
              if (response !== null) {
                // reload the store with new book
                this.$store.dispatch('loadBookDataFromApi', this.student_data.login)
                this.$emit('close')
              }
            })
            .catch(err => console.error(err))
        }
      },
      newPhoto (fieldName, fileList) {
        // handle new photo
        const formData = new FormData()
        // if no photo was sent, return and don't save
        if (!fileList.length) return
        // append the files to FormData, splitting spaces
        Array
          .from(Array(fileList.length).keys())
          .map(x => formData.append(fieldName, fileList[x], fileList[x].name.replace(/\s/g, '')))

        // save it
        this.savePhoto(formData)
      },
      savePhoto (formData) {
        // upload data to the server
        this.uploadStatus = STATUS_SAVING

        photoUpload.uploadFirebase(formData)
          .then(photos => {
            this.photo = photos[0]
            this.uploadStatus = STATUS_SUCCESS
          })
          .catch(err => {
            this.uploadError = err.response
            this.uploadStatus = STATUS_FAILED
          })
      },
      openSnackBar (text) {
        this.situationText = text
        this.$refs.snackbar.open()
      }
    }
  }
</script>

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
    height: auto

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
    margin: 1rem 1.5rem

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
    width: auto
    height: auto
    border-radius: 5px/5px
    background: #ecf0f1
    color: #fff
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

  .input-file
    display: none
</style>