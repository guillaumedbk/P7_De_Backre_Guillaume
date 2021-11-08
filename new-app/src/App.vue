<template>
  <img id="logo" alt="Vue logo" src="./assets/icon-left-font.svg">
  <HelloWorld msg="Bienvenue sur votre réseau social Groupomania"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
#logo{
  width:400px;
}

</style>
