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
                  <h4>:: Contacto</h4>
                  <b-btn @click.stop="descargar_csv">Descargar Lista de mensajes</b-btn>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="breadcrumb">
                  <b-link :to="{ name: 'Contacts' }">Contacto</b-link> &raquo; Lista de mensajes para {{ this.$route.params.brand }}:
                </b-col>
              </b-row>
              <div class="mt-2"></div>
              <b-table striped hover :items="clients" :fields="fields">
                <template slot="actions" slot-scope="row">
                  <b-btn size="sm" @click.stop="details(row.item)">Ver detalle</b-btn>
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
import axios from "axios";
import Header from './Header'
import Menu from './Menu'
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

    // Convert Object to JSON

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
  fullname: 'Nombre'.replace(/,/g, ''),
  phone: 'Teléfono'.replace(/,/g, ''),
  email: 'Correo electrónico'.replace(/,/g, ''),
  store: 'Tienda',
  brand: 'Marca',
  message: 'Mensaje',
  created_at: 'Fecha de ingreso'
};

export default {
  components:{
    Header,
    Menu
  },
  name: "Contacts",
  data() {
    return {
      fields: {
        fullname: { label: "Nombre", sortable: true, class: "text-left" },
        store: { label: "Tienda", sortable: true, class: "text-center" },
        brand: { label: "Marca", sortable: true, class: "text-center" },
        message: { label: "Mensaje", sortable: true, class: "text-left" },
        created_at: {
          label: "Fecha de Ingreso",
          sortable: true,
          class: "text-center"
        },
        actions: { label: "", class: "text-center" }
      },
      clients: []
    };
  },
  created() {
    axios
      .get(`/contact/` + this.$route.params.brand)
      .then(response => {
        this.clients = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      })
  },
  methods: {
    details (client) {
      this.$router.push({
        name: 'ShowContactByBrand',
        params: { id: client.id, slug: this.$route.params.slug, brand: this.$route.params.brand }
      })
    },
    descargar_csv(){
      var itemsNotFormatted = this.clients
      var itemsFormatted = [];

      itemsNotFormatted.forEach((item) => {
          var d = new Date(item.created_at);
          var n = d.toLocaleString('es-PE');
          itemsFormatted.push({
              fullname: item.fullname.replace(/,/g, ''),
              phone: item.phone.replace(/,/g, ''),
              email: item.email,
              store: item.store,
              brand: item.brand,
              message: item.message,
              created_at: n
          });
      });
      var currentDate = new Date()
      var day = currentDate.getDate()
      var month = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours();
      var min = currentDate.getMinutes();
      var sec = currentDate.getSeconds();
      var fileTitle = 'clientes-'+ this.$route.params.slug + '_' + year+'-'+month+'-'+day+'__'+hour+'-'+min+'-'+sec;
      exportCSVFile(headers, itemsFormatted, fileTitle);
    },
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    }
  }
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
</style>