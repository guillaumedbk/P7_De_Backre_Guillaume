<template>
  <div id="app">
    <router-link to="/creation">Creation</router-link>
      <h1>Bienvenue</h1>
      <p class="centre">Votre flux</p> 
    <ul id="liste">
      <li class="post" v-for="post in posts" :key="post.id"> 
       
        <router-link :to="{ name: 'Post', params: { id: post.id}}">
        
          <h3>{{ post.texte }}</h3> <br>
          <img  :src="post.imageUrl" alt="image du post" class="image_posts"> <br>
          <router-link to="/commentaire" tag="button">Commenter</router-link>

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
.post{
  list-style-type: none;
  background-color: aliceblue;
  border:2px solid brown ;
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
.image_posts{
  width:80%;
}

</style>