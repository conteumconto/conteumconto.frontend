<template>
  <md-snackbar :md-position="snackBar.vertical + ' ' + snackBar.horizontal" ref="snackbar" :md-duration="snackBar.duration">
    <span>{{situationText}}</span>
    <md-button class="white" @click.native="$refs.snackbar.close()">OK</md-button>
  </md-snackbar>
</template>

<script>
  export default {
    name: 'cuc-snackbar',
    data () {
      return {
        snackBar: {
          vertical: 'top',
          horizontal: 'right',
          duration: 10000
        },
        situationText: ''
      }
    },
    props: ['open'],
    created () {
      this.open.$on('openCucSnackbar', args => {
        this.situationText = args.text
        this.$refs.snackbar.open()
      })
    }
  }
</script>
