<script>
import NewClass from './new_class.vue'
import CardClass from './card_class.vue'

export default {
  name: 'list_class',
  components: {
    NewClass,
    CardClass
  },
  props: ['home'],
  data () {
    return {
      launchNewClass: false
    }
  },
  created: function () {
    console.log(this.$store.dispatch('loadClassGroupsFromApi', this.teacher_data._id))
    console.log(this.$store.getters.haveClassGroup)
  },
  computed: {
    teacher_data: function () {
      return this.$store.getters.dataTeacher
    }
  },
  methods: {
    close_new_class: function () {
      this.launchNewClass = false
      // this.$store.dispatch('loadClassDataFromApi', this.$store.getters.dataStudent.login)
    },
    print () {
      console.log(this.$store.getters.dataClassGroup)
      console.log(this.$store.getters.haveClassGroup)
    }
  }
}
</script>
<template>
<div id="List-Class">
  <NewClass v-if="launchNewClass" @close="this.close_new_class"></NewClass>
  <div @click="print()">Print ClassGroups</div>
  <div v-if="!this.$store.getters.haveClassGroup" class="new-class">
    <div class="content">Ainda não possui uma turma?</div>
    <div class="content">Crie uma nova clicando no botão abaixo!</div>  
    <button class="btn btn-large btn-green" @click="launchNewClass = true">Nova Turma</button>
  </div>
  <div v-if="this.$store.getters.haveClassGroup" class="classgroup-list">
    <h2 class="title-large">Turmas Cadastradas</h2>
    <CardClass v-for='classGroup in this.$store.getters.dataClassGroup' :classGroup="classGroup"></CardClass>
  </div>
</div>
</div>
</template>
<style scoped lang="sass">
@import './../../../assets/bases.sass'

#List-Class
  min-height: 580px

.classgroup-list
  display: flex
  flex-direction: column
  align-items: center

  .title-large
    color: $red;

.search
  font:
    size: 1rem
    family: $title_alter_font
  margin: 1rem

.class_search
  height: 60px
  width: 65%
  background: #fff
  margin: 1rem
  border-radius: 20px/20px
  display: flex
  justify-content: space-between

.emptyWrapper
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

.new-class
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 15rem;

  .content
    font-size: 1.5rem;
    line-height: 2rem;
  
  .btn
    height: 5rem;
    margin: auto;
    box-shadow: $shadow_1; 

  .btn:hover
    text-decoration: none;
  
</style>