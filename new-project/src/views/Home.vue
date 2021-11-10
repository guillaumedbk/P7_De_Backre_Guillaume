<template>
  <div class="home">
    <img id="logo" alt="logo" src="../assets/icon.png">
    <HelloWorld msg="Bienvenue sur Groupomania, votre réseau social d'entreprise"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>


<style lang="scss">
#logo{
  width:400px;
}
</style>