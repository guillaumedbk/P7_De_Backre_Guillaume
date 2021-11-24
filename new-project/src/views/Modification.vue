<template>

  <div class="file">
    <!--
     <ul id="liste">
      <li class="post" v-for="post in posts" :key="post.id"> 
        
        <form @submit.prevent="testChange" enctype="multipart/form-data">
          <input type="text" id="texte" name="texte" :value= post.texte ><br>

          <label>Modifier l'image: </label><br>
          <input type="file" ref="file" name="file"><br>
          <button type="submit">Soumettre</button>
        </form>
       
      

        <img  :src="post.imageUrl" alt="image du post" class="image_posts"> <br>
       
      </li>
    </ul>
-->
     <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <label>Upload File</label><br/>
      <p> <input type="text" v-model="texte"  name="texte" placeholder="Votre message" class="input" required/></p>
      <p> <input type="file" ref="file" @change="onSelect"/></p>
       
      </div>
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
      texte:"",
      id:this.$route.params.id,
      posts:null,
      titre:null
    }
  },
  /*
  mounted(){
    axios
    .get("http://localhost:3000/api/post/"+this.id)

    
    .then(response =>
      this.posts = response.data )
     
    .catch((error) =>{
      console.log(error.message)
  
    })
  },
  */
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
  
      onSubmit(){
        const id = this.id;
      const formData = new FormData()
      formData.append('texte', this.texte)
      formData.append('file',this.file)
      

      axios
      .put("http://localhost:3000/api/post/"+id, formData)

      .then(response => console.log(response))

      .catch((err)=> console.log(err))

      }
  }
}
</script>

<style>


</style>