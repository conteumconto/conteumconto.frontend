<template>
  <div>
    <div class="welcome">
      <h1 class="title-welcome">Olá Professor, seja bem vindo ao Projeto Conte um Conto!</h1>
      <div class="text">
        <p class="content">Esta é a página inicial e aqui fica os livros dos seus alunos! :D.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import topnav from '../common/main.topnav'
  export default {
    name: 'home',
    components: {
      topnav
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