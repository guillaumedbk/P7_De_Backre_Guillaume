<template>
  <div class="flex-center">
      <div class="post_design">
      <h1 id="titre">Post numéro: {{ this.$route.params.id }} </h1>


      
<ul class="post_body">
    <li  v-for="post in posts" :key="post.id">  

            <ul> 
                <li  v-for="user in userData" :key="user.id">  
                        <p>Post publié par: {{ user.prenom }}</p>
                </li>
            </ul>
                            
            <h2>{{ post.texte }}</h2><br>
            
            <img  :src="post.imageUrl" alt="image du post" class="image_posts"> <br>
            <router-link :to="{ name: 'Commentaire', params: { id: id }}" tag="button">Commenter</router-link>
            <router-link :to="{ name: 'Modification', params: { id: id }}" tag="button">Modifier</router-link>
            <button @click="deletePost">Supprimer</button>

    </li>

</ul>



       <ul>
    
    <h2>Commentaires:</h2>
    <li class="comments" v-for="comment in comments" :key="comment.id">   
        
    <p>{{ comment.texte }}</p><br>
    
    
    </li>
        </ul>
    </div>
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
            userId:"",
            userData: ""
            
        }    
    },

    mounted(){
        axios
        .get("http://localhost:3000/api/post/"+this.id)
        
        .then(response => {
            
            this.posts = response.data ;
            this.userId = response.data.posts.userId
        
        axios
        .get("http://localhost:3000/api/auth/user/"+this.userId)

        .then(response => this.userData = response.data)

        .catch((error) =>{
        console.log(error.message)})
            
            })
    
        .catch((error) =>{
        console.log(error.message)

       
  
    })

     axios
     .get("http://localhost:3000/api/comments/"+this.id)
     .then(response => this.comments = response.data.comment)
     .catch((error) =>{
        console.log(error.message)
  
    })
    },
    methods:{
        deletePost(){
           const self=this;

            axios
            .delete("http://localhost:3000/api/post/"+this.id)
            .then(function (response){
                console.log(response)
                if (response.status === 200){
                self.$router.push('Accueil')
         }
       })

            .catch((error)=>{console.log(error.message)})
        }
    }

}
</script>

<style>
.flex-center{
    display: flex;
    justify-content: center;
}
.post_design{
background-color:#fdebeb;
display: flex;
flex-direction: column;
align-items: center;
width:fit-content;
border-radius:20px;
}
.post_body{
padding-left: 0;
background-color: tomato;
width:fit-content;
display: flex;
flex-direction: column;
align-items: center;
list-style-type: none;
}
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