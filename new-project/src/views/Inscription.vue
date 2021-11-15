<template> 
   <div class="inscription">
    <h1>Rejoins-nous !</h1>
    <!-- Formulaire -->
    <form id="SignupForm" @submit="sendToApi()">
      <p>   <input type="text" v-model="nom" name="Nom" placeholder="Nom" required/> </p>
      <p>   <input type="text" v-model="prenom" name="Prénom" placeholder="Prénom" required/> </p>
      <p>   <input type="email" v-model="email" name="Mail" placeholder="Mail" required/> </p>
      <p>   <input type="password" v-model="password" name="password" placeholder="Mot de passe" required/> </p>
      <p>   <input type="textarea" v-model="bio" name="Bio" placeholder="Biographie"/> </p>

     <Boutons></Boutons>
    </form>
  </div>
</template>

<script>
import Boutons from '../components/Boutons.vue'

export default{
  name:'Signup',
  components:{
    Boutons
  },
  data: function(){         
    return{
      mode:'signup',
      email:'',
      password:'',
      prenom:'',
      nom:'',
      bio:'',
      isAdmin:true
    }
  },
  methods:{
  sendToApi: function(){
    const self = this;
    this.$store.dispatch('createAccount', {
          email: this.email,
          password: this.password,
          prenom: this.prenom,
          nom: this.nom,
          bio: this.bio,
          isAdmin: true
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



<style lang="scss">
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

