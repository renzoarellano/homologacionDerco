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
                <b-col cols="12" class="head">
                  <h4>:: Test Drive</h4>
                </b-col>
              </b-row>
              <div class="mt-2"></div>
              <b-table striped hover :items="clients" :fields="fields">
                <template slot="actions" slot-scope="row">
                  <b-btn size="sm" @click.stop="details(row.item)">Ver participantes</b-btn>
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
  name: 'SupervisorTestDrives',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      fields: {
        fullname: { label: 'Nombre', sortable: true, 'class': 'text-center' },
        store: { label: 'Tienda', sortable: true, 'class': 'text-center' },
        email: { label: 'Correo electrónico', sortable: true, 'class': 'text-center' },
        actions: { label: '', 'class': 'text-center' }
      },
      clients: [],
      errors: [],
      brand: localStorage.getItem('brand')
    }
  },
  created () {
    if(localStorage.getItem('role')=="Supervisor"){
      document.title = 'Administración Derco'
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios
      .get(`/testdrive/` + this.brand)
      .then(response => {
        this.clients = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      })
    }else{
        this.$router.push({
          name: 'Login'
        })
    }
  },
  methods: {
    details (clients) {
      this.$router.push({
        name: 'SupervisorShowTestDrive',
        params: { id: clients.id, slug: this.$route.params.slug }
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
