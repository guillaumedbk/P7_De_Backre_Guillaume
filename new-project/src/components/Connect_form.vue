<template>
<div class="containers">
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
   
    <p id="inscription">Pas encore inscrit ?
    <router-link to="/inscription" class="routerlink">Inscription</router-link>
    </p>
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
  connect:"",
  }
},

computed:{
    ...mapState(['status'])
  },

 methods:{

   login(e){
     this.$store.commit('setStatus', 'loading');
     
   e.preventDefault()
      const self = this;
     // const etat = this.connect;
      const userInfos ={
       email: this.email,
       password:this.password
     }

     fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfos) 
          })
          
          .then((response) => response.json())
        
          .then((response) =>{
            console.log(response)
            console.log(JSON.stringify(response))
          
         
            if(response.status == 200){
                  self.$store.commit('setStatus', '');
                  self.$store.commit('user', response.userId)

                  self.$store.commit('userId', response.userId)
                  self.$store.commit('userToken', response.token)
          
                  localStorage.setItem('le_user', JSON.stringify(response))
                  self.$store.commit('le_user', response)
                      //Redirection si connecté
                      self.$router.push('/accueil')
            
            }else{
              alert(response.error)
             
            }
          })
          .catch((error)=>{
            console.log("catch"+error)
            self.$store.commit('setStatus', 'error_login');
          })
   }
  },
}
</script>

<style>
.containers{
  background:rgba(255,255,255, .3);
  padding:3rem;
  width: 70%;
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
  width: 30%;
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
    width: 25%;
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
#inscription{
  padding-top: 20px;
}
.routerlink{
  
  color: rgba(0, 0, 0, 0.616);
}
</style>