<template>
  <div class="file">
   <form @submit.prevent="onSubmit" enctype="multipart/form-data" id="createpost">
      <div class="fields">
        <label>Upload File</label><br/>
      <p> <input type="text" v-model="texte" name="texte" placeholder="Votre message" class="input" required/></p>
      <p> <input type="file" ref="file" class="input" @change="onSelect"/></p>
       
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
  name: 'FileUpload',
  data() {
    return {
      file:"",
      message:"",
      texte:"",
      id : this.$route.params.id,
    }
  },
  methods: {

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

    async onSubmit(){
      const self=this;
 
      const formData = new FormData()
      formData.append('userId', this.id)
      formData.append('file',this.file)
      formData.append('texte', this.texte )

      let tokenLocal = localStorage.getItem('le_user')
      let object = JSON.parse(tokenLocal)
      let token = object.token;
   
      await axios.post("http://localhost:3000/api/post/uploads/"+this.id, formData, {headers:  {'authorization' : 'bearer ' + token}})  
        
       .then(function (response){
                console.log(response)
                if (response.status === 200){
                    alert('votre post a été créé avec succès')
                self.$router.push('/accueil')
         }
       })
        .catch(function (error) {
          console.log(error);
        })
    } ,

  },
}
</script>

<style>
.file{
  display: flex;
  justify-content: center;
}
#createpost{
  background:rgba(255,255,255, .3);
 border-radius:25px;
padding:1em;
  
}
</style>