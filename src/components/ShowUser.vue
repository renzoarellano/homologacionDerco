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
                    <h4>:: Usuarios</h4>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" class="breadcrumb">
                    <b-link :to="{ name: 'UsersList' }">Usuarios</b-link>
                  </b-col>
                </b-row>
                <div class="mt-2"></div>
                <div class="pb-2 cliente-detalle mb-4">
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                      Nombre: <strong>{{user.first_name}} {{user.last_name}}</strong><br>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12" class="text-left pr-4 pl-4">
                      Correo electrónico: <strong>{{user.email}}</strong><br>
                      </b-col>
                    </b-row>
                    <hr class="my-4">
                    <b-btn variant="success" @click.stop="edituser(user._id)">Editar</b-btn>
                    <b-btn variant="danger" @click.stop="deleteuser(user._id)">Eliminar</b-btn>
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
  name: 'ShowUser',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      user: []
    }
  },
  created () {
    document.title = 'Administración Derco - Detalle de usuario'
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get(`/api/users/` + this.$route.params.id)
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    edituser (userid) {
      this.$router.push({
        name: 'EditUser',
        params: { id: userid }
      })
    },
    deleteuser (userid) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.delete('/api/users/' + userid)
      .then((result) => {
        this.$router.push({
          name: 'UsersList'
        })
      })
      .catch(e => {
        this.errors.push(e)
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