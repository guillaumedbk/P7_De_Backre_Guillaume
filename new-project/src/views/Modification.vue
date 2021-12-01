<template>

  <div class="file">
    <ul id="liste">
      <li class="post" v-for="post in posts" :key="post.id"> 

        <h2>Votre post:</h2>
        <p class="center" id="titre">{{ post.texte }}</p>
        <img  :src="post.imageUrl" alt="image du post" class="image_posts"> <br>

        <h2>Entrez vos modifications:</h2>

     <form @submit.prevent="onSubmit" enctype="multipart/form-data">
     
        
      <p> <input type="text" :value= post.texte name="texte" id="texte" class="input" @click="inputChange"/></p>

      </form>
      </li>
</ul>
<form @submit.prevent="onSubmit" enctype="multipart/form-data">
      
      <label>Upload File</label><br/>
       <p> <input type="file" ref="file" @change="onSelect"/></p>
       
      <div class="fields">
        <p><button>Submit</button></p>
      </div>
      <div class="message">
        <h5>{{message}}</h5>
      </div>
   </form>
 
  </div>
</template>

<script>
import axios from 'axios';
export default {
name:'Modification',

  data() {
    return {
      file:"",
      message:"",
      texte: "",
      id:this.$route.params.id,
      posts:null,
      titre:null
    }
  },
  
  mounted(){
    let tokenLocal = localStorage.getItem('le_user')
    let object = JSON.parse(tokenLocal)
    let token = object.token;

    axios
    .get("http://localhost:3000/api/post/"+this.id, {headers:  {'authorization' : 'bearer ' + token}})

    
    .then(response =>
      this.posts = response.data )
     
    .catch((error) =>{
      console.log(error.message)
  
    })
  },
  
  methods:{

    onSelect(){
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
     if(!allowedTypes.includes(file.type)){
        this.message = "Filetype is wrong!!"
      }
      if(file.size>500000){
        this.message = 'Too large, max size allowed is 500kb'
      }
    },

    inputChange(){
         document.getElementById('texte').addEventListener('input', function(){
           const texteInput = document.getElementById('texte').value;
           const titre = document.getElementById("titre");
           titre.textContent= texteInput
         })
    },
  
      onSubmit(){
        const id = this.id;
        const texteInput = document.getElementById('texte').value;
        console.log(texteInput)

      const formData = new FormData()
      formData.append('file',this.file)
      formData.append('texte', texteInput)
      
      let tokenLocal = localStorage.getItem('le_user')
      let object = JSON.parse(tokenLocal)
      let token = object.token;
      const self = this;

      axios
      .put("http://localhost:3000/api/post/"+id, formData,  {headers:  {'authorization' : 'bearer ' + token}})

      .then(response => {
      alert ('votre post a bien été modifié')
      console.log(response)
      self.$router.push('/accueil')
      })
      .catch((err)=> console.log(err))

      }
  }
}
</script>

<style>
.image_posts{
  width:100px;
}
.center{
  display: flex;
  justify-content: center;
  font-size: 2em;
}
</style>