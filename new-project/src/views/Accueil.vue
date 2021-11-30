<template>
  <div id="app">

    <div id="bienvenue">
      <h1 class="">Bienvenue</h1><br>
      <p class="">Votre flux</p> 
      <button class="bouton_lien"><router-link :to="{ name: 'Creation', params: { id: this.$store.state.userId }}" class="lien_router">Créer un post</router-link></button><br>
      <button class="bouton_lien"><router-link :to="{ name: 'Profil', params: { id: $store.state.userId }}" class="lien_router">Profil</router-link></button>
    </div>

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
                  <i class="far fa-heart coeur centpourcent"></i>
                </div>
        </div>
    
        </router-link>
      </li>
    </ul>
  </div>  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Accueil',

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
  if(this.$store.state.le_user != -1){

    axios
    .get("http://localhost:3000/api/post/")

    
    .then(response =>
      this.posts = response.data.posts )
     
    .catch((error) =>{
      console.log(error.message)
  
    })

    axios
        .get("http://localhost:3000/api/auth/user/"+this.$store.state.le_user.userId)

        .then(response => {
            this.userData = response.data;
            self.$store.commit('userInfos', response.data)
            })

        .catch((error) =>{
        console.log(error.message)})
            
            }else{
   self.$router.push('/')
  }
},

methods:{
 
}


}
</script>

<style>
.centpourcent{
  width:100%
}
#bienvenue{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
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
  color:#855353bd;
  width: fit-content;
  margin:1%;
}
#router_link{
   text-decoration-line: none;
   color:#855353bd;
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