<template>
  <div id="signup">
    <loginTopnav :page="'signup'"></loginTopnav>
    <div class="user-options">
      <button class="btn btn-student" @click="setUser('student')" v-bind:class="{selected:user=='student'}">Sou Estudante</button>
      <button class="btn btn-teacher" @click="setUser('teacher')" v-bind:class="{selected:user=='teacher'}">Sou Professor</button>
    </div>
    <div v-if="this.user == 'student'">
        <studentSignup></studentSignup>
    </div>
    <div v-else-if="this.user == 'teacher'">
        <teacherSignup></teacherSignup>
    </div>
  </div>
</template>

<script>
  import loginTopnav from '../common/loginTopnav'
  import studentSignup from './student.signup'
  import teacherSignup from './teacher.signup'
  export default {
    name: 'signup',
    data () {
      return {
        // Stores if the actor is a student or a teacher
        user: 'student'
      }
    },
    components: {
      loginTopnav,
      studentSignup,
      teacherSignup
    },
    methods: {
      setUser (user) {
        this.user = user
      }
    }
  }
</script>

<style scoped lang="sass">
  @import './../../assets/bases.sass'

  $gray-input: #bbd;
  $formWidth: 420px;

  #signup
    position: relative;
    background-color: $blue-lightier;
  
  .user-options
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
    background-color: $blue-lightier;
  
    .btn
      flex: 0 1 auto;
      width: 300px;
      height: 4rem;
      border-radius: 30px;
      background-color: white;
      color: black;

    .btn:hover
      background-color: $blue-base;
      color: white;

    .selected
      background-color: $blue-dark;
      color: white;
</style>