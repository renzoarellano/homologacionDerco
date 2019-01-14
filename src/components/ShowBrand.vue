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
                    <b-link href="/brands">Marcas</b-link> &raquo; {{brand.name}}
                  </b-col>
                </b-row>
                <div class="mt-2"></div>
                <div class="pb-2 cliente-detalle mb-4">
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                      Marca: {{brand.name}}<br>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                      Slug: {{brand.slug}}<br>
                      </b-col>
                    </b-row>
                    <hr class="my-4">
                    <b-btn variant="success" @click.stop="editbrand(brand._id)">Editar</b-btn>
                    <b-btn variant="danger" @click.stop="deletebrand(brand._id)">Eliminar</b-btn>
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
  name: 'ShowBrand',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      brand: []
    }
  },
  created () {
    document.title = 'Administración Derco - Detalle de la marca'
    axios.get(`/brand/` + this.$route.params.id)
    .then(response => {
      this.brand = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    editbrand (brandid) {
      this.$router.push({
        name: 'EditBrand',
        params: { id: brandid }
      })
    },
    deletebrand (brandid) {
      axios.delete('/brand/' + brandid)
      .then((result) => {
        this.$router.push({
          name: 'BrandList'
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