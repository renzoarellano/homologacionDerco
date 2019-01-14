<template>
    <b-navbar toggleable="md" type="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{ name: 'BrandListClient' }">
        <img src="../assets/Derco.gif" width="60" alt="">
        <span>Administración de Pedidos</span></b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Buscar"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
          </b-nav-form> -->
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
</template>
<script>
/*eslint-disable */
export default {
  name: 'Header',
  methods: {
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
