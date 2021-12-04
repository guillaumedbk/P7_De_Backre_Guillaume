<template>

           <div id="nav">
                <b-navbar class="success" toggleable="lg" type="dark" id="couleur">
                    <img id="logo" alt="logo" src="../assets/icon.svg">
                    <b-navbar-brand href="#">Groupomania</b-navbar-brand>

                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item><router-link :to="{ name: 'Accueil'}" class="lien_router">Accueil</router-link></b-nav-item>
                        <b-nav-item> <router-link :to="{ name: 'Creation', params: { id: this.$store.state.le_user.userId }}" class="lien_router">Créer un post</router-link></b-nav-item>
                        <b-nav-item> <router-link :to="{ name: 'Profil', params: { id: $store.state.le_user.userId }}" class="lien_router">Profil</router-link></b-nav-item>
                        <b-nav-item> <router-link :to="{ name: 'Utilisateurs'}" class="lien_router">Communauté</router-link></b-nav-item>
                    </b-navbar-nav>

                    <div> 
                    <button id="deconnect" @click="deconnexion">Déconnexion</button>
                    </div>

                    </b-collapse>
                </b-navbar>
            </div>
 
  

</template>

<script>
 import 'bootstrap/dist/css/bootstrap.css'
 import 'bootstrap-vue/dist/bootstrap-vue.css'


// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)
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
#nav{
    background-color: rgb(235, 177, 177);
   
}
#couleur{
    background-color: rgb(235, 177, 177);
}
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
    width:100%;
    font-size: 1.5rem;
}
.logotitre{
     display: flex;
     flex-wrap: wrap;
      align-items: center;
      flex-direction: column;
}
#deconnect{
    border:none;
    background-color: #fdebeb;
    border-radius: 25px;
    height: 30px;
    width: 130px;
    font-weight: bold;
}
.coordonnées{
    width: 40%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}
.vingt{
    width:20%;
}
.lien_router{
    font-weight: bold;
    text-decoration: none;
    color:rgba(0, 0, 0, 0.87);
}
</style>