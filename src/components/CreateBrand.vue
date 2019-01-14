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
                  <h4>:: Marcas</h4>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="breadcrumb">
                  <b-link href="/brands">Listado de marcas</b-link>
                </b-col>
              </b-row>
              <div class="mt-2"></div>
              <b-form @submit="onSubmit">
                <b-form-group id="fieldsetHorizontal" horizontal :label-cols="2" breakpoint="md" label="Nombre">
                  <b-form-input id="name" :state="state" v-model.trim="brand.name"></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="danger derco" class="mb-3">Guardar</b-button>
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
export default {
  name: "CreateBrand",
  components:{
    Header,
    Menu
  },
  data() {
    return {
      brand: {}
    }
  },
  created(){
    document.title = 'Administración Derco - Agregar Marca'
    if(localStorage.getItem('jwtToken')==null){
      this.$router.push({
        name: 'Login'
      })
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios
        .post(`/brand`, this.brand)
        .then(response => {
          this.$router.push({
            name: "ShowBrand",
            params: { id: response.data._id }
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