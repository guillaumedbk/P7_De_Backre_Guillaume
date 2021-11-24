<template>
<div class="container">
    <h2>Connexion</h2>
<form id="SignupForm" @submit="login()">
    <p>   <input type="email" v-model="email" name="Mail" placeholder="Mail" required/> </p>
    <p>   <input type="password" v-model="password" name="password" placeholder="Mot de passe" required/> </p>
   
     <Boutons></Boutons>
</form>
 
</div>

</template>

<script>
import Boutons from '../components/Boutons.vue'

export default {
    name:'connectForm',
    components:{
        Boutons
    },

    data: function(){
return {
  email:'',
  password:'',
  }
},

 methods:{
  
  login: function(){
    const self = this;
    this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
    })
    
    .then(function(){
   
      self.$router.push('Accueil')
    })
  
    .catch(function (error){
      console.log(error);
    })
    

  }} 

}
</script>

<style>
.container{
  background:rgba(255,255,255, .3);
  padding:3rem;
  height:350px;
  border-radius:20px;
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, .2);
}
h2{
  text-shadow: 2px 2px 4px rgba(0, 0, 0, .2);
}
input{
 background: transparent;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, .3);
  border-top: 1px solid rgba(255, 255, 255, .3);
  padding: 1rem;
  width: 200px;
  border-radius: 50px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  -moz-backdrop-filter: blur(5px);
  box-shadow: 4px 4px 60px rgba(0, 0, 0, .2);
  color: white;
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, .2);
  transition: all .3s;
  margin-bottom: 2em;
}
::placeholder{
  color:white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, .2);
}
input:hover,
input[type="email"]:focus,
input[type="password"]:focus{
  background: rgba(255,255,255,0.1);
  box-shadow: 4px 4px 60px 8px rgba(0,0,0,0.2);
}


</style>