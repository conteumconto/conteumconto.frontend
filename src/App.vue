<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  import topnav from './components/common/main.topnav'

  export default {
    name: 'app',
    components: {
      topnav
    }
  }
</script>

<style lang="sass">
  @import './assets/bases.sass';

  #app
    background-color: $gray-background;
    height: 100%;

  .modal-enter
    opacity: 0

  .modal-leave-active
    opacity: 0

  .modal-enter .modal-container,
  .modal-leave-active .modal-container
    -webkit-transform: scale(1.1)
    transform: scale(1.1)
</style>
