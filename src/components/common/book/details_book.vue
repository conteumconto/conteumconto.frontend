<script>
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
         <button class="btn-noBg warning" @click="start" > Editar Livro </button>
         <button class="btn-noBg danger" > Apagar Livro </button>
        </div>

        <div class="modal-item">
          
          <div class="new-image">
            <div class="image">
              <img src='../../../assets/img/kids1.jpg'>
            </div>
            <button class="btn-noBg default" > Trocar Capa do Livro </button>
          </div>

        </div>

      </div>

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

</style>