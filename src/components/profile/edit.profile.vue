<template>
  <div>
    <topnav></topnav>
    <div id="editProfile">
      <div class="container">
        <form @submit="onSubmit" onsubmit="return false">
          <div class="form-group">
            <div style="margin-top: 4em" class="form-text">NOME</div>
            <input required type="text" v-model="student.first_name" minlength="2" name="nome" placeholder="Digite seu nome">
          </div>
          <div class="form-group">
            <div class="form-text">SOBRENOME</div>
            <input required type="text" v-model="student.last_name" minlength="2" name="sobreNome" placeholder="Digite seu sobrenome">
          </div>
          <div class="form-group">
            <div class="form-text">IDADE</div>
            <input required type="number" v-model="student.age" name="idade" min="1" max="100" placeholder="Qual a sua idade?">
          </div>
          <div class="form-group">
            <div class="form-text">EMAIL</div>
            <input required type="email" v-model="student.email" name="email" placeholder="Digite seu email">
          </div>
          <div class="form-group">
            <div class="form-text">LOGIN</div>
            <input required type="login" v-model="student.login" name="login" placeholder="Crie um login para a sua conta">
          </div>
          <button type="button" @click="deleteProfile" class="btn btn-red-inverse">Deletar Conta</button>
          <button type="submit" class="btn btn-green confirm-btn"> SALVAR </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import topnav from '../common/main.topnav'
  import CucHttpService from '../../services/Cuc.Http.service'
  import Auth from '../../services/auth.service'
  import common from '../../services/common.service'
  import Swal from '../../services/Swal.service'

  const swal = new Swal()
  let cucHttp = new CucHttpService('conteumconto', null)
  
  export default {
    name: 'editProfile',
    components: {
      topnav
    },
    data () {
      return {
        login: this.$store.getters.dataStudent.login,
        student: this.$store.getters.dataStudent,
        hidePassword: true,
        swalTimeout: 2000
      }
    },
    methods: {
      redirectDelete () {
        Auth.logout()
        this.$router.push({name: 'login'})
      },
      onSubmit () {
        swal.simpleConfirmation(
          'Você tem certeza?',
          'Tem certeza que quer alterar as informações do seu perfil?',
          'Sim, tenho certeza',
          'Cancelar')
        .then(response => {
          if (!common.isEmpty(response.value)) {
            if (response.value === true) {
              swal.loading('Estamos salvando suas novas informações...', this.swalTimeout)
              cucHttp.setAuthHeaders(localStorage.getItem('token'))
              return cucHttp.editStudentProfile(this.student, {login: this.login})
            }
          } else return response
        })
        .then(response => {
          if (common.isEmpty(response.dismiss)) {
            setTimeout(() => {
              this.$store.commit('LOAD_STUDENT_DATA', this.student)
              swal.simpleSuccess('Alterado!', 'Sua conta foi alterada com sucesso!')
            }, this.swalTimeout)
          }
        })
        .catch(err => {
          console.error(err.response)
          let errMsg = null
          if (common.isEmpty(err.response)) errMsg = 'O sistema está fora do ar. Tente novamente mais tarde!'
          else if (err.response.data === 'duplicate_email') {
            errMsg = 'Esse e-mail já foi cadastrado, escolha outro.'
            this.student = this.$store.getters.dataStudent
          } else if (err.response.data === 'duplicate_login') {
            errMsg = 'O login escolhido já está em uso, escolha outro.'
            this.student = this.$store.getters.dataStudent
          } else errMsg = 'Não foi possível atualizar os seus dados. Tente novamente mais tarde!'
          swal.simpleError('Erro!', errMsg)
        })
      },
      deleteProfile () {
        swal.simpleConfirmation(
          'Você tem certeza?',
          'Você não poderá recuperar sua conta e seus livros após a confirmação!',
          'Sim, tenho certeza',
          'Cancelar')
        .then(response => {
          if (!common.isEmpty(response.value)) {
            if (response.value === true) {
              swal.loading('Estamos removendo a sua conta... :(', this.swalTimeout)
              cucHttp.setAuthHeaders(localStorage.getItem('token'))
              return cucHttp.deleteStudentProfile({login: this.login})
            }
          } else return response
        })
        .then(response => {
          if (common.isEmpty(response.dismiss)) {
            setTimeout(() => {
              swal.successWithRedirect('Removido!', 'Sua conta foi removida. Quem sabe um outro dia veremos as suas histórias?', this.redirectDelete)
            }, this.swalTimeout)
          }
        })
        .catch(err => {
          console.error(err.response)
          let errMsg = null
          if (common.isEmpty(err.response)) errMsg = 'O sistema está fora do ar. Tente novamente mais tarde!'
          else errMsg = 'Não foi possível remover a sua conta. Tente novamente mais tarde!'
          swal.simpleError('Erro!', errMsg)
        })
      }
    }
  }
</script>

<style scoped lang="sass">
  @import './../../assets/bases.sass'

  $gray-1: #bbd;
  $formWidth: 420px;

  #editProfile
    height: 100%;
    background-color: $gray-background;
    position: relative;

  .container
    margin: 3rem auto;
    width: 550px;
    //height: 630px;
    border-radius: 15px;
    border: 1px solid white;
    background-color: white;

  form
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: auto;
    text-align: center;

  .form-text
    margin: auto;
    //width: $formWidth;
    text-align: left;
    font-family: $title_alter_font!important;
    font-weight: 500;

  input
    margin: auto;
    width: $formWidth;
    height: 40px;
    border-radius: 8px;
    border: 1px solid $gray-1;
    font-family: $title_alter_font!important;
    font-weight: 300;
    text-indent: 0.7em;

  .btn
    margin: 1rem 0 2rem 0;
    
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
