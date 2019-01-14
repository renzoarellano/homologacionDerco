<template>
  <b-container class="bv-example-row">
    <b-navbar toggleable="md" type="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <!-- <img src="../assets/Derco.gif" width="60" alt=""> -->
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
            <b-dropdown-item href="#/logout">Cerrar sesión</b-dropdown-item>
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
            <b-list-group-item><a href="/clients-by-brands">Clientes por marcas</a></b-list-group-item>
            <b-list-group-item><a href="/clients-by-offices">Clientes por oficinas</a></b-list-group-item>
            <b-list-group-item active><a href="/">Marcas</a></b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col cols="9">
          <b-row>
            <b-col cols="12">
              <h2>
                Add Client
                <b-link href="/">(Client List)</b-link>
              </h2>
              <b-form @submit="onSubmit">
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="First Name">
                  <b-form-input id="firstName" :state="state" v-model.trim="client.firstName"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Last Name">
                  <b-form-input id="lastName" :state="state" v-model.trim="client.lastName"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="DNI">
                  <b-form-input id="dni" :state="state" v-model.trim="client.dni"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Phone">
                    <b-form-input id="phone" :state="state" v-model.trim="client.phone"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Email">
                  <b-form-input id="email" :state="state" v-model.trim="client.email"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="store">
                  <b-form-input id="publisher" :state="state" v-model.trim="client.store"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Brand">
                  <b-form-input id="brand" :state="state" v-model.trim="client.brand"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="Model Car">
                  <b-form-input id="model_car" :state="state" v-model.trim="client.model_car"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                          horizontal
                          :label-cols="4"
                          breakpoint="md"
                          label="code">
                  <b-form-input id="code" :state="state" v-model.trim="client.code"></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Save</b-button>
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

export default {
  name: "CreateClient",
  data() {
    return {
      client: {}
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios
        .post(`/client/add`, this.client)
        .then(response => {
          this.$router.push({
            name: "ShowClient",
            params: { id: response.data._id }
          })
        })
        .catch(e => {
          this.errors.push(e);
        })
    }
  }
};
</script>