<template>
  <div>
    <div class="topnav">
      <div class="control-menu-wrapper">
        <router-link class="control-menu-wrapper--item hover" :to="{name: 'books'}">
          <i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
          <label class='item-label'>Voltar</label>
        </router-link>

        <div class="control-menu-wrapper--item">
          <div class="control-menu-wrapper--item-i hover" @click="focus">
            <i class="fa fa-paragraph fa-2x" aria-hidden="true"></i>
            <label class='item-label'>Novo Parágrafo</label>
          </div>
          <div class="control-menu-wrapper--item-i hover"  @click="execCmm('justifyLeft', null)" >
            <i class="fa fa-align-left fa-2x" aria-hidden="true"></i>
            <label class='item-label'>Esquerda</label>
          </div>
          <div class="control-menu-wrapper--item-i hover" @click="execCmm('justifyCenter', null)">
            <i class="fa fa-align-center fa-2x" aria-hidden="true"></i>
            <label class='item-label'>Centralizar</label>
          </div>
          <div class="control-menu-wrapper--item-i hover" @click="execCmm('justifyRight', null)">
            <i class="fa fa-align-right fa-2x" aria-hidden="true"></i>
            <label class='item-label'>Direita</label>
          </div>
          <div class="control-menu-wrapper--item-i hover" @click="execCmm('justifyFull', null)">
            <i class="fa fa-align-justify fa-2x" aria-hidden="true"></i>
            <label class='item-label'>Justificado</label>
          </div>
          <div class="control-menu-wrapper--item-i hover" @click="execCmm('bold', null)" >
            <i class="fa fa-bold fa-2x" aria-hidden="true"></i>
            <label class='item-label'>Forte</label>
          </div>
          <!--<div class="control-menu-wrapper--item-i hover" @click='addImage'>
            <i class="fa fa-file-image-o fa-2x" aria-hidden="true"></i>
            <label class='item-label'>Imagem</label>
            <input type="file" ref="file" accept="image/*" @change="upload($event)" style="display:none">
          </div>-->
        </div>
      </div>
    </div>

    <div class='title-wrapper'>
      <div class="title" ref="active" placeholder="Clique e digite o Título" :contenteditable="editable" v-on:keyup.enter="getText" v-on:click="clickHandler">
      </div>
      <div class='control-menu-wrapper--item-i done hover' @click='saveOption()' >
        <i class="fa fa-check fa-2x" aria-hidden="true"></i>
        <label class='item-label'>Acabei</label>
      </div>
    </div>

    <div class="editor-content" >
      <div class='text-area'>
        <iframe ref="editor_text">
        </iframe>
      </div>
    </div>

  <!-- <div class='image-content'>
      <label class='item-label'>Araste</label>
      <img :src="image">
    </div> -->

  </div>
</template>

