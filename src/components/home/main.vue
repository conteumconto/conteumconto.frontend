<template>
  <div>
    <topnav v-bind:toggleNav='true' ></topnav>
    <div class="welcome">
      <h1 class="title-welcome">Bem vindo ao Projeto Conte um Conto!</h1>
      <div class="text">
        <p class="content">Olá amiguinho, nós queremos te ajudar a escrever melhor. Esta é a página inicial e aqui ficam os livros que você está escrevendo junto com seu professor.</p>
      </div>
    </div>
    <ListBook v-bind:home='true'></ListBook>
  </div>
</template>

<script>
  import topnav from '../common/main.topnav'
  import ListBook from '../common/book/list.book'

  export default {
    name: 'home',
    components: {
      topnav,
      ListBook
    },
    computed: {
      student_data () {
        return this.$store.getters.dataStudent
      }
    }
  }
</script>

<style scoped lang="sass">
  @import './../../assets/bases.sass'

  .ct-btn
    display: flex
    justify-content: center

  .welcome
    background: #fff
    padding: .5rem
    text-align: center
    display: flex
    flex-direction: column
    align-items: center

  .text
    width: 800px
    margin-bottom: 1rem
</style>