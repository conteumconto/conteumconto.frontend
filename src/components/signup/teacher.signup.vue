<template>
  <transition
    name="bounce"
    enter-active-class="bounceInRight"
    leave-active-class="bounceOutRight">
    <div id="teacher-signup">
      <div class="container">
        <form @submit="onSubmit" onsubmit="return false">
          <div class="form-group">
            <div class="form-text">NOME</div>
            <input required type="text" v-model="teacher.first_name" minlength="3" maxlength="100" name="nome" placeholder="Digite seu nome">
          </div>
          <div class="form-group">
            <div class="form-text">SOBRENOME</div>
            <input required type="text" v-model="teacher.last_name" minlength="3" name="sobreNome" placeholder="Digite seu sobrenome">
          </div>  
          <div class="form-group">
            <div class="form-text">IDADE</div>
            <input required type="number" v-model="teacher.age" name="idade" min="18" max="100" placeholder="Qual a sua idade?">
          </div>
          <div class="form-group">
            <div class="form-text">CPF</div>
            <input required type="text" v-model="teacher.cpf" minlength="3" name="cpf" placeholder="Digite seu CPF">
          </div>
          <div class="form-group">
            <div class="form-text">TELEFONE</div>
            <input required type="text" v-model="teacher.phone" minlength="3" name="telefone" placeholder="Digite seu telefone">
          </div>
          <div class="form-group">
            <div class="form-text">EMAIL</div>
            <input required type="email" v-model="teacher.email" name="email" placeholder="Digite seu email">
          </div>
          <div class="form-group">
            <div class="form-text">LOGIN</div>
            <input required type="login" v-model="teacher.login" name="login" placeholder="Crie um login para a sua conta">
          </div>
          <div class="form-group">
            <div class="form-text">SENHA</div>
            <div class="password-input-wrapper">
              <input required type="password" v-if="hidePassword" v-model="teacher.password" minlength="5" name="senha" placeholder="Crie uma senha">
              <input required type="text" v-else v-model="teacher.password" minlength="5" name="senha" placeholder="Crie uma senha">
              <i class="fa fa-eye toggle-password" aria-hidden="true" v-if="hidePassword" @click="hidePassword = !hidePassword"></i>
              <i class="fa fa-eye-slash toggle-password" aria-hidden="true" v-else @click="hidePassword = !hidePassword"></i>
            </div>
          </div>
          <button type="submit" class="btn btn-green"> CADASTRAR </button>
          <cucSnackbar :open="open"></cucSnackbar>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import loginTopnav from '../common/login.topnav'
  import Auth from '../../services/auth.service'
  import common from '../../services/common.service'
  import cucSnackbar from '../common/cuc.snackbar'
  import Swal from '../../services/Swal.service'

  const swal = new Swal()

  export default {
    name: 'teacher-signup',
    data () {
      return {
        teacher: {
          first_name: '',
          last_name: '',
          age: '',
          cpf: '',
          phone: '',
          email: '',
          login: '',
          password: ''
        },
        snackBar: {
          vertical: 'top',
          horizontal: 'right',
          duration: 5000
        },
        hidePassword: true,
        open: new Vue(),
        swalTimeout: 3000
      }
    },
    components: {
      loginTopnav,
      cucSnackbar
    },
    methods: {
      onSubmit () {
        let signupPromise = Auth.signup(this, this.teacher, 'teacher')
        let loginPromise = Auth.login(this, {login: this.teacher.login, password: this.teacher.password})

        swal.loading('Estamos cadastrando a sua conta para coordenar as aventuras dos seus alunos...', this.swalTimeout)

        signupPromise
          .then(response => loginPromise)
          .then(user => {
            // After signup, login freshly registered user
            setTimeout(() => {
              this.$store.commit('LOAD_TEACHER_DATA', user)
              this.$router.push({name: 'home-professor'})
              swal.simpleSuccess('Sucesso!', 'Vamos começar criando uma turma de alunos?')
            }, this.swalTimeout)
          })
          .catch(err => {
            console.error(err.response)
            swal.close()
            if (common.isEmpty(err.response)) this.openSnackBar('O sistema está fora do ar. Tente novamente mais tarde!')
            else if (err.response.data === 'duplicate_email') this.openSnackBar('Esse e-mail já foi cadastrado, escolha outro.')
            else if (err.response.data === 'duplicate_login') this.openSnackBar('O login escolhido já está em uso, escolha outro.')
            else if (err.response.data === 'invalid_login_password') this.$router.push({name: 'login'})
            else this.openSnackBar('Não foi possível cadastrar uma conta no momento. Tente novamente mais tarde!')
          })
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

  #teacher-signup
    height: 100%;
    position: relative;
    margin: 1.2rem
  
  .container
    margin: auto;
    background-color: white;
  
  form
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