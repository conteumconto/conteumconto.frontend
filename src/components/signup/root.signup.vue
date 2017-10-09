<script>
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
<template>
  <div class="login-wrapper">

    <div class="logo">
      <div class='center-trick'>  
        <a href="#/entrar"><img src="../../assets/img/logo.png" height='64' width='261' alt="logo" /></a>
        <h1> Escrever Aprender Ensinar</h1>
      </div>
    </div>

    <div class="login">
      
      <h1 class="title-welcome">Cadastre-se </h1>
      <div  class="user-options">
        <button class="btn-noBg warning" @click="setUser('student')">Sou Estudante</button>
        <button class="btn-noBg sucess" @click="setUser('teacher')">Sou Professor</button>
      </div>

      <div v-if="this.user == 'student'">
          <studentSignup></studentSignup>
      </div>
      <div v-else-if="this.user == 'teacher'">
          <teacherSignup></teacherSignup>
      </div>
      <div class="login-footer">
        <a class="form-text" href="entrar">Entrar</a> <br />
      </div>
    </div>
    
  </div>
  
</template>
<style scoped lang="sass">
  @import './../../assets/bases.sass'

  $gray-input: #bbd;
  $formWidth: 420px;

  .login-wrapper
    display: flex
    flex-flow: row wrap
    background: #fff
  
  .logo, .login
    flex: 1 1

  .logo
    background: blue
    background: url('./../../assets/img/login_bg.jpg') no-repeat center center fixed
    box-shadow: inset 0 0 0 1000px rgba(12, 83, 157, 0.5);
    -webkit-background-size: cover
    -moz-background-size: cover
    background-size: cover
    -o-background-size: cover
  
  .center-trick
    position: fixed
    left: 27%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center


  .logo h1
    font-family: $title_font
    color: #fff
    font-size: 1.2rem
  
  .login
    display: flex
    justify-content: center
    align-items: center
    display: flex
    justify-content: flex-start
    align-items: center
    flex-flow: column wrap

  .user-options
    margin-top: 1rem
    margin-bottom: 2rem
    display: flex
    justify-content: center
    align-items: center

  .login-footer
    text-align: center
    margin-top: 2rem
    margin-bottom: 2rem

  .container
    margin: 5em auto;
    width: 35em;
    border-radius: 10px;
    border: 1px solid white;
    background-color: white;
  
  form
    height: 100%;
    margin: auto;  
    text-align: center;
  
  .form-text
    margin: 2em auto 0.3em;
    width: $formWidth;
    text-align: left;
    font-family: $title_alter_font!important;
    font-weight: 500;
    color: $blue_dark!important

  input
    margin: auto;
    width: $formWidth;
    height: 40px;
    border-radius: 8px; 
    border: 1px solid $gray-input;
    font-family: $title_alter_font!important; 
    font-weight: 300;
    text-indent: 0.7em;

  .password-input-wrapper
    position: relative;
    width: 420px;
    margin: auto;

  .toggle-password
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-75%, 75%);
    color: #668;

  .danger
    border: 1px solid red
</style>