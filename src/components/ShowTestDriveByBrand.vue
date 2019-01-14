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
          <b-row class="border">
            <b-col cols="12">
              <b-row>
                <b-col cols="12">
                  <b-row>
                    <b-col cols="12" class="head">
                      <h4>:: Test Drive</h4>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="breadcrumb">
                      <b-link :to="{ name: 'TestDrives' }">Test Drive</b-link> &raquo; <b-link :href="'/testdrives/admin/'+ this.$route.params.brand">Lista de participantes {{ this.$route.params.brand }}</b-link> &raquo; {{testdrive.fullname}}:
                    </b-col>
                  </b-row>
                  <div class="mt-2"></div>
                  <div class="pb-2 cliente-detalle mb-4">
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                        <label>Nombre:</label> <strong>{{testdrive.fullname}}</strong><br>
                        <label>DNI:</label> <strong>{{testdrive.dni}}</strong><br>
                        <label>Teléfono:</label> <strong>{{testdrive.phone}}</strong><br>
                        <label>Email:</label> <strong>{{testdrive.email}}</strong><br>
                        <label>Tienda:</label> <strong>{{testdrive.store}}</strong><br>
                        <label>Marca:</label> <strong>{{testdrive.brand}}</strong><br>
                        <label>Modelo de auto:</label> <strong>{{testdrive.model}}</strong><br>
                        <label>Términos:</label> <strong>{{testdrive.terms}}</strong><br>
                      <label>Creado en:</label> <strong>{{testdrive.created_at}}</strong><br>
                      </b-col>
                    </b-row>
                    <hr class="my-4">
                    <b-btn variant="success" @click.stop="edittestdrive(testdrive._id, testdrive.brand)">Editar</b-btn>
                    <b-btn variant="danger" @click.stop="deletetestdrive(testdrive._id)">Eliminar</b-btn>
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
  name: 'ShowTestDriveByBrand',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      testdrive: []
    }
  },
  created () {
    axios.get(`/testdrive/`+ this.$route.params.brand + '/' + this.$route.params.id)
    .then(response => {
      this.testdrive = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    edittestdrive (testdriveid, testdrivebrand) {
      this.$router.push({
        name: 'EditTestDrive',
        params: { id: testdriveid, brand: testdrivebrand }
      })
    },
    deletetestdrive (testdriveid) {

      this.$dialog.confirm('¿Realmente desea eliminar este registro?')
      .then(function (dialog) {
        
        axios.delete('/testdrive/' + testdriveid)
          .then((result) => {
            this.$router.push({
              name: 'TestDrives'
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