<template>
  <div class="file">
   <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <label>Upload File</label><br/>
      <p> <input type="text" v-model="texte" name="texte" placeholder="Votre message" class="input" required/></p>
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
   
        await axios.post("http://localhost:3000/api/post/uploads/"+this.id, formData)  
        //this.message = 'Uploaded!!'
       .then(function (response){
         console.log(response)
         if (response.status === 200){
           self.$router.push({ name: 'Accueil'})
         }
       })
        .catch(function (error) {
          console.log(error);
        })
    } ,

        
/*
    postFetch(){
   // const self=this;
       const formData = new FormData()
      formData.append('file',this.file)
      formData.append('texte', this.texte )

    fetch('http://localhost:3000/api/post/uploads',{
                method: 'POST',
                 headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
                },
                body: formData 
            })
      .then((response) =>{
        console.log(response.json(response))
      })
      .catch(function(error){
        alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      })

    }
  */
  },
}
</script>

<style>
.file{
  display: flex;
  justify-content: center;
}

</style>