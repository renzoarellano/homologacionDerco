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
              <div class="pb-2 cliente-detalle mb-4">
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                        <label>Nombres:</label> <strong>{{client.first_name}} {{ client.last_name }}</strong><br>
                        <label>Tipo de doc.:</label> <strong>{{client.tipo_documento}}</strong><br>
                        <label>Número de doc.:</label> <strong>{{client.rut_w2l}}</strong><br>
                        <label>Teléfono:</label> <strong>{{client.fone1_w2l}}</strong><br>
                        <div v-show="client.tipo_documento=='RUC'"><label>Razón Social:</label> <strong>{{client.razon_social}}</strong><br></div>
                        <label>Email:</label> <strong>{{client.email}}</strong><br>
                        <label>Tienda:</label> <strong>{{client.local_w2l}}</strong><br>
                        <label>Dirección:</label> <strong>{{client.direccion}}</strong><br>
                        <label>Distrito:</label> <strong>{{client.distrito}}</strong><br>
                        <label>Marca:</label> <strong>{{client.brand_w2l}}</strong><br>
                        <label>Modelo del auto:</label> <strong>{{client.model_w2l}}</strong><br>
                      <label>Creado en:</label> <strong>{{ client.created_at }}</strong><br>
                      </b-col>
                    </b-row>
                <hr class="my-4">
                <b-btn variant="success" @click.stop="editclient(client.id)">Editar</b-btn>
                <b-btn variant="danger" @click.stop="deleteclient(client.id)">Eliminar</b-btn>
              </div>
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
  name: 'ShowClient',
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
      if(localStorage.getItem('role')=="Supervisor"){
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
    editclient (clientid) {
      this.$router.push({
        name: 'SupervisorEditClient',
        params: { id: clientid }
      })
    },
    deleteclient (clientid) {
        if(localStorage.getItem('role')=="Supervisor"){
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
            axios.delete('/client/' + clientid)
                .then((result) => {
                    this.$router.push({
                    name: 'SupervisorIndex'
                    })
                })
                .catch(e => {
                    this.errors.push(e)
                })
            } else {
                this.$router.push({
                name: 'Login'
            })
        }
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>