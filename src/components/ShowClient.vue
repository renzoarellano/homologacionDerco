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
                  <b-link href="/clients-by-brands">Clientes por marcas</b-link> &raquo; <b-link :href="'/clients-by-brands/'+ this.$route.params.brand">Lista de clientes {{ this.$route.params.brand }}</b-link> &raquo; {{client.fullname}}:
                </b-col>
              </b-row>
              <div class="mt-2"></div>
              <div class="pb-2 cliente-detalle mb-4">
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                        <label>Nombre:</label> <strong>{{client.fullname}}</strong><br>
                        <label>DNI:</label> <strong>{{client.dni}}</strong><br>
                        <label>Teléfono:</label> <strong>{{client.phone}}</strong><br>
                        <label>Email:</label> <strong>{{client.email}}</strong><br>
                        <label>Tienda:</label> <strong>{{client.store}}</strong><br>
                        <label>Marca:</label> <strong>{{client.brand}}</strong><br>
                        <label>Modelo del auto:</label> <strong>{{client.model_car}}</strong><br>
                        <label>Código del auto:</label> <strong>{{client.code}}</strong><br>
                        <label>Términos:</label> <strong>{{client.terms}}</strong><br>
                      <label>Creado en:</label> <strong>{{client.created_at}}</strong><br>
                      </b-col>
                    </b-row>
                <hr class="my-4">
                <b-btn variant="success" @click.stop="editclient(client._id)">Editar</b-btn>
                <b-btn variant="danger" @click.stop="deleteclient(client._id)">Eliminar</b-btn>
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
    axios.get(`/client/user/` + this.$route.params.id)
    .then(response => {
      this.client = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    editclient (clientid) {
      this.$router.push({
        name: 'EditClient',
        params: { id: clientid }
      })
    },
    deleteclient (clientid) {
      axios.delete('/client/' + clientid)
      .then((result) => {
        this.$router.push({
          name: 'ClientList'
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
  .jumbotron {
    padding: 2rem;
  }
</style>