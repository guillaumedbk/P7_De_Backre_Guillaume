<template>
  <div>
      <Header />
    <ul class="utilisateurs_liste">
                <h2>Communauté:</h2>
                <div class="englobe">
                <li class="utilisateurs" v-for="utilisateur in users" :key="utilisateur.id">   
                 <div>
                   <router-link :to="{ name: 'Profil', params: { id: utilisateur.id  }}" class="lien_router">
                        <b-card-group deck>
                            <b-card
                            header="Profil"
                            header-tag="header"
                            footer-tag="footer"
                            title="User:"
                            class="card"
                            >
                            <b-card-text>{{ utilisateur.prenom }} {{ utilisateur.nom }}</b-card-text>
                           
                            <b-card-text>Biographie: {{ utilisateur.bio }}</b-card-text>
                
                            </b-card>
                            <br>
                        </b-card-group>
                          </router-link>
                        </div>
                </li>
                </div>
     </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '../components/Header.vue'
export default {
name:'Utilisateurs',

data(){
  return{
   users:""
  };
},

components:{
  Header
}, 

mounted(){
   //Vérifier l'état de connexion
    if(this.$store.state.user != -1){
let tokenLocal = localStorage.getItem('le_user')
        let object = JSON.parse(tokenLocal)
        let token = object.token;


axios.get("http://localhost:3000/api/auth/users", {headers:  {'authorization' : 'bearer ' + token}})
.then((utilisateurs) => this.users = utilisateurs.data.users)
.catch(error => console.log(error))
    }else{
       this.$router.push('/')
    }
},
methods:{
    suppression(){
        const id = document.getElementById('idd').innerHTML;
        console.log(id)
    }
 
}

}


</script>

<style>

.utilisateurs{
    list-style-type: none;
    width:50%;
}
.englobe{
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>