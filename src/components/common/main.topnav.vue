<template>
  <div>
    <div class="topnav">
      <div class="controls">
        <div class="item menu" @click="options = !options">
          <i class="fa fa-bars fa-2x" v-show='!options' aria-hidden="true"></i>
          <i class="fa fa fa-times fa-2x" v-show='options' aria-hidden="true"></i>
        </div>
        <div class="item logo">
          <img src="../../assets/img/logo.png" height='48' width='196' alt="logo" />
        </div>
      </div>
      
      <div class="controls">
        <!--<a class="item plus" href="#/escrever" >
          <i class="fa fa-plus fa-2x" aria-hidden="true"></i>
          <label>Escrever</label>
        </a>-->
        <!--<a class="item" href="#" >
          <i class="fa fa-bell-o fa-2x" aria-hidden="true"></i>
          <label>Notificações</label>
        </a>-->
        <a @click="logout" class="item">
          <i class="fa fa-power-off fa-2x" aria-hidden="true"></i>
          <label>Sair</label>
        </a>
      </div>
  	</div>

    <div class="nav-options" v-show='options'>
      <ul>
          <li><router-link :to="{name: 'home-student'}" @click="options = !options" >Página Inicial</router-link></li>
          <!--<li><a href="#" @click="options = !options" >Portal</a></li>-->
          <li><router-link :to="{name: 'books'}" @click="options = !options" >Estante de Livros</router-link></li>
          <!--<li><a href="#" @click="options = !options" >Estatísticas</a></li>-->
          <li><router-link :to="{name: 'edit-student-profile'}" @click="options = !options" >Perfil</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Auth from '../../services/auth.service'

  export default {
    name: 'topnav',
    data () {
      return {
        options: ''
      }
    },
    props: ['toggleNav'],
    methods: {
      logout () {
        Auth.logout()
        this.$router.push({name: 'login'})
      }
    },
    mounted () {
      this.options = this.toggleNav
    }
  }
</script>

<style lang="sass">
  @import './../../assets/bases.sass'

  .topnav
    @extend .bg-top-nav
    height: 80px
    display: flex
    justify-content: space-between
    align-items: center
    color: #fff
    box-shadow: $shadow_1

  .controls
    display: flex
    margin: 0 5rem 0 1rem

  .item
    display: flex
    justify-content: center
    flex-direction: column
    align-items: center
    width: 100px
    height: 80px
    padding: 0 .5rem 0 .5rem
    cursor: pointer
    transition: all .3s ease
    color: #fff

  .item:hover
    color: $blue_base

  .item label
    font-family: $title_font
    font-size: 1rem
    font-weight: bold
    margin-top: 10px
    cursor: pointer

  .menu
    width: auto
    border-left: none
    margin-right: 1rem

  .logo
    width: auto
    padding: 0 2rem 0 2rem
    cursor: auto

  .plus
    color: $green

  .plus:hover
    color: $green-dark

  .nav-options
    @extend .bg-top-nav
    box-shadow: $shadow_1
    display: flex
    justify-content: center
    align-items: center

  .nav-options ul
    display: flex
    margin: 1rem

  .nav-options li
    padding: .5rem

  .nav-options a
    font-family: $title_font
    font-size: 1.5rem
    margin: 1rem
    font-weight: bold
    color: #fff
    transition: all .3s ease

  .nav-options a:hover
    color: $blue_dark
</style>
