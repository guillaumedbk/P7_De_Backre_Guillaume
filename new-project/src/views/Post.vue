<template>
<div>
 <Header />
  <div class="flex-center">
 
     
      <div class="post_design">

        <ul class="post_body">
            <li  v-for="post in posts" :key="post.id">  

                    <ul> 
                        <li  v-for="user in userData" :key="user.id" id="publiep">  
                                <p>Publié par {{ user.prenom }} :</p>
                    
                    <h3>{{ post.texte }}</h3><br>
                    
                    <img  :src="post.imageUrl" alt="image du post" class="image_posts"> <br>
                    <div id="boutons">
                        <!-- Affichage des boutons Modifier/Supprimer seulement si la personne a créé le post ou est modératrice -->
                        <router-link :to="{ name: 'Commentaire', params: { id: id }}" tag="button">Commenter</router-link>
                        <router-link :to="{ name: 'Modification', params: { id: id }}" tag="button" v-if="post.userId == $store.state.le_user.userId  || $store.state.userInfos.user.isAdmin == true">Modifier</router-link>
                        <button @click="deletePost" v-if="post.userId == $store.state.le_user.userId  || $store.state.userInfos.user.isAdmin == true"> Supprimer </button>
                    </div>
                </li>
           
        </ul>
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
  </div>
</template>

<script>
import axios from 'axios'
import Header from '../components/Header.vue'
export default {
    name:'Post',
    components:{
  Header
}, 
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
        let tokenLocal = localStorage.getItem('le_user')
        let object = JSON.parse(tokenLocal)
        let token = object.token;
        const self = this;
        
        //Vérifier l'état de connexion
          if(this.$store.state.user != -1){
        axios
        .get("http://localhost:3000/api/post/"+this.id, {headers:  {'authorization' : 'bearer ' + token}})
        
        .then(response => {
            
            this.posts = response.data ;
            this.userId = response.data.posts.userId
        
        axios
        .get("http://localhost:3000/api/auth/user/"+this.userId, {headers:  {'authorization' : 'bearer ' + token}})

        .then(response => this.userData = response.data)

        .catch((error) =>{
        console.log(error.message)})
            
            })
    
        .catch((error) =>{
        console.log(error.message)
    })
        
     axios
     .get("http://localhost:3000/api/comments/"+this.id, {headers:  {'authorization' : 'bearer ' + token}})
     .then(response => this.comments = response.data.comment)
     .catch((error) =>{
        console.log(error.message)
  
    })
          }else{
              self.$router.push('/')
          }
    },
    methods:{
        deletePost(){
            let tokenLocal = localStorage.getItem('le_user')
            let object = JSON.parse(tokenLocal)
            let token = object.token;
            const self=this;
            
            axios
            .delete("http://localhost:3000/api/post/"+this.id,  {headers:  {'authorization' : 'bearer ' + token}})
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
    flex-wrap: wrap;
}
.post_design{
background-color:#fdebeb;
display: flex;
align-items:  center;
flex-direction: column;
width:fit-content;
border-radius:20px;
margin-top: 2em;
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
ul{
    padding-left:2.3em;
    padding-right:1em;
}
</style>