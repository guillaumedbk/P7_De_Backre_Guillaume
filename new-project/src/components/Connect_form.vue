<template>
<div class="container">
    <h2>Connexion</h2>
<form id="SignupForm" @submit="login">
    <p>   <input type="email" v-model="email" name="Mail" placeholder="Mail" required/> </p>
    <p>   <input type="password" v-model="password" name="password" placeholder="Mot de passe" required/> </p>

    <div v-if="status == 'error_login'">
     <p> Adresse mail et/ou mot de passe invalide </p>
    </div>

   <button id="bouton" type="submit">
     <span v-if="status == 'loading'">Connexion en cours..</span>
     <span v-else >Connexion</span>
   </button>
    
</form>
 
</div>

</template>

<script>
import { mapState } from 'vuex'

export default {
    name:'connectForm',
    components:{
       
    },

    data: function(){
return {
  email:'',
  password:'',
  }
},

computed:{
    ...mapState(['status'])
  },

 methods:{

   login(e){
   e.preventDefault()
const self = this;
     const userInfos ={
       email: this.email,
       password:this.password
     }

     fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify(userInfos) 
          })
          .then(response => response.json())
          .then((response) =>{
            console.log(JSON.stringify(response))
            self.$router.push('Accueil')
          //  commit('setStatus', '')
          //  commit('logUser', response.data)
            
          })
          .catch((error)=>{
            console.log("catch"+error)
          })
   }
   
 /*
  login: function(){
    const self = this;
    this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
    })
    
    .then(function(response){
      console.log((response))
      self.$router.push('Accueil')
    })
  
    .catch(function (){
      alert("mot de passe incorrect")
    })
  }
  */
  },
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
#bouton{
    width:80%;
    background-color:#fdd7d7 ;
    border:none;
    border-radius:20px;
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .2);
    padding: 1rem;
    transition: all .3s;
    box-shadow: 4px 4px 60px rgba(0, 0, 0, .2);
}
</style>