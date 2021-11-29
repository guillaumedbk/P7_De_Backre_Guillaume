<template>
  <div class="flex-center">
      <div class="post_design">

        <ul class="post_body">
            <li  v-for="post in posts" :key="post.id">  

                    <ul> 
                        <li  v-for="user in userData" :key="user.id">  
                                <p>Publié par {{ user.prenom }} :</p>
                        </li>
                    </ul>
                    
                    <h3>{{ post.texte }}</h3><br>
                    
                    <img  :src="post.imageUrl" alt="image du post" class="image_posts"> <br>
                    <div id="boutons">
                        <router-link :to="{ name: 'Commentaire', params: { id: id }}" tag="button">Commenter</router-link>
                        <router-link :to="{ name: 'Modification', params: { id: id }}" tag="button">Modifier</router-link>
                        <button @click="deletePost">Supprimer</button>
                    </div>
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
                    alert('votre post a été supprimé avec succès')
                self.$router.push('/accueil')
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
width:fit-content;
border-radius:20px;
}
.post_body{
padding-left: 0;
width:fit-content;
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
button{
    background-color:#fdd7d7 ;
    border: none; 
    border-radius:5px;
    font-weight: bold;
    width: 33%;
    height:100%;
}
#boutons{
    width: 100%;
    height:5%;
    display: flex;
    justify-content: space-around;
}
</style>