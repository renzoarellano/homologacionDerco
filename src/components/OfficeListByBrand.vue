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
                  <h4>:: Oficinas</h4>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="breadcrumb">
                  <b-link :to="{ name: 'BrandListOffices' }">Clientes por oficinas</b-link> &raquo; Lista de Oficinas de {{ this.$route.params.slug.toUpperCase() }}:
                  <b-link :to="{ name: 'CreateOffice' }" class="text-right" style="float: right;">Agregar Oficina para {{ this.$route.params.slug.toUpperCase() }}</b-link>
                </b-col>
              </b-row>
              <div class="mt-2"></div>
              <b-table striped hover :items="offices" :fields="fields">
                <template slot="actions" slot-scope="row">
                  <b-btn size="sm" @click.stop="details(row.item)">Ver detalle</b-btn>
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
import axios from "axios";
import Header from './Header'
import Menu from './Menu'
export default {
  name: "OfficeListByBrands",
  components:{
    Header,
    Menu
  },
  data() {
    return {
      fields: {
        name: { label: "Nombre", sortable: true, class: "text-left" },
        brand: { label: "Marca", sortable: false, class: "text-center" },
        address: { label: "Dirección", sortable: false, class: "text-center" },
        department: { label: "Departamento", sortable: true, class: "text-center" },
        created_at: {
          label: "Fecha de Ingreso",
          sortable: true,
          class: "text-center"
        },
        actions: { label: "", class: "text-center" }
      },
      offices: []
    };
  },
  created() {
    if(localStorage.getItem('role')=="Administrador"){
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios
      .get(`/offices-brands/` + this.$route.params.slug)
      .then(response => {
        this.offices = response.data;
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
    details (office) {
      this.$router.push({
        name: 'ShowOffice',
        params: { id: office._id, slug: this.$route.params.slug, brand: office.brand }
      })
    },
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    }
  }
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
</style>