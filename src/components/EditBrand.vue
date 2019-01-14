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
                <b-col cols="12">
                  <b-row>
                    <b-col cols="12" class="head">
                      <h4>:: Marcas</h4>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="breadcrumb">
                      <b-link :to="{ name:'BrandList' }">Marcas</b-link> &raquo; <b-link :href="'/brands/brand/'+ this.$route.params.id">{{ this.brand.name }}</b-link> &raquo; Editar:
                    </b-col>
                  </b-row>
                  <div class="mt-2"></div>
                  <b-form @submit="onSubmit" class="pb-4">
                    <b-form-group id="fieldsetHorizontal"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Nombre">
                      <b-form-input id="name" :state="state" v-model.trim="brand.name"></b-form-input>
                    </b-form-group>
                    <b-form-group id="fieldsetHorizontal"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Slug">
                      <b-form-input id="slug" :state="state" v-model.trim="brand.slug"></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="primary derco">Actualizar</b-button>
                  </b-form>
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
import axios from 'axios'
import Header from './Header'
import Menu from './Menu'
export default {
  name: 'EditBrand',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      brand: {}
    }
  },
  created () {
    document.title = 'Administración Derco - Editar Marca'
    axios.get(`/brand/` + this.$route.params.id)
    .then(response => {
      this.brand = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`/brand/` + this.$route.params.id, this.brand)
      .then(response => {
        this.$router.push({
          name: 'ShowBrand',
          params: { id: this.$route.params.id }
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
.form-row legend{
  text-align: left;
}
</style>
