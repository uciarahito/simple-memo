<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Navbar></Navbar>
    <Content></Content>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Content from './components/Content'

export default {
  name: 'app',
  components: {
    Navbar,
    Content
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
</style>
