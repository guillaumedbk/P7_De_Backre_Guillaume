<template>
  <div id="app">
    <div id="nav">
     <!-- <router-link to="/">Home</router-link> |
      <router-link to="/inscription">Inscription</router-link>
-->
<!--
        <button v-if="this.$store.state.le_user == -1" class="disconnect">Déconnecté</button>
        <button v-else class="connect">Connecté</button><br>
-->
      
        
   
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name:'App',

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
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #fdd7d7;
    }
  }
}
.connect{
  background-color:green;
  width:10%;
    border:none;
    border-radius:20px;
}

.disconnect{
  background-color:rgba(255, 0, 0, 0.473);
   width:fit-content;
  
    border:none;
    border-radius:20px;
}
</style>


