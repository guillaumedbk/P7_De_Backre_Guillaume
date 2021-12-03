<template>
  <div id="app">
<Header></Header>


    <div id="bienvenue">
         <h1 class="titre_accueil">Bonjour {{ $store.state.userInfos.user.prenom}} ! </h1><br>
    </div>
        <h2>Voici les dernières nouvelles</h2>
    
    <ul id="liste">
      <li class="post_accueil" v-for="post in posts" :key="post.id"> 
 
        <router-link :to="{ name: 'Post', params: { id: post.id}}" id="router_link">

            <ul> 
             
                  <li  v-for="user in userData" :key="user.id"> 
                     <div class="post_header">
                          <p class="nom">Publié par {{ user.prenom }}</p>
                        </div> 
                        
                  </li>
            </ul>

        <div class="centre">
                <div class="post_body_accueil">
                  <h3>{{ post.texte }}</h3> <br>
                  <img  :src="post.imageUrl" alt="image du post" class="image_posts centpourcent"> <br>
                  
                </div>
        </div>
    
        </router-link>
      </li>
    </ul>
  </div>  
</template>

<script>

import Header from '../components/Header.vue'

export default {
  name: 'Accueil',

components:{
  Header
}, 

data(){
  return{
   posts: null,
   id:null,
   texte:"",
   imageUrl:null, 
   image:"",
   userData:""
  };
},

mounted(){
  const self = this;
  let tokenLocal = localStorage.getItem('le_user')
  let object = JSON.parse(tokenLocal)
  let token = object.token;
  
  if(this.$store.state.le_user != -1){
  //
  fetch("http://localhost:3000/api/post/", {
          method: 'GET',
          headers: { 
           'Authorization' : 'bearer ' + token
          }, 
  })
    .then(response => response.json())
    .then((response) =>{
        this.posts = response.posts
      })
    .catch((error) =>{
      console.log(error.message)
  
    })

  //
  fetch("http://localhost:3000/api/auth/user/"+this.$store.state.le_user.userId, {
          method: 'GET',
          headers: { 
           'Authorization' : 'bearer ' + token
          }, 
  })
    .then(response => response.json())
    .then((response) =>{
        this.userData = response;
        self.$store.commit('userInfos', response)
      })
    .catch((error) =>{
      console.log(error.message)
    })
            
    }else{
   self.$router.push('/')
  }
}
}
</script>

<style>
.centpourcent{
  width:100%
}
#bienvenue{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.titre_accueil{
  display: flex;
}
.vflux{
  text-align: center;
}
.post_accueil{
  list-style-type: none;
  background-color: #fdebeb;
  border:2px solid #fdd7d7 ;
  margin: 5%;
  border-radius:15px;
  width:50%;
}
#liste{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.centre{
  display: flex;
  justify-content: center;
}

.rond{
    width: 40px;
    height: 40px;
    border-radius: 20px ;
    background: #fdd7d7;
    margin:3%;
}
.post_header{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
}
.nom{
  width: fit-content;
  margin:1%;
}
#router_link{
   text-decoration-line: none;
   color:black;
}
.coeur{
  font-size: 2em;
  margin-top:3%;
  margin-bottom:1%;
}
.post_body_accueil{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width:80%;
  padding-bottom: 2em;
}
.lien_router{
text-decoration: transparent;
color:black;
}
.bouton_lien{
  width:15%;
  height: 100px;
}
</style>