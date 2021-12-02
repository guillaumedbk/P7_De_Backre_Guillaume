<template>

  <div class="home inscription">
    <img id="logo" alt="logo" src="../assets/icon.svg">

    <h1 id="titre">Bienvenue sur Groupomania, votre réseau social d'entreprise</h1>
   

    <ConnectForm></ConnectForm>
  </div>
</template>

<script>
// @ is an alias to /src
import ConnectForm from '../components/Connect_form.vue'

export default {
  name: 'Home',
  components: {
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
body{
 background-image: linear-gradient(to right, #D66D75 , #E29587);

}
#titre{
text-shadow: 2px 2px 4px rgba(0, 0, 0, .2);
}
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

</style>
