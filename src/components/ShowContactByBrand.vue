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
                <b-col cols="12">
                  <b-row>
                    <b-col cols="12" class="head">
                      <h4>:: Contacto</h4>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="breadcrumb">
                      <b-link :to="{ name: 'Contacts' }">Contacto</b-link> &raquo; <b-link :href="'/contacts/admin/'+ this.$route.params.brand">Lista de contactos {{ this.$route.params.brand }}</b-link> &raquo; {{contact.fullname}}:
                    </b-col>
                  </b-row>
                  <div class="mt-2"></div>
                  <div class="pb-2 cliente-detalle mb-4">
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                        <label>Asunto:</label> <strong>{{contact.subject}}</strong><br>
                        <label>Nombre:</label> <strong>{{contact.fullname}}</strong><br>
                        <label>Teléfono:</label> <strong>{{contact.phone}}</strong><br>
                        <label>Email:</label> <strong>{{contact.email}}</strong><br>
                        <label>Tienda:</label> <strong>{{contact.store}}</strong><br>
                        <label>Marca:</label> <strong>{{contact.brand}}</strong><br>
                        <label>Mensaje:</label> <strong>{{contact.message}}</strong><br>
                        <label>Términos:</label> <strong>{{contact.terms}}</strong><br>
                      <label>Creado en:</label> <strong>{{contact.created_at}}</strong><br>
                      </b-col>
                    </b-row>
                    <hr class="my-4">
                    <b-btn variant="success" @click.stop="editcontact(contact._id, contact.brand)">Editar</b-btn>
                    <b-btn variant="danger" @click.stop="deletecontact(contact._id)">Eliminar</b-btn>
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
  name: 'ShowContactByBrand',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      contact: []
    }
  },
  created () {
    axios.get(`/contact/`+ this.$route.params.brand + '/' + this.$route.params.id)
    .then(response => {
      this.contact = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    editcontact (contactid, contactbrand) {
      this.$router.push({
        name: 'EditContact',
        params: { id: contactid, brand: contactbrand }
      })
    },
    deletecontact (contactid) {

      this.$dialog.confirm('¿Realmente desea eliminar este registro?')
      .then(function (dialog) {
        
        axios.delete('/contact/' + contactid)
          .then((result) => {
            this.$router.push({
              name: 'Contacts'
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