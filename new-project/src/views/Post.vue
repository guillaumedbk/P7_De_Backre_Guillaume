<template>
  <div>
      <h1>Post numéro: {{ this.$route.params.id }} </h1>
        <ul>
    <li class="post" v-for="post in posts" :key="post.id">   
     
    <h2>{{ post.texte }}</h2><br>
    
     <img  :src="post.imageUrl" alt="image du post" class="image_posts"> <br>
      <router-link to="/commentaire" tag="button">Commenter</router-link>
      <button>Supprimer</button>
    </li>

        </ul>

       <ul>
    
    <h2>Commentaires:</h2>
    <li class="comments" v-for="comment in comments" :key="comment.id">   
        
    <p>{{ comment.texte }}</p><br>
    
    
    </li>
        </ul>

  </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'Post',
    data(){
        return{
            id:this.$route.params.id,
            posts: null,
            comments:null,
            texte:"",
            imageUrl:null, 
          
        }    
    },

    mounted(){
        axios
        .get("http://localhost:3000/api/post/"+this.id)
        
        .then(response => this.posts = response.data )
    
        .catch((error) =>{
        console.log(error.message)
  
    })
     axios
     .get("http://localhost:3000/api/comments/"+this.id)
     .then(response => this.comments = response.data.comment)
     .catch((error) =>{
        console.log(error.message)
  
    })
    }

}
</script>

<style>
.post{
    list-style-type: none;
}
.image_posts{
    width:400px;
}
.comments{
     list-style-type: none;
     display: flex;
    justify-content: center;
}
</style>