<template>
<b-container class="bv-example-row">
    <Header></Header>
    <b-row>
      <b-col cols="12" class="hr"></b-col>
    </b-row>
    <b-row>
        <b-col cols="3">
          <Menu></Menu>
        </b-col>
        <b-col cols="9" class="border">
          <b-row>
            <b-col cols="12">
              <b-row>
                <b-col cols="12">
                  <b-row>
                    <b-col cols="12" class="head">
                      <h4>:: Oficinas</h4>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="breadcrumb">
                      <b-link :to="{ name: 'SupervisorOffices' }">Oficinas</b-link>&raquo; Editar:
                    </b-col>
                  </b-row>
                  <div class="mt-2"></div>
                  <b-form @submit="onSubmit" class="pb-4">
                    <b-form-group id="f_name"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Nombre">
                      <b-form-input id="name" :state="state" v-model.trim="office.name"></b-form-input>
                    </b-form-group>
                    <b-form-group id="f_address"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Dirección">
                      <b-form-input id="address" :state="state" v-model.trim="office.address"></b-form-input>
                    </b-form-group>
                    <b-form-group id="f_phone"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Teléfono">
                      <b-form-input id="phone" :state="state" v-model.trim="office.phone"></b-form-input>
                    </b-form-group>
                    <b-form-group id="f_department"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Departamento">
                      <b-form-input id="department" :state="state" v-model.trim="office.department"></b-form-input>
                    </b-form-group>
                    <b-form-group id="f_status"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Estado">
                      <b-form-input id="status" :state="state" v-model.trim="office.status"></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="primary derco">Actualizar</b-button>
                  </b-form>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
/*eslint-disable */
import axios from 'axios'
import Header from './Header'
import Menu from './Menu'
export default {
  name: 'SupervisorEditOffice',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      office: {}
    }
  },
  created () {
    if(localStorage.getItem('role')=="Supervisor"){
      document.title = 'Administración Derco - Editar Marca'
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.get(`/office/` + this.$route.params.id)
      .then(response => {
        this.office = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }else{
      this.$router.push({
        name: 'Login'
      })
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.put(`/office/` + this.$route.params.id, this.office)
      .then(response => {
        this.$router.push({
          name: 'SupervisorShowOffice',
          params: { id: this.$route.params.id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>
<style>
.form-row legend{
  text-align: left;
}
</style>
