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
                      <md-table-row v-for="chapter in this.book.chapters" :key="chapter._id">
                        <md-table-cell>{{chapter.title}}</md-table-cell>
                        <md-table-cell><router-link class="edit" :to="chapter.url"> <md-icon>edit</md-icon></router-link></md-table-cell>
                        <md-table-cell><button class="edit" @click="removeChapter(chapter)"> <md-icon>delete</md-icon> </button></md-table-cell>
                      </md-table-row>
                    </md-table-body>
                  </md-table>
                  <router-link class="btn-noBg sucess" :to="this.newChapterUrl" > Escrever </router-link>
                </div>
                <div class="modal-item">
                  <div class="new-image">
                    <div class="image">
                      <img :src="this.book.photo">
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
                </div>

                <div class="modal-item">
                  <div class="new-image">
                    <div class="image">
                      <img :src="this.book.photo">
                    </div>
                  </div>
                  <div class="buttons-details">
                    <!-- <button class="btn btn-green-outline" > Alterar Foto </button> -->
                    <div>
                      <button class="btn btn-green" @click="saveChanges" > Salvar </button>
                      <button class="btn btn-red" @click="removeBook" > Apagar Livro </button>
                    </div>
                  </div>
                </div>
              </div>
            </md-tab>
          </md-tabs>

        </div>
      </div>
    </transition>
    <cucSnackbar :open="open"></cucSnackbar>
  </div>
</template>

<script>
  import Vue from 'vue'
  import common from '../../../services/common.service'
  import CucHttpService from '../../../services/Cuc.Http.service'
  import cucSnackbar from '../cuc.snackbar'
  import Swal from '../../../services/Swal.service'

  const swal = new Swal()
  let cucHttp = new CucHttpService('conteumconto', null)

  export default {
    name: 'details_book',
    data () {
      return {
        title: '',
        summary: '',
        tags: [],
        edit: false,
        photo: {
          name: 'Foto Padrão',
          url: '../../../../static/img/kids1.jpg'
        },
        newChapterUrl: '',
        open: new Vue(),
        swalTimeout: 3000
      }
    },
    components: {
      cucSnackbar
    },
    props: ['book'],
    mounted () {
      this.title = this.book.title
      this.summary = this.book.summary
      this.tags = this.book.tags
      this.newChapterUrl = {name: 'write-new-book', params: {book_id: this.book._id}}
    },
    created () {
      if (!common.isEmpty(this.book.photo.url)) this.photo = this.book.photo
    },
    methods: {
      saveChanges () {
        let editBook = {
          title: this.title,
          summary: this.summary,
          tags: this.tags,
          photo: this.book.photo
        }

        if (common.isEmpty(editBook.title)) this.openSnackBar('Escreva um título para seu livro!')
        else if (common.isEmpty(editBook.summary)) this.openSnackBar('Escreva um resumo para o livro!')
        else if (editBook.summary.length < 30) this.openSnackBar('O resumo deve ter no mínimo 30 caracteres!')
        else {
          this.$emit('close')
          swal.loading('Estamos atualizando o seu livro...', this.swalTimeout)

          cucHttp.setAuthHeaders(localStorage.getItem('token'))
          cucHttp.editBook(editBook, {bookId: this.book._id})
            .then(response => {
              setTimeout(() => {
                this.$store.dispatch('updateBookData', response.data)
                this.$emit('close')
                swal.simpleSuccess('Adicionado!', 'Seu livro foi atualizado com sucesso!')
              }, this.swalTimeout)
            })
            .catch(err => {
              console.error(err.response)
              let errMsg = null
              if (common.isEmpty(err.response)) errMsg = 'O sistema está fora do ar. Tente novamente mais tarde!'
              else errMsg = 'Não foi possível atualizar esse livro. Tente novamente mais tarde!'
              swal.simpleError('Erro!', errMsg)
            })
        }
      },
      removeBook () {
        this.$emit('close')
        swal.simpleConfirmation(
          'Você tem certeza?',
          'Esse livro deixará de existir após a confirmação!',
          'Sim, excluir esse livro',
          'Cancelar')
        .then(response => {
          if (!common.isEmpty(response.value)) {
            if (response.value === true) {
              swal.loading('Estamos deletando o seu livro...', this.swalTimeout)
              cucHttp.setAuthHeaders(localStorage.getItem('token'))
              return cucHttp.deleteBook({bookId: this.book._id})
            }
          } else return response
        })
        .then(response => {
          if (common.isEmpty(response.dismiss)) {
            setTimeout(() => {
              response.data.deleted = true
              this.$store.dispatch('updateBookData', response.data)
              swal.simpleSuccess('Sucesso!', 'Seu livro foi removido com sucesso!')
            }, this.swalTimeout)
          }
        })
        .catch(err => {
          console.error(err.response)
          let errMsg = null
          if (common.isEmpty(err.response)) errMsg = 'O sistema está fora do ar. Tente novamente mais tarde!'
          else errMsg = 'Não foi possível remover esse livro. Tente novamente mais tarde!'
          swal.simpleError('Erro!', errMsg)
        })
      },
      removeChapter (chapter) {
        this.$emit('close')
        swal.simpleConfirmation(
          'Você tem certeza?',
          'Esse capítulo deixará de existir após a confirmação!',
          'Sim, excluir esse capítulo',
          'Cancelar')
        .then(response => {
          if (!common.isEmpty(response.value)) {
            if (response.value === true) {
              swal.loading('Estamos deletando o seu capítulo...', this.swalTimeout)
              cucHttp.setAuthHeaders(localStorage.getItem('token'))
              return cucHttp.deleteChapter({chapterId: chapter._id, bookId: this.$store.getters.actualBook})
            }
          }
        })
        .then(response => {
          setTimeout(() => {
            swal.simpleSuccess('Sucesso!', 'O capítulo foi removido com sucesso!')
            response.data.deleted = true
            this.$store.dispatch('updateChapterData', response.data)
            this.$router.push({name: 'books'})
          }, this.swalTimeout)
        })
        .catch(err => {
          console.error(err.response)
          let errMsg = null
          if (common.isEmpty(err.response)) errMsg = 'O sistema está fora do ar. Tente novamente mais tarde!'
          else errMsg = 'Não foi possível remover esse capítulo. Tente novamente mais tarde!'
          swal.simpleError('Erro!', errMsg)
        })
      },
      openSnackBar (text) {
        this.open.$emit('openCucSnackbar', { text })
      }
    }
  }
</script>

<style lang="sass">
  @import './../../../assets/bases.sass'

  .edit
    color: $blue_base !important
    transition: all .3s ease
    cursor: pointer

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
  
  .md-tabs .md-tab
    padding: 0

  .modal-item
    flex: 1
    margin: 0 0 0 1.5em
  
  .buttons-details
    text-align: center
    margin-bottom: 1em
    .btn 
      padding: .7em
      margin: .5em

  .form-group
    margin: 1rem

  .new-image
    margin: 0
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
    height: 300px
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