<template>
  <div id="app">
      <h1>Bienvenue</h1>
      <p>Votre flux</p>
    <!--  <button @click="getAllPosts">Charger</button>-->
   
    <ul>
      <li class="post" v-for="post in posts" :key="post.id"> {{ post.texte }} + {{ post.imageUrl }}</li>
    
      
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
   imageUrl:null
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
}
</script>

<style>

</style>