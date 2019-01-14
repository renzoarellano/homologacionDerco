<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
/*eslint-disable */
import Vue from 'vue'
export default {}
const app = new Vue({
    el: '#app',
    data: {
    }
})
</script>

<style>
@import '../static/fonts/styles.css';
#app {
  font-family: 'Quicksand-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
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
.list-group-item{
  padding: 0!important;
  margin: 0 0 -1px 0;
}
.list-group-item a{
  padding: .75rem 1.25rem;
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
.list-group-item.active a, .router-link-exact-active, .router-link-active{
    color: #FFF!important;
    border: 1px solid #e41b17!important;
}
.list-group-item a:hover{
    color: #666;
}
.list-group-item.active a:hover, .router-link-exact-active:hover, .router-link-active:hover{
    color: #CCC;
}
.list-group-item.active, .router-link-exact-active, .router-link-active{
    border: solid 1px #e41b17!important;
    background-color: #e41b17!important;
}
.head{
  padding: 1rem;
}
.head h4{
  text-align: left;
  margin: 0;
}
.breadcrumb{
  text-align: left;
  display: block!important;
  border-radius: 0!important;
}
.breadcrumb a{
  display: inline-block;
  color: #e41b17;
  line-height: 38px;
}
.breadcrumb a:hover{
  display: inline-block;
  color: #666;
  text-decoration: none;
}
.border{
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  margin-bottom: 60px;
  padding-bottom: 20px;
}
.derco{
  background-color: #e41b17!important;
  border-radius: 5px;
  color: #FFF;
  border: none!important;
}
.cliente-detalle label{
  min-width: 150px;
}
.cliente-detalle strong{
  font-weight: bold;
}
.head h4{
  float: left;
}
.head .btn{
  float: right;
}
</style>
