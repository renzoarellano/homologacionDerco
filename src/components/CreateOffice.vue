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
                  <b-link :to="{ name: 'BrandListOffices' }">Clientes por oficinas</b-link> &raquo; <b-link :href="'/clients-by-offices/brand/'+this.$route.params.slug">Lista de Oficinas de {{ this.office.brand }}</b-link>
                </b-col>
              </b-row>
              <div class="mt-2"></div>
              <b-form @submit="onSubmit">
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Nombre">
                  <b-form-input id="name" :state="state" v-model.trim="office.name"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Dirección">
                  <b-form-input id="address" :state="state" v-model.trim="office.address"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Teléfono">
                  <b-form-input id="phone" :state="state" v-model.trim="office.phone"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Department">
                    <b-form-input id="department" :state="state" v-model.trim="office.department"></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary derco">Guardar</b-button>
              </b-form>
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
String.prototype.strip = function() {
  var translate_re = /[öäüÖÄÜßËë ]/g;
  var translate = {
    "ä":"a", "ö":"o", "ü":"u", "Ë":"e", "Ë":"e",
    "Ä":"A", "Ö":"O", "Ü":"U",
    " ":"-", "ß":"ss"  
  };
    return (this.replace(translate_re, function(match){
        return translate[match];})
    );
};
export default {
  name: "CreateOffice",
  components:{
    Header,
    Menu
  },
  data() {
    return {
      office: {
        brand: null,
        slug: null,
        status: 1
      },
      brand: {}
    }
  },
  created(){
    if(localStorage.getItem('role')=="Administrador"){
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.get(`/brand/slug/` + this.$route.params.slug)
      .then(response => {
        this.brand = response.data
        document.title = "Administración Derco - Brand " + response.data[0].name
        this.office.brand = response.data[0].name
        this.office.slug = response.data[0].slug
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
    onSubmit(evt) {
      evt.preventDefault();
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios
        .post(`/office`, this.office)
        .then(response => {
          this.$router.push({
            name: "ShowOffice",
            params: { id: response.data._id, slug: this.$route.params.slug }
          })
        })
        .catch(e => {
          this.errors.push(e);
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