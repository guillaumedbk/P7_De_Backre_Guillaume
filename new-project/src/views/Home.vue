<template>

  <div class="home inscription">
    <img id="logo" alt="logo" src="../assets/icon.png">
    <HelloWorld msg="Bienvenue sur Groupomania, votre réseau social d'entreprise"/>
    <h2>Connexion</h2>
     
      <ConnectForm></ConnectForm>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ConnectForm from '../components/Connect_form.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    ConnectForm
  },

  data: function(){
return {
  email:'',
  password:'',
  }
}
}
</script>


<style lang="scss">
#logo{
  width:400px;
}
h1, h2{
  width: 100%;
}
.inscription{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#form_inscription{
  margin-left:45%;
  margin-right:45%;
  text-align: start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
p{
  width:100%;
  display: flex;
  justify-content: space-between;
}
</style>