<script>
  import ChapterService from '../../services/Chapter.service'
  import common from '../../services/common.service'
  import CucHttpService from '../../services/Cuc.Http.service'
  import Swal from '../../services/Swal.service'

  const swal = new Swal()
  let cucHttp = new CucHttpService('conteumconto', null)

  export default {
    name: 'write',
    data () {
      return {
        title: '',
        chapterText: '',
        editable: true,
        image: '',
        swalTimeout: 3000
      }
    },
    mounted () {
      // load the write initial configs
      this.turnOnDesignMode()
      if (this.$router.history.current.name === 'write-existent-chapter') this.loadExitingText()
    },
    methods: {
      focus () {
        this.turnOnDesignMode()
        this.$refs.editor_text.contentDocument.body.focus()
      },
      execCmm (cmm, value) {
        if (value === '') {
          value = null
        }
        // Execute commands <b> <aling>, etc..
        this.$refs.editor_text.contentDocument.execCommand(cmm, false, value)
      },
      turnOnDesignMode () {
        // set the iframe in design mode on component DOM Load
        this.$refs.editor_text.contentDocument.designMode = 'On'

        // Load css to write iframe - Dont work properly in firefox
        var cssLink = document.createElement('link')
        cssLink.href = '../../../static/style.css'
        cssLink.rel = 'stylesheet'
        cssLink.type = 'text/css'
        this.$refs.editor_text.contentDocument.head.appendChild(cssLink)

        // Load placeholder instruction to write iframe - Dont work properly in firefox
        var div = document.createElement('div')
        div.id = 'placeholder'
        this.$refs.editor_text.contentDocument.body.appendChild(div)
      },
      clickHandler () {
        // Title clean click function
        this.$refs.active.innerHTML = ''
        this.editable = true
      },
      addImage () {
        // Emulates the click to ref='file' input
        this.$refs.file.click()
      },
      upload (e) {
        // Upload image to this.image property
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          this.image = e.target.result
        }
        reader.readAsDataURL(files[0])
      },
      loadExitingText () {
        try {
          const chapter = ChapterService.getChapterData(this.$store.getters.actualBook, this.$route.params.chapter_id)
          this.$refs.active.textContent = chapter.title
          this.$refs.editor_text.contentDocument.body.innerHTML = chapter.chapterText
        } catch (err) {
          console.error(err.message)
          if (err.message === 'chapter_not_found') {
            swal.simpleError('Erro!', 'Capítulo não encontrado para edição. Tente novamente mais tarde!')
            this.$router.push({name: 'books'})
          }
        }
      },
      saveChapter () {
        // Title get text function
        this.editable = !this.editable
        this.title = this.$refs.active.textContent
        this.chapterText = this.$refs.editor_text.contentDocument.body.innerHTML
        this.title = this.$refs.active.innerHTML = this.title
        let newChap = {
          title: this.title,
          chapterText: this.chapterText
        }
        swal.loading('Estamos salvando seu novo capítulo...', this.swalTimeout)
        cucHttp.setAuthHeaders(localStorage.getItem('token'))
        cucHttp.newChapter(newChap, {bookId: this.$route.params.book_id})
          .then(response => {
            try {
              setTimeout(() => {
                this.$store.dispatch('storeNewChapterData', response.data)
                this.$router.push({name: 'books'})
                swal.simpleSuccess('Adicionado!', 'O novo capítulo foi salvo com sucesso!')
              }, this.swalTimeout)
            } catch (err) {
              throw new Error(err.message)
            }
          })
          .catch(err => {
            console.error(err.response)
            let errMsg = null
            if (common.isEmpty(err.response)) errMsg = 'O sistema está fora do ar. Tente novamente mais tarde!'
            else errMsg = 'Houve um probleminha para guardar o capítulo no seu livro. Entre novamente para ver o mesmo, ok?'
            swal.simpleError('Erro!', errMsg)
          })
      },
      updateChapter () {
        this.editable = !this.editable
        this.title = this.$refs.active.textContent
        this.chapterText = this.$refs.editor_text.contentDocument.body.innerHTML
        this.title = this.$refs.active.innerHTML = this.title
        let updatedChapter = {
          title: this.title,
          chapterText: this.chapterText
        }
        swal.loading('Estamos atualizando esse capítulo...', this.swalTimeout)
        cucHttp.setAuthHeaders(localStorage.getItem('token'))
        cucHttp.editChapter(updatedChapter, {chapterId: this.$route.params.chapter_id})
          .then(response => {
            try {
              setTimeout(() => {
                this.$store.dispatch('updateChapterData', response.data)
                this.$router.push({name: 'books'})
                swal.simpleSuccess('Atualizado!', 'O capítulo foi atualizado com sucesso!')
              }, this.swalTimeout)
            } catch (err) {
              throw new Error(err.message)
            }
          })
          .catch(err => {
            console.error(err.response)
            let errMsg = null
            if (common.isEmpty(err.response)) errMsg = 'O sistema está fora do ar. Tente novamente mais tarde!'
            else errMsg = 'Houve um probleminha para atualizar o capítulo do seu livro. Entre novamente para ver o mesmo, ok?'
            swal.simpleError('Erro!', errMsg)
          })
      },
      saveOption () {
        if (this.$router.history.current.name === 'write-existent-chapter') this.updateChapter()
        else if (this.$router.history.current.name === 'write-new-book') this.saveChapter()
        // this.$route.path.split('/').filter((item) => {
        //   if (item === 'editar') this.updateChapter()
        //   else if (item === 'novo') this.saveChapter()
        // })
      }
    }
  }
</script>

<style lang="sass">
  @import './../../assets/bases.sass'

  .image-content
    @extend .bg-top-nav
    position: fixed
    bottom: 0
    left: 0
    height: 30%
    width: 100%

  .editor-content
    display: flex
    justify-content: center

  .editor-content iframe
    padding: 1rem
    width: 100%
    min-height: 100%;
    overflow-y: scroll;

  .text-area
    background: #fff
    flex: .75 0 0
    height: 80vh
    margin-bottom: 1rem

  .title-wrapper
    width: 75%
    margin: 0 auto 
    display: flex
    justify-content: center

  .title
    @extend .title-large
    color: $blue_dark
    flex: 1 0 0
    /*hides ugly unneccessary scrollbars*/
    overflow: hidden
    /*allows proper positioning of `before` area*/
    position: relative
    /*breaks long words into multiple lines - firefox needs it*/
    word-wrap: break-word
    padding: 10px
    margin-left: 1rem

  .title:empty:before
    content: attr(placeholder)
    color: $blue_lightier
    opacity: .7

  .control-menu-wrapper
    margin: 0 5rem 0 5rem
    flex: 1 
    display: flex
    justify-content: space-between

  .control-menu-wrapper--item
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  .control-menu-wrapper--item:last-child
    flex: 1 0 0
    display: flex
    flex-direction: row
    justify-content: flex-end

  .control-menu-wrapper--item-i
    display: flex
    flex-direction: column
    margin: 1rem
    text-align: center

  .item-label
    font-family: $title_font
    font-size: 1rem
    font-weight: bold
    margin-top: 10px
    cursor: pointer

  .hover
    trasition: all .4s ease
    cursor: pointer

  .hover:hover
    color: $blue_dark

  .done
    cursor: pointer
    font-size: 2rem
    color: $blue_lightier
    trasition: all .4s ease

  .done:hover
    color: $blue_dark
</style>
