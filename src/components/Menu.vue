<template>
    <b-list-group>
        <b-list-group-item><router-link :to="{ name: 'BrandListClient' }">Clientes por marcas</router-link></b-list-group-item>
        <b-list-group-item><router-link :to="{ name: 'BrandListOffices' }">Oficinas por marca</router-link></b-list-group-item>
        <b-list-group-item><router-link :to="{ name: 'BrandList' }">Marcas</router-link></b-list-group-item>
        <b-list-group-item><router-link :to="{ name: 'Contacts' }">Contacto</router-link></b-list-group-item>
        <b-list-group-item><router-link :to="{ name: 'TestDrives' }">Test Drive</router-link></b-list-group-item>
        <b-list-group-item><router-link :to="{ name: 'Register' }">Registro de Usuarios</router-link></b-list-group-item>
        <b-list-group-item><router-link :to="{ name: 'UsersList' }">Lista de Usuarios</router-link></b-list-group-item>
    </b-list-group>
</template>
<script>
/*eslint-disable */
export default {
    name: 'Menu'
}
</script>
<style>

</style>
