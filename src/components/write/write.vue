<script>
import globalConfig from '../../services/GlobalConfigs'

const API_URL = globalConfig.getApiURL()

export default {
  name: 'write',
  data () {
    return {
      title: '',
      chapterText: '',
      editable: true,
      image: ''
    }
  },
  mounted: function () {
    // load the write initial configs
    this.turnOnDesingMode()
    this.loadExitingText()
  },
  methods: {
    focus: function () {
      this.turnOnDesingMode()
      this.$refs.editor_text.contentDocument.body.focus()
    },
    execCmm: function (cmm, value) {
      if (value === '') {
        value = null
      }
      // Execute commands <b> <aling>, etc..
      this.$refs.editor_text.contentDocument.execCommand(cmm, false, value)
    },
    turnOnDesingMode: function () {
      // set the iframe in desing mode on component DOM Load
      this.$refs.editor_text.contentDocument.designMode = 'On'

      // Load css to write iframe - Dont work properly in firefox
      var cssLink = document.createElement('link')
      cssLink.href = 'static/style.css'
      cssLink.rel = 'stylesheet'
      cssLink.type = 'text/css'
      this.$refs.editor_text.contentDocument.head.appendChild(cssLink)

      // Load placeholder instruction to write iframe - Dont work properly in firefox
      var div = document.createElement('div')
      div.id = 'placeholder'
      this.$refs.editor_text.contentDocument.body.appendChild(div)
    },
    clickHandler: function () {
      // Title clean click function
      this.$refs.active.innerHTML = ''
      this.editable = true
    },
    saveChapter: function () {
      // Title get text function
      this.editable = !this.editable
      this.title = this.$refs.active.textContent
      this.chapterText = this.$refs.editor_text.contentDocument.body.innerHTML
      this.title = this.$refs.active.innerHTML = this.title
      let newChap = {
        title: this.title,
        chapterText: this.chapterText
      }
      this.$http.post(API_URL + '/chapter/' + this.$route.params.book_id + '/', newChap,
        {headers: {Authorization: localStorage.getItem('token')}}
      ).then(({body}) => {
      }).catch((err) => {
        console.log(err)
      })
    },
    addImage: function () {
      // Emulates the click to ref='file' input
      this.$refs.file.click()
    },
    upload: function (e) {
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
    loadExitingText: function () {
      this.$http.get(API_URL + '/chapter/id/' + this.$route.params.book_id,
        {headers: {Authorization: localStorage.getItem('token')}}
      ).then(({body}) => {
        if (body !== null) {
          this.$refs.active.textContent = body.title
          this.$refs.editor_text.contentDocument.body.innerHTML = body.chapterText
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    updateChapter: function () {
      this.editable = !this.editable
      this.title = this.$refs.active.textContent
      this.chapterText = this.$refs.editor_text.contentDocument.body.innerHTML
      this.title = this.$refs.active.innerHTML = this.title
      let upChapter = {
        title: this.title,
        chapterText: this.chapterText
      }
      this.$http.put(API_URL + '/chapter/id/' + this.$route.params.book_id + '/', upChapter,
        {headers: {Authorization: localStorage.getItem('token')}}
      ).then(({body}) => {
      }).catch((err) => {
        console.log(err)
      })
    },
    saveOption: function () {
      this.$route.path.split('/').filter((item) => {
        if (item === 'editar') {
          this.updateChapter()
        }
        if (item === 'novo') {
          this.saveChapter()
        }
      })
    }
  }
}
</script>
<template>
<div>
  <div class="topnav">
    <div class="control-menu-wrapper">

      <a class="control-menu-wrapper--item hover" href="/#/meusLivros">
        <i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
        <label class='item-label'>Voltar</label>
      </a>

      <div class="control-menu-wrapper--item">

        <div class="control-menu-wrapper--item-i hover" @click="focus">
          <i class="fa fa-paragraph fa-2x" aria-hidden="true"></i>
          <label class='item-label'>Novo Parágrafo</label>
        </div>

        <div class="control-menu-wrapper--item-i hover"  @click="execCmm('justifyLeft', null)" >
          <i class="fa fa-align-left fa-2x" aria-hidden="true"></i>
          <label class='item-label' >Esquerda</label>
        </div>

        <div class="control-menu-wrapper--item-i hover" @click="execCmm('justifyCenter', null)">
          <i class="fa fa-align-center fa-2x" aria-hidden="true"></i>
          <label class='item-label' >Centralizar</label>
        </div>

        <div class="control-menu-wrapper--item-i hover" @click="execCmm('justifyRight', null)">
          <i class="fa fa-align-right fa-2x" aria-hidden="true"></i>
          <label class='item-label' >Direita</label>
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
    <a class='control-menu-wrapper--item-i done' @click='saveOption()' href="/#/meusLivros" >
      <i class="fa fa-check fa-2x" aria-hidden="true"></i>
      <label class='item-label'>Acabei</label>
    </a>
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
  color: $orange_base
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
  color: $orange_lightier
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
  color: $green
  trasition: all .4s ease

.done:hover
  color: $green-dark
</style>
