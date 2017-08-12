<script>
import TeacherTopnav from '../common/teacher.topnav'
import ListClass from '../common/class/list_class'
export default {
  name: 'home',
  components: {
    TeacherTopnav,
    ListClass
  },
  created: function () {
    // this.$store.dispatch('loadClassDataFromApi', this.$store.getters.dataStudent.login)
  },
  methods: {
    close_new_class: function () {
      this.launchNewClass = false
      console.log(this.$store.getters.haveClassGroup)
      // this.$store.dispatch('loadClassGroupFromApi', this.$store.getters.dataClassGroup)
    }
  }
}
</script>
<template>

<div>
  <TeacherTopnav></TeacherTopnav>
  <div class="welcome">
    <h1 class="title-welcome">Olá Professor, bem Vindo ao Projeto Conte um Conto!</h1>
    <div class="text">
      <p class="content">Olá professor, esta é a página inicial e aqui ficam os livros dos seus alunos! :D.</p> 
    </div>
  </div>
  <ListClass></ListClass>
</div>
</template>
<style scoped lang="sass">
@import './../../assets/bases.sass'

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