<template>
  <div class="login-wrapper">
    <div class="logo">
      <a><img src="../../assets/img/logo.png" height='64' width='261' alt="logo" /></a>
      <h1> Escrever Aprender Ensinar</h1>
    </div>
    <div class="login">
      <h1 class="title-welcome">Recuperar Senha </h1>
      <div class="container">
        <form @submit="onSubmit" onsubmit="return false">
          <div class="form-group">
            <div class="form-text">EMAIL</div>
            <input required type="email"  name="email" placeholder="Digite seu email">
          </div>
          <button type="submit" class="btn btn-green"> Enviar </button>
          <cucSnackbar :open="open"></cucSnackbar>
        </form>
      </div>
      <div class="login-footer">
        <router-link class="form-text" :to="{name: 'signup'}">Cadastre-se</router-link> <br />
        <router-link class="form-text" :to="{name: 'login'}">Entre</router-link>
      </div>
    </div>
  </div>
  
</template>

<script>
  import Vue from 'vue'
  import loginTopnav from '../common/login.topnav'
  import Auth from '../../services/auth.service'
  import cucSnackbar from '../common/cuc.snackbar'

  export default {
    name: 'forgot',
    data () {
      return {
        credentials: {
          login: '',
          password: ''
        },
        isDanger: false,
        hidePassword: true,
        error: '',
        snackBar: {
          vertical: 'top',
          horizontal: 'right',
          duration: 10000
        },
        open: new Vue()
      }
    },
    components: {
      loginTopnav,
      cucSnackbar
    },
    methods: {
      onSubmit () {
        var credentials = {
          login: this.credentials.login,
          password: this.credentials.password
        }
        Auth.login(this, credentials)
      },
      openSnackBar (text) {
        this.open.$emit('openCucSnackbar', { text })
      }
    }
  }
</script>

<style scoped lang="sass">
  @import './../../assets/bases.sass'

  $gray-input: #bbd;
  $formWidth: 420px;

  .login-wrapper
    width: 100%
    height: 100%
    background: green
    display: flex
    flex-flow: row wrap

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
    display: flex
    justify-content: center
    align-items: center
    flex-flow: column wrap

  .logo h1
    font-family: $title_font
    color: #fff
    font-size: 1.2rem
  
  .login
    background: #fff
    display: flex
    justify-content: center
    align-items: center
    display: flex
    justify-content: center
    align-items: center
    flex-flow: column wrap

  .login-footer
    text-align: center

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