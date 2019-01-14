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
                <h4>:: Clientes</h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" class="breadcrumb">
                <b-link href="/clients-by-brands">Clientes por marcas</b-link> &raquo; <b-link :href="'/clients-by-brands/'+ this.$route.params.brand">Lista de clientes {{ this.$route.params.brand }}</b-link> &raquo; {{client.fullname}}:
              </b-col>
            </b-row>
            <div class="mt-2"></div>
            <b-form @submit="onSubmit" class="mb-4">
              <b-form-group id="f_first_name"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Nombre">
                <b-form-input id="first_name" :state="state" v-model.trim="client.first_name"></b-form-input>
              </b-form-group>
              <b-form-group id="f_last_name"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Apellidos">
                <b-form-input id="last_name" :state="state" v-model.trim="client.last_name"></b-form-input>
              </b-form-group>
              <b-form-group id="f_dni"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="DNI">
              <b-form-input id="dni" :state="state" v-model.trim="client.rut_w2l"></b-form-input>
              </b-form-group>
              <b-form-group id="f_phone"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Teléfono">
                <b-form-input id="phone" :state="state" v-model.trim="client.fone1_w2l"></b-form-input>
              </b-form-group>
              <b-form-group id="f_email"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Correo electrónico">
                <b-form-input id="email" :state="state" v-model.trim="client.email"></b-form-input>
              </b-form-group>
              <!-- <b-form-group id="f_state"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Estado">
                <b-form-input id="state" :state="state" v-model.trim="client.state"></b-form-input>
              </b-form-group> -->
              <b-form-group id="f_local"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Local">
                <b-form-input id="local_w2l" :state="state" v-model.trim="client.local_w2l"></b-form-input>
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
  name: 'EditClient',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      client: []
    }
  },
  created () {
    document.title = 'Administración Derco - Editar Cliente'
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get(`/client/user/` + this.$route.params.id)
    .then(response => {
      this.client = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.put(`/client/` + this.$route.params.id, this.client)
      .then(response => {
        this.$router.push({
          name: 'ShowClientByBrand',
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