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
          <b-row class="border">
            <b-col cols="12">
              <b-row>
                <b-col cols="12" class="head">
                  <b-row>
                    <b-col cols="12">
                      <h4>:: Clientes</h4>
                    </b-col>
                  </b-row>
                  <b-row class="mt-2 border-top border-bottom">
                    <b-col cols="6" class="pt-3"></b-col>
                    <b-col cols="6" class="pt-3 text-right">
                      <div>
                        <div class="datepicker-trigger">
                          <b-form-group id="f_name"
                              horizontal
                              :label-cols="2"
                              breakpoint="md"
                              label="Fecha:">
                            <b-form-input id="datepicker-trigger" :state="state" v-model.trim="dates.date" :value="formatDates(dateOne, dateTwo)" placeholder="Seleccione fecha"></b-form-input>
                          </b-form-group>
                          <AirbnbStyleDatepicker
                            :trigger-element-id="'datepicker-trigger'"
                            :mode="'range'"
                            :fullscreen-mobile="true"
                            :date-one="dateOne"
                            :date-two="dateTwo"
                            @date-one-selected="val => { dateOne = val }"
                            @date-two-selected="val => { dateTwo = val }"
                            @apply = "apply"
                          />
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="breadcrumb">
                  <b-link :to="{ name: 'SupervisorIndex' }">Clientes</b-link> &raquo; Lista de clientes de {{ this.brand }}:<b-btn @click.stop="descargar_csv" class="float-right">Descargar Lista</b-btn>
                </b-col>
              </b-row>
              <b-row>
                <b-col v-show="(this.dates.date1 === this.today && this.dates.date2 === this.today && this.dates.date2<this.today) || (this.dates.date1===this.dates.date2)">Mostrando registros del <strong>{{ this.skip }}</strong> al <strong>{{parseInt(this.skip + this.len)}}</strong> de un total de <strong>{{this.count}}</strong> pertenecientes al <strong>{{this.today}}</strong>:</b-col>
                <b-col v-show="this.dates.date1 != '' && this.dates.date1 != this.dates.date2">Registros pertenecientes del <strong>{{ this.skip }}</strong> al <strong>{{parseInt(this.skip + this.len)}}</strong> de un total de <strong>{{this.count}}</strong> desde el <strong>{{ this.dates.date1 }}</strong> al <strong>{{ this.dates.date2 }}</strong>:</b-col>
              </b-row>
              <div class="mt-3"></div>
              <b-table striped hover :items="clients" :fields="fields">
                <template slot="actions" slot-scope="row">
                  <b-btn size="sm" @click.stop="details(row.item)">Ver detalle</b-btn>
                </template>
              </b-table>
              <b-pagination-nav :link-gen="linkGen" align="center" :number-of-pages="pages_nav" :value="currentPage" v-model="currentPage" />
              <br>
              <b-row>
                <b-col v-show="this.dates.date1 === this.today || this.dates.date2 === this.today">Mostrando registros del <strong>{{ this.skip }}</strong> al <strong>{{parseInt(this.skip + this.len)}}</strong> de un total de <strong>{{this.count}}</strong> pertenecientes al <strong>{{this.today}}</strong>:</b-col>
                <b-col v-show="this.dates.date1 != '' && this.dates.date1 != this.dates.date2">Registros pertenecientes del <strong>{{ this.skip }}</strong> al <strong>{{parseInt(this.skip + this.len)}}</strong> de un total de <strong>{{this.count}}</strong> desde el <strong>{{ this.dates.date1 }}</strong> al <strong>{{ this.dates.date2 }}</strong>:</b-col>
              </b-row>
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
import Vue from 'vue'
import axios from "axios";
import Header from './Header'
import Menu from './Menu'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
import format from 'date-fns/format'

const datepickerOptions = {
  sundayFirst: false,
  dateLabelFormat: 'dddd, MMMM D, YYYY',
  days:['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  daysShort: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  colors: {
    selected: '#e41b17',
    inRange: '#FF7672',
    selectedText: '#fff',
    text: '#565a5c',
    inRangeBorder: '#8C0400',
    disabled: '#fff',
  },
  texts: {
    apply: 'Aplicar',
    cancel: 'Cancelar',
    keyboardShortcuts: 'Keyboard Shortcuts',
  }
}
Vue.use(AirbnbStyleDatepicker, datepickerOptions)

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  var jsonObject = JSON.stringify(items);
  var csv = "\ufeff"+convertToCSV(jsonObject);
  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

var headers = {
  first_name: 'Nombre'.replace(/,/g, ''),
  last_name: 'Apellido'.replace(/,/g, ''),
  brand_w2l: 'Marca'.replace(/,/g, ''),
  rut_w2l: 'DNI',
  email: 'Correo electrónico',
  model_w2l: 'Modelo del auto',
  fone1_w2l: 'Celular',
  local_w2l: 'Local',
  store: 'Tienda',
  created_at: 'Fecha de ingreso',
  direccion: 'Dirección',
};

//today
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);

