<template>
  <div id="login">
    <loginTopnav :page="'login'"></loginTopnav>
    <div class="container">
      <form @submit="onSubmit" onsubmit="return false">
        <div class="form-group">
          <div style="margin-top: 4em" class="form-text"> LOGIN </div>
          <input required type="login" v-model="credentials.login" v-bind:class="{danger:isDanger}" name="login" placeholder="Digite seu login">
        </div>
        <div class="form-group">
          <div class="form-text"> SENHA </div>
          <div class="password-input-wrapper">
            <input required type="password" v-if="hidePassword" v-model="credentials.password" minlength="5" v-bind:class="{danger:isDanger}" name="senha" placeholder="Digite sua senha">
            <input required type="text" v-else v-model="credentials.password" minlength="5" v-bind:class="{danger:isDanger}" name="senha" placeholder="Digite sua senha">
            <i class="fa fa-eye toggle-password" aria-hidden="true" v-if="hidePassword" @click="hidePassword = !hidePassword"></i>
            <i class="fa fa-eye-slash toggle-password" aria-hidden="true" v-else @click="hidePassword = !hidePassword"></i>
          </div>
        </div>
        <button type="submit" class="btn btn-red"> ENTRAR </button>
        <md-snackbar :md-position="snackBar.vertical + ' ' + snackBar.horizontal" ref="snackbar" :md-duration="snackBar.duration">
          <span>{{situationText}}</span>
          <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">OK</md-button>
        </md-snackbar>
      </form>
    </div>
  </div>
</template>

<script>
  import loginTopnav from '../common/loginTopnav'
  import auth from '../../auth'

  export default {
    name: 'login',
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
        situationText: ''
      }
    },
    components: {
      loginTopnav
    },
    methods: {
      onSubmit () {
        var credentials = {
          login: this.credentials.login,
          password: this.credentials.password
        }
        auth.login(this, credentials)
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

  #login
    height: 100%;
    background-color: $blue-lightier;
    position: relative;
  
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
    color: $blue_dark

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