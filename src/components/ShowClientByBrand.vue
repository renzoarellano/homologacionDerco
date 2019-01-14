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
        <b-col cols="9">
          <b-row class="border">
            <b-col cols="12">
              <b-row>
                <b-col cols="12">
                  <b-row>
                    <b-col cols="12" class="head">
                      <h4>:: Clientes</h4>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="breadcrumb">
                      <b-link :to="{ name:'BrandListClient' }">Clientes por marcas</b-link> &raquo; <b-link :to="{ name:'ClientListByBrands' }">Lista de clientes {{ this.$route.params.brand }}</b-link> &raquo; {{client.first_name}} {{ client.last_name }}:
                    </b-col>
                  </b-row>
                  <div class="mt-2"></div>
                  <div class="pb-2 cliente-detalle mb-4">
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                        <label>Nombre:</label> <strong>{{client.first_name}}</strong><br>
                        <label>Apellidos:</label> <strong>{{client.last_name}}</strong><br>
                        <label>DNI:</label> <strong>{{client.rut_w2l}}</strong><br>
                        <label>Teléfono:</label> <strong>{{client.fone1_w2l}}</strong><br>
                        <label>Email:</label> <strong>{{client.email}}</strong><br>
                        <label>Local:</label> <strong>{{client.local_w2l}}</strong><br>
                        <label>Estado:</label> <strong>{{client.state}}</strong><br>
                        <label>Local:</label> <strong>{{client.local_w2l}}</strong><br>
                        <label>Url 1:</label> <strong>{{client.url1_w2l}}</strong><br>
                        <label>Url 2:</label> <strong>{{client.url2_w2l}}</strong><br>
                        <label>Marca:</label> <strong>{{client.brand_w2l}}</strong><br>
                        <label>Modelo del auto:</label> <strong>{{client.model_w2l}}</strong><br>
                        <label>Código SAP:</label> <strong>{{client.sap_w2l}}</strong><br>
                        <label>Tienda:</label> <strong>{{client.store}}</strong><br>
                        <label>Código de Origen:</label> <strong>{{client.cod_origen2_w2l}}</strong><br>
                        <label>Precio:</label> <strong>{{client.price_w2l}}</strong><br>
                        <label>Términos:</label> <strong>{{client.terms}}</strong><br>
                      <label>Creado en:</label> <strong>{{client.created_at}}</strong><br>
                      </b-col>
                    </b-row>
                    <hr class="my-4">
                    <b-btn variant="success" @click.stop="editclient(client.id, client.brand_w2l)">Editar</b-btn>
                    <b-btn variant="danger" @click.stop="deleteclient(client.id)">Eliminar</b-btn>
                  </div>
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
import Vue from "vue"
import axios from 'axios'
import VuejsDialog from "vuejs-dialog"
import Header from './Header'
import Menu from './Menu'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VuejsDialog)
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
    editclient (clientid, clientbrand) {
      this.$router.push({
        name: 'EditClient',
        params: { id: clientid, brand: clientbrand }
      })
    },
    deleteclient (clientid) {

      this.$dialog.confirm('¿Realmente desea eliminar este registro?')
      .then(function (dialog) {
        
        axios.delete('/client/' + clientid)
          .then((result) => {
            this.$router.push({
              name: 'ClientList'
            })
          })
          .catch(e => {
            this.errors.push(e)
          })
        
        //console.log('Clicked on proceed')
      })
      .catch(function () {
        //console.log('Clicked on cancel')
      });

      
    },
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>