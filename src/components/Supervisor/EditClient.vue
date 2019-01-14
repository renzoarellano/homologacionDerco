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
                <b-link :to="{ name: 'SupervisorIndex' }">Clientes</b-link> &raquo; {{ client.first_name }} {{  client.last_name }}
              </b-col>
            </b-row>
            <div class="mt-2"></div>
            <b-form @submit="onSubmit" class="mb-4">
              <b-form-group id="f_first_name"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Nombres">
                <b-form-input id="first_name" :state="state" v-model.trim="client.first_name"></b-form-input>
              </b-form-group>
              <b-form-group id="f_last_name"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Apellidos">
                <b-form-input id="last_name" :state="state" v-model.trim="client.last_name"></b-form-input>
              </b-form-group>
              <b-form-group id="f_document"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Tipo de doc.">
                <b-form-input id="tipo_documento" :state="state" v-model.trim="client.tipo_documento"></b-form-input>
              </b-form-group>
              <b-form-group id="f_rut"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="DNI">
                <b-form-input id="rut_w2l" :state="state" v-model.trim="client.rut_w2l"></b-form-input>
              </b-form-group>
              <b-form-group id="f_company"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Razón Social" v-show="client.tipo_documento=='RUC'">
                <b-form-input id="razon_social" :state="state" v-model.trim="client.razon_social"></b-form-input>
              </b-form-group>
              <b-form-group id="f_phone"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Teléfono">
              <b-form-input id="fone1_w2l" :state="state" v-model.trim="client.fone1_w2l"></b-form-input>
              </b-form-group>
              <b-form-group id="f_email"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Email">
                <b-form-input id="email" :state="state" v-model.trim="client.email"></b-form-input>
              </b-form-group>
              <b-form-group id="f_local"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Tienda">
                <b-form-input id="local_w2l" :state="state" v-model.trim="client.local_w2l"></b-form-input>
              </b-form-group>
              <b-form-group id="f_brand"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Marca">
                <b-form-input id="brand_w2l" :state="state" v-model.trim="client.brand_w2l"></b-form-input>
              </b-form-group>
              <b-form-group id="f_model"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Modelo">
                <b-form-input id="model_w2l" :state="state" v-model.trim="client.model_w2l"></b-form-input>
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
      client: {}
    }
  },
  created () {
    if(localStorage.getItem('role')=="Supervisor"){
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
        document.title = 'Administración Derco - Editar Cliente'
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
        axios.get(`/client/user/` + this.$route.params.id)
        .then(response => {
        this.client = response.data
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
      axios.put(`/client/` + this.$route.params.id, this.client)
      .then(response => {
        this.$router.push({
          name: 'SupervisorShowClient',
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