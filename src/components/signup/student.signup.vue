<template>
  <div id="student-signup">
    <div class="container">
      <form @submit="onSubmit" onsubmit="return false">
        <div class="form-group">
          <div style="margin-top: 4em" class="form-text">NOME</div>
          <input required type="text" v-model="student.first_name" minlength="3" maxlength="100" name="nome" placeholder="Digite seu nome">
        </div>
        <div class="form-group">
          <div class="form-text">SOBRENOME</div>
          <input required type="text" v-model="student.last_name" minlength="3" name="sobreNome" placeholder="Digite seu sobrenome">
        </div>
        <div class="form-group">
          <div class="form-text">IDADE</div>
          <input required type="number" v-model="student.birth_day" name="idade" min="1" max="100" placeholder="Qual a sua idade?">
        </div>
        <div class="form-group">
          <div class="form-text">EMAIL</div>
          <input required type="email" v-model="student.email" name="email" placeholder="Digite seu email">
        </div>
        <div class="form-group">
          <div class="form-text">LOGIN</div>
          <input required type="login" v-model="student.login" name="login" placeholder="Crie um login para a sua conta">
        </div>
        <div class="form-group">
          <div class="form-text">SENHA</div>
          <div class="password-input-wrapper">
            <input required type="password" v-if="hidePassword" v-model="student.password" minlength="5" name="senha" placeholder="Crie uma senha">
            <input required type="text" v-else v-model="student.password" minlength="5" name="senha" placeholder="Crie uma senha">
            <i class="fa fa-eye toggle-password" aria-hidden="true" v-if="hidePassword" @click="hidePassword = !hidePassword"></i>
            <i class="fa fa-eye-slash toggle-password" aria-hidden="true" v-else @click="hidePassword = !hidePassword"></i>
          </div>
        </div>
        <button type="submit" class="btn btn-green"> CADASTRAR </button>
        <md-snackbar :md-position="snackBar.vertical + ' ' + snackBar.horizontal" ref="snackbar" :md-duration="snackBar.duration">
          <span>{{situationText}}</span>
        </md-snackbar>
      </form>
    </div>
  </div>
</template>

<script>
  import loginTopnav from '../common/loginTopnav'
  import auth from '../../auth'

  export default {
    name: 'student-signup',
    data () {
      return {
        student: {
          first_name: '',
          last_name: '',
          birth_day: '',
          email: '',
          login: '',
          password: ''
        },
        snackBar: {
          vertical: 'top',
          horizontal: 'right',
          duration: 5000
        },
        situationText: '',
        hidePassword: true
      }
    },
    components: {
      loginTopnav
    },
    methods: {
      onSubmit () {
        auth.signup(this, this.student, '/student')
      },
      openSnackBar (text) {
        this.situationText = text
        this.$refs.snackbar.open()
      }
    }
  }
</script>

<style scoped lang="sass">
  @import './../../assets/bases.sass'

  $gray-input: #bbd;
  $formWidth: 420px;

  #student-signup
    position: relative;
    background-color: $blue-lightier;
  
  .container
    margin: auto;
    width: 35em;
    border-radius: 15px;
    border: 1px solid white;
    background-color: white;
  
  form
    height: 100%;
    margin: auto;  
    text-align: center;
  
  .form-text
    margin: auto;
    margin-top: 1.2em;
    margin-bottom: 0.3em; 
    width: $formWidth;
    text-align: left;
    font-family: 'Ubuntu', 'Arial', sans-serif!important;
    font-weight: 500;

  input
    margin: auto;
    width: $formWidth;
    height: 40px;
    border-radius: 8px; 
    border: 1px solid $gray-input;
    font-family: 'Ubuntu', 'Arial', sans-serif!important; 
    font-weight: 300;
    text-indent: 0.7em;

  .wrong-password
    margin: 1.5rem auto 0rem;

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
</style>