<script>
import topnav from '../common/topnav.vue'
import ListBook from '../common/book/list_book.vue'

export default {
  name: 'home',
  components: {
    topnav,
    ListBook
  },
  computed: {
    student_data: function () {
      return this.$store.getters.dataStudent
    }
  }
}
</script>
<template>

<div>
  <topnav v-bind:toggleNav='true' ></topnav>
  <div class="welcome">
    <h1 class="title-welcome">Bem Vindo ao Projeto Conte um Conto!</h1>
    <div class="text">
      <p class="content">Olá amiguinho, nós queremos te ajudar a escrever melhor. Esta é a página inicial e aqui fica o livro que você está escrevendo junto com seu professor.</p>
    </div>
  </div>
  <ListBook v-bind:home='true'></ListBook>
</div>

</template>
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