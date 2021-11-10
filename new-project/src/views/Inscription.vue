<template>
  <div class="inscription">
    <h1>Rejoins-nous !</h1>

    <!-- Formulaire -->
    <form id="form_inscription" @submit="sendToApi()">
      <p><label>Nom:</label>            <input type="text" v-model="nom" name="Nom" required/> </p>
      <p><label>Prénom:</label>         <input type="text" v-model="prenom" name="Prénom" required/> </p>
      <p><label>Mail:</label>           <input type="email" v-model="email" name="Mail" required/> </p>
      <p><label>Mot de passe:</label>   <input type="password" v-model="password" name="password" required/> </p>
      <p><label>Biographie:</label>     <input type="textarea" v-model="bio" name="Bio"/> </p>

      <input id="bouton" type="submit" value="Envoyer">
    </form>
  
  </div>

</template>

<script>
export default{
  name:'Signup',
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
    }).then(function(){
      self.$router.push('Home')
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


