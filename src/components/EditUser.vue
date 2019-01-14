<template>
<b-container class="bv-example-row">
    <Header></Header>
    <b-row>
      <b-col cols="12" class="hr"></b-col>
    </b-row>
    <b-row>
        <b-col cols="3">
          <b-list-group>
            <Menu></Menu>
          </b-list-group>
        </b-col>
        <b-col cols="9">
          <b-row>
            <b-col cols="12">
              <b-row>
                <b-col cols="12" class="head">
                  <h4>:: Usuarios</h4>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="breadcrumb">
                  <b-link href="/users-list">Lista de usuarios</b-link> &raquo; {{user.first_name}} {{user.last_name}}:
                </b-col>
              </b-row>
              <div class="mt-2"></div>
              <b-form @submit="onSubmit" class="mb-4">
                <b-form-group id="f_first_name"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Nombres">
                  <b-form-input id="first_name" :state="state" v-model.trim="user.first_name"></b-form-input>
                </b-form-group>
                <b-form-group id="f_last_name"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Apellidos">
                  <b-form-input id="last_name" :state="state" v-model.trim="user.last_name"></b-form-input>
                </b-form-group>
                <b-form-group id="f_email"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Correo electrónico">
                  <b-form-input id="email" :state="state" v-model.trim="user.email"></b-form-input>
                </b-form-group>
                <b-form-group id="f_role"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Tipo">
                  <b-form-input id="role" :state="state" v-model.trim="user.role"></b-form-input>
                </b-form-group>
                <b-form-group id="f_brand"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Marca">
                  <b-form-input id="brand" :state="state" v-model.trim="user.brand"></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary derco">Actualizar</b-button>
              </b-form>
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
  name: 'EditUser',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      user: {}
    }
  },
  created () {
    document.title = 'Administración Derco - Editar Usuario'
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get(`/api/users/` + this.$route.params.id)
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.put(`/api/users/` + this.$route.params.id, this.user)
      .then(response => {
        this.$router.push({
          name: 'ShowUser',
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