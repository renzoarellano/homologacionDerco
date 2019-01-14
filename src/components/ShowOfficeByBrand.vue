<template>
<b-container class="bv-example-row">
    <b-navbar toggleable="md" type="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/">
        <img src="../assets/Derco.gif" width="60" alt="">
        <span>Administración de Pedidos</span></b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Buscar"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
          </b-nav-form>
          <b-nav-item-dropdown right class="ml-2">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Admin</em>
            </template>
            <b-dropdown-item href="">Perfil</b-dropdown-item>
            <b-dropdown-item @click="logout()">Cerrar sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-row>
      <b-col cols="12" class="hr"></b-col>
    </b-row>
    <b-row>
        <b-col cols="3">
          <b-list-group>
            <b-list-group-item active><a href="/clients-by-brands">Clientes por marcas</a></b-list-group-item>
            <b-list-group-item><a href="/clients-by-offices">Clientes por oficinas</a></b-list-group-item>
            <b-list-group-item><a href="/brands">Marcas</a></b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col cols="9">
          <b-row class="border">
            <b-col cols="12">
              <b-row>
                <b-col cols="12">
                  <b-row>
                    <b-col cols="12" class="head">
                      <h4>:: Oficinas</h4>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="breadcrumb">
                      <b-link href="#/clients-by-brands">Clientes por marcas</b-link> &raquo; <b-link :href="'#/clients-by-brands/'+ this.$route.params.brand">Lista de oficinas de {{ this.$route.params.brand }}</b-link> &raquo; {{office.fullname}}:
                    </b-col>
                  </b-row>
                  <div class="mt-2"></div>
                  <div class="pb-2 cliente-detalle mb-4">
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                        <label>Nombre:</label> <strong>{{office.name}}</strong><br>
                        <label>Dirección:</label> <strong>{{office.address}}</strong><br>
                        <label>Teléfono:</label> <strong>{{office.phone}}</strong><br>
                        <label>Departamento:</label> <strong>{{office.department}}</strong><br>
                        <label>Estado:</label> <strong>{{office.status}}</strong><br>
                        <label>Términos:</label> <strong>{{office.terms}}</strong><br>
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
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
/*eslint-disable */
import Vue from "vue"
import axios from 'axios'
import VuejsDialog from "vuejs-dialog"

import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VuejsDialog)
export default {
  name: 'ShowOfficeByBrand',
  data () {
    return {
      office: []
    }
  },
  created () {
    axios.get(`/office/` + this.$route.params.id)
    .then(response => {
      this.office = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    editoffice (officeid) {
      this.$router.push({
        name: 'EditOffice',
        params: { id: officeid }
      })
    },
    deleteoffice (officeid) {
      this.$dialog.confirm('¿Realmente desea eliminar este registro?')
      .then(function (dialog) {
        axios.delete('/office/' + officeid)
          .then((result) => {
            this.$router.push({
              name: 'BrandListOffices'
            })
          })
          .catch(e => {
            this.errors.push(e)
          })
      })
      .catch(function () {
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