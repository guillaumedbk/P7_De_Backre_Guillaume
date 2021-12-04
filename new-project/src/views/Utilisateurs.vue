<template>
  <div>
      <Header />
    <ul class="utilisateurs_liste">
                <h2>Communauté:</h2>
                <div class="englobe">
                <li class="utilisateurs" v-for="utilisateur in users" :key="utilisateur.id">   
                 <div>
                        <b-card-group deck>
                            <b-card
                            header="Profil"
                            header-tag="header"
                            footer="Card Footer"
                            footer-tag="footer"
                            title="User:"
                            class="card"
                            >
                            <b-card-text>{{ utilisateur.prenom }} {{ utilisateur.nom }}</b-card-text>
                            <p id="dd">{{ utilisateur.id }}</p>
                            <b-card-text>Biographie: {{ utilisateur.bio }}</b-card-text>
                            <div> 
                            <p> <input type="number" :value= utilisateur.id name="id" id="id" class="input" @click="recuperation"/> </p>
                                <button v-if="$store.state.userInfos.user.isAdmin == true" @click="recuperation" id="idd">{{ utilisateur.id}}</button>
                            </div>
                            </b-card>
                            <br>
                        </b-card-group>
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
let tokenLocal = localStorage.getItem('le_user')
        let object = JSON.parse(tokenLocal)
        let token = object.token;


axios.get("http://localhost:3000/api/auth/users", {headers:  {'authorization' : 'bearer ' + token}})
.then((utilisateurs) => this.users = utilisateurs.data.users)
.catch(error => console.log(error))

},
methods:{
    recuperation(){
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