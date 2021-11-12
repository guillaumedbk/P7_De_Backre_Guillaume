<template>
<form id="SignupForm" @submit="loginCheck()">
    <p>   <input type="email" v-model="email" name="Mail" placeholder="Mail" required/> </p>
    <p>   <input type="password" v-model="password" name="password" placeholder="Mot de passe" required/> </p>
     <Boutons></Boutons>
</form>
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
  loginCheck: function(){
    const self = this;
    this.$store.dispatch('checkLogin', {
          email: this.email,
          password: this.password,
    })
    .then(function(){
      self.$router.push('Accueil')
    }, 
    function (error){
      console.log(error);
    })

  }
}
}
</script>

<style>

</style>