<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col cols="6">
        <h2>Ingreso a la Administración</h2>
        <div v-if="errors && errors.length">
          <div v-for="(error, index) of errors" :key="index">
            <b-alert show>{{error.message}}</b-alert>
          </div>
        </div>
        <b-form @submit="onSubmit">
          <b-form-group id="f_email"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Correo electrónico">
            <b-form-input id="email" :state="state" v-model.trim="login.email"></b-form-input>
          </b-form-group>
          <b-form-group id="f_password"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Contraseña">
            <b-form-input type="password" id="password" :state="state" v-model.trim="login.password"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Entrar</b-button>
          <!-- <b-button type="button" variant="success" @click.stop="register()">Register</b-button> -->
        </b-form>
      </b-col>
    </b-row>
 </b-container>
</template>

<script>
/*eslint-disable */
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      login: {},
      errors: []
    }
  },
  created(){
    document.title = 'Administración Derco - Administración - Ingreso'
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`/api/auth/login/`, this.login)
      .then(response => {
        localStorage.setItem('jwtToken', response.data.token)
        localStorage.setItem('role', response.data.role)
        localStorage.setItem('brand', response.data.brand)
        
        if(response.data.role && response.data.brand){
            if(localStorage.getItem('role')=="Administrador"){
              this.$router.push({
                name: 'BrandListClient'
              })
            }else{
              this.$router.push({
                name: 'SupervisorIndex',
                params: { page: 1 }
              })
            }
        }
      })
      .catch(e => {
        //console.log(e)
        this.errors.push(e)
      })
    },
    register () {
      this.$router.push({
        name: 'Register'
      })
    }
  }
}
</script>
