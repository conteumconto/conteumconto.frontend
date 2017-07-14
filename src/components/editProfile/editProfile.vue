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
        <button type="button" @click="deleteProfile" class="btn btn-red-inverse">Deletar Conta</button>
        <button type="submit" class="btn btn-green confirm-btn"> SALVAR </button>
        <md-snackbar :md-position="snackBar.vertical + ' ' + snackBar.horizontal" ref="snackbar" :md-duration="snackBar.duration">
          <span>{{situationText}}</span>
          <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">OK</md-button>
        </md-snackbar>
      </form>
    </div>
  </div>
</div>
</template>

<script>
  import topnav from '../common/topnav.vue'
  import globalConfig from '../../services/GlobalConfigs'
  import Auth from '../../auth/index'

  const API_URL = globalConfig.getApiURL()
  
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
        snackBar: {
          vertical: 'top',
          horizontal: 'right',
          duration: 10000
        },
        situationText: ''
      }
    },
    methods: {
      openSnackBar (text) {
        this.situationText = text
        this.$refs.snackbar.open()
      },
      onSubmit () {
        let self = this
        this.$swal({
          title: 'Você tem certeza?',
          text: 'Tem certeza que quer alterar as informações do seu perfil?',
          type: 'warning',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sim, tenho certeza',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then(() => {
          self.$http.put(API_URL + `/student/${self.login}/`, self.student, {
            headers: Auth.getAuthHeader()
          }).then(({body}) => {
            // Changes the localStorage to the new token
            if (body.token !== undefined) {
              localStorage.setItem('token', body.token)
            }
            self.$store.commit('LOAD_STUDENT_DATA', self.student)
            self.$swal({
              title: 'Alterado!',
              text: 'Sua conta foi alterada com sucesso!',
              type: 'success'
            })
          }).catch((err) => {
            if (err.body.error === 'Duplicate login') {
              self.openSnackBar('Este login já está em uso!')
              self.student = self.$store.getters.dataStudent
            }
            if (err.body.error === 'Duplicate email') {
              self.openSnackBar('Este email já está em uso!')
            }
          })
        })
      },
      deleteProfile () {
        let self = this
        this.$swal({
          title: 'Você tem certeza?',
          text: 'Você não poderá recuperar sua conta após a confirmação!',
          type: 'warning',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sim, tenho certeza',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then(function () {
          self.$http.delete(API_URL + `/student/${self.student.login}`, {
            headers: Auth.getAuthHeader()
          }).then(
            response => {
              self.$swal({
                title: 'Removido!',
                text: 'Sua conta foi removida com sucesso!',
                type: 'success',
                onClose: location.href = '#/entrar'
              })
            },
            error => {
              console.log(error)
            }
         )
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
