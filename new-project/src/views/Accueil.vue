<template>
  <div>
      <h1>Bienvenue</h1>
      <p>Votre flux</p>
      <button @click="getAllPosts">Charger</button>
     
     {{ posts }}

     

  </div>
</template>

<script>
import axios from 'axios'

export default {
name: 'Accueil',

data(){
  return{
   posts: null
  };
},
methods:{
 getAllPosts(){
   axios
    .get("http://localhost:3000/api/post/")
    .then(response =>
      this.posts = response.data)
  
    .catch((error) =>{
      console.log(error)
  
    })
 }
}

}
</script>

<style>

</style>