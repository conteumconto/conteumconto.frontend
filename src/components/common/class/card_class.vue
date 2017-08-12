<script>
// import globalConfig from '../../../services/GlobalConfigs'
// import Auth from '../../../auth/index'

// const API_URL = globalConfig.getApiURL()

export default {
  name: 'card_class',
  data () {
    return {
      newClassGroupComponent: false,
      edit: false
    }
  },
  props: ['classGroup']
}
</script>
<template>
  <div class="classgroup-wrapper">
    <div class="classgroup-content">
      <div class="classgroup-share">
        <div class="classgroup-code content">
          #{{this.classGroup.code}}
        </div>
        <div class="share-icons">
          <i class="fa fa-share-alt fa-3x" aria-hidden="true"></i>
          <i class="fa fa-clipboard fa-3x" aria-hidden="true"></i>
        </div>
      </div>
      <div class="classgroup-info">
        <div class="classgroup-up">
          <div class="classgroup-title"><i class="fa fa-adress-card" aria-hidden="true"></i> {{this.classGroup.name}} </div>
          <div class="classgroup-title"><i class="fa fa-home" aria-hidden="true"></i> {{this.classGroup.school}} </div>
          <div class="classgroup-title"><i class="fa fa-hashtag" aria-hidden="true"></i> {{this.classGroup.theme}} </div>
        </div>
      </div>
      <div class="classgroup-members">
          <div>
            <i class="fa fa-users fa-3x" aria-hidden="true">
              <span class="classgroup-code content">{{this.classGroup.capacity}}</span>
            </i>
          </div>
          <div class="classgroup-title more-details"><i class="fa fa-caret-right fa-3x" aria-hidden="true"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
@import './../../../assets/bases.sass'

.classgroup-wrapper
  display: flex
  width: 900px
  height: 200px
  padding: 1rem
  margin: auto
  flex-direction: column
  background: #fff
  margin: 1rem auto 1rem
  border-radius: 30px
  box-shadow: $shadow-1
  
.classgroup-content
  flex: 1 1 auto
  display: flex

.classgroup-share
  display: flex
  flex-direction: column
  justify-content: space-around
  width: 180px;
  padding: 1rem 1rem 1rem 0.2rem;
  border-right: 2px solid $gray-dark

.classgroup-code
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;

.share-icons
  display: flex
  justify-content: space-around

.classgroup-members
  display: flex
  flex-direction: column
  justify-content: space-around
  width: 100px;
  padding: 0rem 1rem 0rem 2rem;
  border-left: 2px solid $gray-dark

.more-details
  display: flex;
  justify-content: center;

.new
  background: $green
  flex: 1 1 auto
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  font-family: $title_alter_font
  font-weight: bold
  text-transform: uppercase
  color: #fff
  font-size: 1.2em
  padding: 2rem

.classgroup-info
  flex: 2 1
  display: flex
  
.classgroup-up
  flex: 1 1
  display: flex
  padding: 0 3rem
  flex-direction: column
  justify-content: space-around

.classgroup-title
  color: #444
  font-family: $title_alter_font
  font-weight: bold
  font-size: 1.7em

.classgroup-controls
  display: flex
  justify-content: space-around

.btn-noBg
  flex: 1
  padding: 1.5em
  font:
    family: $title_alter_font
    size: 1em
    weight: bold
  text-transform: uppercase
  cursor: pointer

.btn-noBg.disable
  color: #B4B2B2

.btn-noBg.warning
  color: $orange_base
  transition: all .3s ease
.btn-noBg.warning:hover
  color: $orange_dark

.btn-noBg.danger
  color: $red
  transition: all .3s ease
.btn-noBg.danger:hover
  color: $red_dark
  
</style>