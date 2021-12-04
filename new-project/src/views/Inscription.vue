<template> 
   <div class="principal">
     <div class="inscription">
      <h1>Rejoins-nous !</h1>
      <h3 id="message"></h3>
      <!-- Formulaire -->
      <form id="SignupForm" @submit="sendToApi()">
        <p>   <input type="text" v-model="nom" name="Nom" placeholder="Nom" class="p" required/> </p>
        <p>   <input type="text" v-model="prenom" name="Prénom" placeholder="Prénom" class="p" required/> </p>
        <p>   <input type="email" v-model="email" name="Mail" placeholder="Mail" class="p" required/> </p>
        <p>   <input type="password" v-model="password" name="password" placeholder="Mot de passe" class="p" required/> </p>
        <p>   <input type="textarea" v-model="bio" name="Bio" placeholder="Biographie" class="p" /> </p>

        <p>Quel est votre rôle ?</p>
        <div id="role">
        <input type="radio" id="false" value="false" v-model="picked">
          <label for="one">Utilisateur</label>
          <br>
        <input type="radio" id="true" value="true" v-model="picked">
          <label for="two">Modérateur</label>
        <br>
        </div>
        <span v-if="status == 'loading'"><input type="submit" value="Création en cours" id="bouton"/></span>
        <span v-else><input type="submit" value="Créer mon compte" id="bouton"/></span>
      </form>

     </div>
    
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default{
  name:'Signup',
  components:{
   
  },
  data: function(){         
    return{
      mode:'signup',
      email:'',
      password:'',
      prenom:'',
      nom:'',
      bio:'',
      isAdmin:"",
      picked:""
    }
  },
  computed:{
    ...mapState(['status'])
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
          isAdmin: this.picked
    })
    .then(function(){
     self.$router.push('/')
    }, 
    function (error){
      console.log(error);
    })
  }
}
  }
  


</script>



<style lang="scss">
#role{
  display: flex;
  flex-direction: column;
}
h1, h2{
  width: 100%;
}
.principal{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.SignupForm{
  width: 100%;
}
.inscription{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background:rgba(255,255,255, .3);
  width:fit-content;
  border-radius:20px;
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, .2);
}
#form_inscription{
  margin-left:45%;
  margin-right:45%;
  text-align: start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.p{
  width:100%;
 
}
#bouton{
    width:80%;
    background-color:#fdd7d7 ;
    border:none;
    border-radius:20px;
}
</style>

