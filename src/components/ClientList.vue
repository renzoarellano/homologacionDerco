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
          <b-row>
            <b-col cols="12">
              <h2>Client List
                <b-link href="/add-client">Add Client</b-link>
                <b-link @click="logout()">(Logout)</b-link>
              </h2>
              <b-table striped hover :items="clients" :fields="fields">
                <template slot="actions" slot-scope="row">
                  <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
                </template>
              </b-table>
              <ul v-if="errors && errors.length">
                <li v-for="(error, index) in errors" :key="index">
                  <b-alert show>{{error.message}}</b-alert>
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
/*eslint-disable */
import axios from 'axios'

export default {
  name: 'ClientList',
  data () {
    return {
      fields: {
        fullname: { label: 'Full Name', sortable: true, 'class': 'text-center' },
        actions: { label: '', 'class': 'text-center' }
      },
      clients: [],
      errors: []
    }
  },
  created () {
    document.title = 'Administración Derco'
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get(`/client`)
    .then(response => {
      this.clients = response.data
    })
    .catch(e => {
      this.errors.push(e)
      if(e.response.status === 401) {
        this.$router.push({
          name: 'Login'
        })
      }
    })
  },
  methods: {
    details (client) {
      this.$router.push({
        name: 'ShowClient',
        params: { id: client._id }
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
@media (min-width: 768px) {
  .sidebar-nav .navbar .navbar-collapse {
    padding: 0;
    max-height: none;
  }
  .sidebar-nav .navbar ul {
    float: none;
    display: block;
  }
  .sidebar-nav .navbar li {
    float: none;
    display: block;
  }
  .sidebar-nav .navbar li a {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .navbar-brand span{
    display: inline-block;
    margin: 0 0 0 20px;
  }
  .list-group-item a{
    display: block;
    text-align: left;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
    color: #e41b17;
  }
  .list-group-item a:hover{
    text-decoration: none;
  }
  .hr{
    height: 40px;
  }
  .derco{
    background-color: #e41b17;
    border-radius: 5px;
  }
}
.list-group-item a:hover{
  color: #666;
}
.list-group-item.active a{
  color: #FFF;
}
.list-group-item.active a:hover{
  color: #CCC;
}
.list-group-item.active{
  border: solid 1px #e41b17!important;
  background-color: #e41b17!important;
}
</style>