export default {
  components:{
    Header,
    Menu
  },
  name: "ClientShowByBrands",
  data() {
    return {
      fields: {
        first_name: { label: "Nombre", sortable: false, class: "text-left" },
        last_name: { label: "Apellidos", sortable: false, class: "text-center" },
        model_w2l: { label: "Modelo", sortable: false, class: "text-center" },
        local_w2l: { label: "Tienda", sortable: true, class: "text-center" },
        created_at: {
          label: "Fecha de Ingreso",
          sortable: true,
          class: "text-center"
        },
        actions: { label: "", class: "text-center" }
      },
      clients: [],
      excel: [],
      register:{},
      brand: localStorage.getItem('brand'),
      selected: null,
      options: [
        { value: null, text: 'Seleccione una opción' },
        { value: 'Administrador', text: 'Administrador' },
        { value: 'Supervisor', text: 'Supervisor' },
      ],
      dateFormat: 'YYYY-MM-DD',
      dateOne: '',
      dateTwo: '',
      dates: {
        brand: localStorage.getItem('brand'),
        date1: today,
        date2: today
      },
      today: today,
      currentPage: this.$route.params.page,
      pages_nav: null,
      count: null,
      skip: null,
      len: null
    };
  },
  created() {
    if(localStorage.getItem('role')=="Supervisor"){
      this.search()
    }else{
      this.$router.push({
      name: 'Login'
      })
    }
  },
  mounted(){
    
    // console.log(x)
   // document.getElementsByClassName('page-item')[x].childNodes[0].click()
   // console.log(document.getElementsByClassName('page-item')[2].childNodes[0].textContent)
   
  },
  watch: {
    '$route': {
        deep: true,
        handler: function () {
          this.search()
        }
      }
  },
  methods: {
    details (client) {
      this.$router.push({
        name: 'SupervisorShowClient',
        params: { id: client.id, slug: this.$route.params.slug }
      })
    },
    search(){
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.get(`/client/search/`+this.dates.brand+'/'+this.dates.date1+'/'+this.dates.date2+'/'+this.$route.params.page)
      .then(response => {
        this.clients = response.data;
        this.pages_nav = response.data[0].total
        this.count = response.data[0].count
        var pag = this.$route.params.page
        this.skip = ((50 * pag) - 50)
        this.len = response.data.length
      })
      .catch(e => {
        this.errors.push(e);
      })
    },
    descargar_csv(){
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.get(`/client/excel/`+this.dates.brand+'/'+this.dates.date1+'/'+this.dates.date2)
      .then(response => {
        this.excel = response.data;
        var itemsNotFormatted = this.excel
        var itemsFormatted = [];

        itemsNotFormatted.forEach((item) => {
            var d = new Date(item.created_at);
            var n = d.toLocaleString('es-PE');
            itemsFormatted.push({
                first_name: item.first_name.replace(/,/g, ''),
                last_name: item.last_name.replace(/,/g, ''),
                brand_w2l: item.brand_w2l,
                rut_w2l: item.rut_w2l,
                email: item.email,
                model_w2l: item.model_w2l,
                fone1_w2l: item.fone1_w2l,
                local_w2l: item.local_w2l,
                store: item.store,
                created_at: n,
                direccion: item.direccion
            });
        });
        var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
        var hour = currentDate.getHours();
        var min = currentDate.getMinutes();
        var sec = currentDate.getSeconds();
        var fileTitle = 'clientes-'+ this.brand + '_' + year+'-'+month+'-'+day+'__'+hour+'-'+min+'-'+sec;
        exportCSVFile(headers, itemsFormatted, fileTitle);
      })
      .catch(e => {
        this.errors.push(e);
      })
    },
    formatDates(dateOne, dateTwo) {
      let formattedDates = ''
      if (dateOne) {
        formattedDates = format(dateOne, this.dateFormat)
      }
      if (dateTwo) {
        formattedDates += ' / ' + format(dateTwo, this.dateFormat)
      }
      this.dates.date = formattedDates
      return formattedDates
    },
    linkGen (pageNum) {
      return {
        path: '/client/supervisor/page/' + pageNum
      }
    },
    apply(){
      var date1 = this.dates.date.split(' / ')[0]
      var date2 = this.dates.date.split(' / ')[1]
      this.dates.date1 = date1
      this.dates.date2 = date2
      this.currentPage = 1

      if(date1!='' && date2!=''){
        this.search()
        document.getElementsByClassName('page-item')[2].childNodes[0].click()
      } else{

      }
      
    }
  }
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
.border-top{
  border-top: 1px solid #dee2e6!important;
}
.border-bottom{
  border-bottom: 1px solid #dee2e6!important;
}
.asd__keyboard-shortcuts-trigger-wrapper{
  display: none!important;
}
.btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle{
  background-color: #e41b17!important;
  border-color: #8C0400!important;
  color: #FFF!important;
}
.page-link {
    position: relative;
    display: block;
    padding: .5rem .75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #e41b17!important;
    background-color: #fff;
    border: 1px solid #dee2e6;
}
.page-item.active .page-link {
    z-index: 1;
    color: #fff!important;
    background-color: #e41b17!important;
    border-color: #8C0400!important;
}
</style>