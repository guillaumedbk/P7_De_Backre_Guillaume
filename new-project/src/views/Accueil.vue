<template>
  <div id="app">

    <div id="bienvenue">
      <h1 class="">Bienvenue</h1><br>
      <p class="">Votre flux</p> 
      <router-link to="/creation">Creation</router-link>
    </div>

    <ul id="liste">
      <li class="post" v-for="post in posts" :key="post.id"> 
       
        <router-link :to="{ name: 'Post', params: { id: post.id}}" id="router_link">
          <div class="post_header">
            <div class="rond"></div>
            <p class="nom">{{ $store.state.prenom }}</p>
            <p class="nom">{{ $store.state.nom }}</p>
            <p class="nom">{{ $store.state.token }}</p>
          </div>

        <div class="centre">
                <div class="post_body">
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
  };
},

mounted(){
   axios
    .get("http://localhost:3000/api/post/")

    
    .then(response =>
      this.posts = response.data.posts )
     
    .catch((error) =>{
      console.log(error.message)
  
    })

},

methods:{
 
}


}
</script>

<style>
h1{
  width:0;
}
.centpourcent{
  width:100%
}
#bienvenue{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.post{
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
.post_body{
  display: flex;
  justify-content: flex-start;
  
  flex-wrap: wrap;
  width:80%;

}

</style>