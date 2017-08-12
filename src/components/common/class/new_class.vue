<script>
import Auth from '../../../auth/index'
import globalConfig from '../../../services/GlobalConfigs'

const API_URL = globalConfig.getApiURL()

export default {
  name: 'new_class',
  data () {
    return {
      classgroup: {
        name: '',
        year: '',
        capacity: '',
        course: '',
        theme: '',
        school: '',
        status: true,
        startDate: '',
        endDate: '',
        comments: '',
        students: [],
        books: []
      }
    }
  },
  computed: {
    teacher_data: function () {
      return this.$store.getters.dataTeacher
    }
  },
  methods: {
    save: function () {
      let classgroup = this.classgroup
      classgroup.teacher = this.teacher_data._id

      this.$http.post(API_URL + '/classgroup/', classgroup,
        {headers: Auth.getAuthHeader()}
      ).then(response => {
        if (response !== null) {
          console.log(response)
          this.$store.commit('LOAD_ClassGroup', response.body)
          this.$store.commit('HAVE_ClassGroup')
          this.$emit('close')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  openSnackBar (text) {
    this.situationText = text
    this.$refs.snackbar.open()
  }
}
</script>
<template>
<transition name="modal">
  <div class="modal-mask">

    <div class="modal-wrapper">
      <div class='header-modal'>
        <h1 class="title-large dark">Cadastrar Turma {{classgroup.id}}</h1>
        <i class="fa fa-close fa-3x" aria-hidden="true"  @click="$emit('close')" ></i>
      </div>

      <div class="body-modal">
        <div class="modal-item">
          <form @submit="save" onsubmit="return false">
            <div class="form-row">
              <div class="form-group">
                <h2 class="form-text">Nome da Turma *</h2>
                <input class="input-text" required type="text" v-model="classgroup.name" minlength="2" placeholder="Crie um nome para esta turma">
              </div>
              <div class="form-group">
                <h2 class="form-text">Ano *</h2>
                <input class="input-text" required type="number" v-model="classgroup.year" placeholder="Entre com o ano escolar">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <h2 class="form-text">Escola *</h2>
                <input class="input-text" required type="text" v-model="classgroup.school" placeholder="Entre com a escola desta turma">
              </div>
              <div class="form-group">
                <h2 class="form-text">Disciplina *</h2>
                <input class="input-text" required type="text" v-model="classgroup.course" placeholder="Entre com a disciplina desta turma">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <h2 class="form-text">Temática *</h2>
                <input class="input-text" required type="text" v-model="classgroup.theme" placeholder="Entre com a temática criada para esta turma">
              </div>
              <div class="form-group">
                <h2 class="form-text">Quantidade *</h2>
                <input class="input-text" required type="number" min="2" max="50" v-model="classgroup.capacity" placeholder="Entre com a quantidade máxima de alunos que esta turma deve ter">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <h2 class="form-text">Início</h2>
                <input class="input-text" type="text" v-model="classgroup.startDate" placeholder="Entre com data de início do projeto">
              </div>
              <div class="form-group">
                <h2 class="form-text">Fim</h2>
                <input class="input-text" type="text" v-model="classgroup.endDate" placeholder="Entre com a data de fim esperada do projeto">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <h2 class="form-text">Observações</h2>
                <textarea class="input-text" rows="2" v-model="classgroup.comments" placeholder="Anote seus comentários"></textarea>
              </div>
              <button type="submit" class="btn btn-green btn-submit">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<style scoped lang="sass">
@import './../../../assets/bases.sass'

.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, .5)
  display: flex
  justify-content: center
  align-items: center
  transition: opacity .3s ease

.modal-wrapper
  background: #fff
  width: 75%
  height: 650px

.header-modal
  display: flex
  justify-content: space-between
  align-items: center
  background: #ecf0f1

.header-modal i 
  color: #bfd3da
  margin: -1rem 2rem 0 0 
  padding: 0
  cursor: pointer

.modal-item
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1rem 2.5rem;

form 
  width: 90%;
  margin: auto;

.form-row 
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  width: 100%;
  height: 100px; 

.form-group
  flex: 1 1 auto;

  textarea
    width: 80%;

  input
    border: 0px;
    border-radius: 0px;
    border-bottom: 1px solid $gray_dark;
    transition: border-bottom 0.5s


  input:focus
    border-bottom: 1px solid $green;
  
.form-text
  font-size: 14px
  font-weight: bold
  font-family: $title_font
  text-transform: uppercase
  color: $blue_dark
  margin: .5rem 0

.input-text
  font-size: 14px
  text-transform: none
  color: #333
  padding: .7rem .5rem 
  font-size: 1rem
  border: 1px solid $gray
  border-radius: 5px/5px
  font-family: $title_alter_font
  width: 100%

.modal-enter
  opacity: 0

.modal-leave-active
  opacity: 0

.modal-enter .modal-container,
.modal-leave-active .modal-container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)

</style>