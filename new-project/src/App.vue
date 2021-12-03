<template>
  <div id="app">
    <div id="nav">

 
<!--
        <div class="logotitre">
            <img id="logo" alt="logo" src="./assets/icon.svg">
            <h2 class="titre_header">Groupomania</h2>
        </div>
        
        <div class="coordonnées">
            <router-link :to="{ name: 'Accueil'}" class="lien_router">Accueil</router-link>
            <router-link :to="{ name: 'Creation', params: { id: this.$store.state.le_user.userId }}" class="lien_router">Créer un post</router-link><br>
            <router-link :to="{ name: 'Profil', params: { id: $store.state.le_user.userId }}" class="lien_router">Profil</router-link>
        </div>

           <div> 
             <button id="deconnect" @click="deconnexion">Déconnexion</button>
           </div>  
-->


    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
    name:'App',

    components:{

    },

    data: function(){
return {
 
  }
},
computed:{
    ...mapState(['le_user'])
  },

}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {

  a {
    font-weight: bold;
    color: black;

    &.router-link-exact-active {
      color: #fdd7d7;
    }
  }
  
}
</style>


