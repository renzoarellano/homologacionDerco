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
          <b-row class="border">
            <b-col cols="12">
              <b-row>
                <b-col cols="12" class="head">
                  <h4>:: Clientes por marcas</h4>
                </b-col>
              </b-row>
              <div class="mt-2"></div>
              <b-row class="justify-content-md-center">
                <b-col cols="10">
                  <h2>Registro de Usuarios</h2>
                  <!-- <div v-if="errors && errors.length">
                    <div v-for="(error, index) of errors" :key="index">
                      <b-alert show>{{error.message}}</b-alert>
                    </div>
                  </div> -->
                  <b-form @submit.prevent="onSubmit" id="register">
                    <b-form-group id="field_first_name"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Nombres">
                      <div class="form-group" :class="{'has-error': errors.has('first_name') }">
                        <b-form-input id="first_name" :state="state" v-model.trim="register.first_name" v-validate="'required'" name="first_name"></b-form-input>
                        <span v-show="errors.has('first_name')" class="help is-danger">El campo nombres es requerido</span>
                      </div>
                    </b-form-group>
                    <b-form-group id="field_last_name"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Apellidos">
                      <div class="form-group" :class="{'has-error': errors.has('last_name') }">
                        <b-form-input id="last_name" :state="state" v-model.trim="register.last_name" v-validate="'required'" name="last_name"></b-form-input>
                        <span v-show="errors.has('last_name')" class="help is-danger">El campo apellidos es requerido</span>
                      </div>
                    </b-form-group>
                    <b-form-group id="fieldsetHorizontal1"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Correo electrónico">
                      <div class="form-group" :class="{'has-error': errors.has('email') }">
                        <b-form-input id="email" :state="state" v-model.trim="register.email" v-validate="'required|email'" name="email"></b-form-input>
                        <span v-show="errors.has('email')" class="help is-danger">El campo correo electrónico es requerido</span>
                      </div>
                    </b-form-group>
                    <b-form-group id="fieldsetHorizontal2a"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Escribir contraseña">
                      <div class="form-group" :class="{'has-error': errors.has('password') }">
                        <b-form-input v-model="register.password" v-validate="'required|confirmed:confirm_password'" name="password" type="password"></b-form-input>
                        <span v-show="errors.has('password')" class="help is-danger">El campo contraseña es requerido</span>
                      </div>
                    </b-form-group>
                    <b-form-group id="fieldsetHorizontal2b"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Repetir contraseña">
                      <div class="form-group" :class="{'has-error': errors.has('confirm_password') }">
                        <b-form-input v-model="register.confirm_password" name="confirm_password" class="form-control" v-validate="'required|confirmed:password'" type="password"></b-form-input>
                        <span v-show="errors.has('password')" class="help is-danger">Debe confirmar la contraseña correctamente</span>
                      </div>
                    </b-form-group>
                    <b-form-group id="fieldsetHorizontal3"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Seleccionar tipo">
                      <div class="form-group" :class="{'has-error': errors.has('role') }" >
                        <b-form-select :state="state" v-model.trim="register.role" v-validate="'required'" :options="options" name="role" class="mb-3" />
                        <span v-show="errors.has('role')" class="help is-danger">Seleccione el tipo de usuario</span>
                      </div>
                    </b-form-group>
                    <b-form-group id="fieldsetHorizontal4"
                              horizontal
                              :label-cols="4"
                              breakpoint="md"
                              label="Seleccionar Marca">
                      <div class="form-group" :class="{'has-error': errors.has('brand') }" >
                        <b-form-select id="brand" :state="state" v-model.trim="register.brand" v-validate="'required'" name="brand" :options="brands"></b-form-select>
                        <span v-show="errors.has('brand')" class="help is-danger">Seleccione una marca</span>
                      </div>
                    </b-form-group>
                    <b-button type="submit" variant="danger">Enviar</b-button>
                    <b-button type="button" variant="success" @click="$router.go(-1)">Cancelar</b-button>
                  </b-form>
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
import axios from 'axios'
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Header from './Header'
import Menu from './Menu'
Vue.use(VeeValidate);

export default {
  name: 'Register',
  components:{
    Header,
    Menu
  },
  data () {
    return {
      register: {
        role: null,
        brand: null,
        password: '',
        confirm_password: '',
      },
      brands: [
        { value: null, text: 'Seleccione una opción' },
      ],
      selected: null,
      options: [
        { value: null, text: 'Seleccione una opción' },
        { value: 'Administrador', text: 'Administrador' },
        { value: 'Supervisor', text: 'Supervisor' },
      ]
    }
  },
  created(){
    if(localStorage.getItem('role')=="Administrador"){
      document.title = 'Administración Derco - Administración - Registro',
      axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwtToken")
      axios
        .get(`/brand`)
        .then(response => {
          for(var i=0; i<response.data.length; i++){
            var item = { value: response.data[i].name, text: response.data[i].name }
            this.brands.push(item)
          }
        })
        .catch(e => {
          this.errors.push(e);
          if (e.response.status === 401) {
            this.$router.push({
              name: "Login"
            })
          }
        });
    }else{
      this.$router.push({
        name: 'Login'
      })
    }
  },
  methods: {
    onSubmit () {  
      this.$validator.validateAll().then(() => {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwtToken")
        axios.post(`/api/auth/register/`, this.register)
        .then(response => {
          var rpta = response.data.success;
          if(rpta){
            this.$router.push({
              name: 'UsersList'
            })
          } else {}
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
      }).catch(() => {
        //alert(this.errors.all())
      })

    },
    
  }
}
</script>
<style>
.is-danger{
  color: red;
  font-family: 'Quicksand-Regular';
  font-size: 12px;
}
.has-error{
  text-align: left;
}
h2{
  font-family: 'Quicksand-Bold';
  font-size: 26px;
  margin: 0 0 30px 0!important;
}
</style>
