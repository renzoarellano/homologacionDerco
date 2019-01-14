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
                  <h4>:: Oficinas</h4>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="breadcrumb">
                  <b-link :to="{ name: 'BrandListOffices' }">Oficinas</b-link> &raquo; Lista de Oficinas de {{ office.brand }}
                </b-col>
              </b-row>
              <div class="mt-2"></div>
              <div class="pb-2 cliente-detalle mb-4">
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                        <label>Nombre:</label> <strong>{{office.name}}</strong><br>
                        <label>DNI:</label> <strong>{{office.address}}</strong><br>
                        <label>Teléfono:</label> <strong>{{office.phone}}</strong><br>
                        <label>Departamento:</label> <strong>{{office.department}}</strong><br>
                        <label>Marca:</label> <strong>{{office.brand}}</strong><br>
                        <label>Slug:</label> <strong>{{office.slug}}</strong><br>
                        <div v-if="office.status==1">
                          <label>Estado:</label> <strong>Activo</strong><br>
                        </div>
                        <div v-else>
                          <label>Estado:</label> <strong>Inactivo</strong><br>
                        </div>
                      <label>Creado en:</label> <strong>{{office.created_at}}</strong><br>
                      </b-col>
                    </b-row>
                <hr class="my-4">
                <b-btn variant="success" @click.stop="editoffice(office._id)">Editar</b-btn>
                <b-btn variant="danger" @click.stop="deleteoffice(office._id)">Eliminar</b-btn>
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
  name: 'SupervisorShowOffice',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      office: []
    }
  },
  created () {
    if(localStorage.getItem('role')=="Supervisor"){
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.get(`/office/` + this.$route.params.id)
      .then(response => {
        this.office = response.data
        document.title = "Administración Derco - Oficina " + response.data.name
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
    editoffice (officeid) {
      this.$router.push({
        name: 'SupervisorEditOffice',
        params: { id: officeid }
      })
    },
    deleteoffice (officeid) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.delete('/office/' + officeid)
      .then((result) => {
        this.$router.push({
          name: 'OfficeListByBrand',
          params: { brand: this.office.brand }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
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