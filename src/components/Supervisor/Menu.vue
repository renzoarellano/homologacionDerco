<template>
    <b-list-group>
        <b-list-group-item><router-link :to="{ name: 'SupervisorIndex' }">Cotizador</router-link></b-list-group-item>
        <b-list-group-item><router-link :to="{ name: 'SupervisorOffices' }">Tiendas</router-link></b-list-group-item>
        <!-- <b-list-group-item><router-link :to="{ name: 'SupervisorContacts' }">Contacto</router-link></b-list-group-item>
        <b-list-group-item><router-link :to="{ name: 'SupervisorTestDrives' }">Test Drive</router-link></b-list-group-item> -->
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
