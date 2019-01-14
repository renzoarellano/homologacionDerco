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
          <b-row>
            <b-col cols="12">
              <b-row>
                <b-col cols="12" class="head">
                  <h4>:: Contactos</h4>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="breadcrumb">
                  <b-link href="/contacts">Contacto</b-link> &raquo; <b-link :href="'/contacts/'+ this.$route.params.brand">Lista de mensajes para {{ this.$route.params.brand }}</b-link> &raquo; {{client.fullname}}:
                </b-col>
              </b-row>
              <div class="mt-2"></div>
              <b-form @submit="onSubmit" class="mb-4">
                  <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Asunto">
                  <b-form-input id="subject" :state="state" v-model.trim="client.subject"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Nombre">
                  <b-form-input id="fullname" :state="state" v-model.trim="client.fullname"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Teléfono">
                <b-form-input id="phone" :state="state" v-model.trim="client.phone"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Correo electrónico">
                  <b-form-input id="email" :state="state" v-model.trim="client.email"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Tienda">
                  <b-form-input id="store" :state="state" v-model.trim="client.store"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Marca">
                  <b-form-input id="brand" :state="state" v-model.trim="client.brand"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Message">
                  <b-form-input id="message" :state="state" v-model.trim="client.message"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="terms">
                  <b-form-input id="terms" :state="state" v-model.trim="client.terms"></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary derco">Actualizar</b-button>
              </b-form>
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
  name: 'EditContact',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      client: {}
    }
  },
  created () {
    document.title = 'Administración Derco - Editar Contacto'
    axios.get(`/contact/` + this.$route.params.brand + '/' + this.$route.params.id)
    .then(response => {
      this.client = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`/contact/` + this.$route.params.id, this.client)
      .then(response => {
        this.$router.push({
          name: 'ShowContactByBrand',
          params: { id: this.$route.params.id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>