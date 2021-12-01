<template>
  <div class="header">
        <div class="logotitre">
            <img id="logo" alt="logo" src="../assets/icon.svg">
            <h2 class="titre_header">Groupomania</h2>
        </div>
        
        <div class="coordonnées">
            <p class="vingt">{{ $store.state.userInfos.user.prenom}}</p>
             <p class="vingt">{{ $store.state.userInfos.user.nom}}</p>
             <button id="deconnect" @click="deconnexion">Déconnexion</button>
        </div>
 
  </div>
</template>

<script>
export default {
  name:'Header',
  methods:{
       deconnexion(){
      this.$store.commit('le_user', -1)  
      localStorage.setItem('le_user', "")
      console.log(this.$store.state.le_user)
      this.$router.push('/')
  }, 
  }
}
</script>

<style>
.header{
   background-color: rgb(235, 177, 177);
   width:100%;
   display: flex;
   align-items: center;
   justify-content: space-between;
}
#logo{
    width:200px;
}
.titre_header{
    width:10%;
    font-size: 1.5rem;
}
.logotitre{
     display: flex;
      align-items: center;
}
#deconnect{
    border:none;
    background-color: #fdebeb;
    border-radius: 25px;
    height: 50px;
    width: 130px;
}
.coordonnées{
    width: 40%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.vingt{
    width:20%;
}
</style>