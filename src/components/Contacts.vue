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
                <b-col cols="12" class="head">
                  <h4>:: Mensajes de contacto por marcas</h4>
                </b-col>
              </b-row>
              <!-- <b-row>
                <b-col cols="12" class="breadcrumb">
                  <b-link href="/clients-by-brands">Listado de marcas</b-link>
                </b-col>
              </b-row> -->
              <div class="mt-2"></div>
              <b-table striped hover :items="brands" :fields="fields">
                <template slot="actions" slot-scope="row">
                  <b-btn size="sm" @click.stop="details(row.item)">Ver mensajes</b-btn>
                </template>
              </b-table>
              <ul v-if="errors && errors.length">
                <li v-for="(error, index) in errors" :key="index">
                  <b-alert show>{{error.message}}</b-alert>
                </li>
              </ul>
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
  components:{
    Header,
    Menu
  },
  name: 'Contacts',
  data () {
    return {
      fields: {
        name: { label: 'Marca', sortable: true, 'class': 'text-center' },
        actions: { label: '', 'class': 'text-center' }
      },
      brands: [],
      errors: []
    }
  },
  created () {
    if(localStorage.getItem('role')=="Administrador"){
      document.title = 'Administración Derco'
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.get(`/brand`)
      .then(response => {
        this.brands = response.data
      })
      .catch(e => {
        this.errors.push(e)
        if(e.response.status === 401) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
    }else{
      this.$router.push({
        name: 'Login'
      })
    }
  },
  methods: {
    details (brand) {
      this.$router.push({
        name: 'ContactListByBrands',
        params: { brand: brand.name, slug: brand.slug }
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
</style>
