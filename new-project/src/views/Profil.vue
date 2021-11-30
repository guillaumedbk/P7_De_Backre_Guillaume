<template>
  <div class="profil">
     
  <ul>
    <li class="post" v-for="profil in personne" :key="profil.id">
        <h1>Bienvenue sur votre profil</h1>
        <div id="info">
        <i class="fas fa-info-circle fa-2x i"></i>
        <p>Pour modifier vos données, il vous suffit de changer les informations ci-dessous et de cliquer sur soumettre</p>
        </div>
         <form @submit.prevent="onSubmit"  class="formulaire">
      <div class="flex-center">
        <h3>Vos coordonnées :</h3>
        <p> <input type="text" :value= profil.prenom name="texte" id="prenom" class="input" @click="inputChange"/></p>
        <p> <input type="text" :value= profil.nom name="texte" id="name" class="input" @click="inputChange"/></p>
        <p> <input type="email" :value= profil.email name="mail" id="mail" class="input" @click="inputChange"/></p>
        <p> <input type="textarea" :value= profil.bio name="bio" id="bio" class="input" @click="inputChange"/> </p>
        <p> <input type="password" :value= profil.password name="mpd" id="mdp" class="input" @click="inputChange"/> </p>
        <p> <input type="submit" value="Soumettre" class="input"/> </p>
       </div>
      </form>
        </li>
  </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
     name:'Profile',
    data(){
        return{
            id:this.$route.params.id,
            personne:""
        }    
    },

mounted(){
  const self = this;
  console.log(this.$store.state.user)
  if(this.$store.state.le_user == -1){
    self.$router.push('/')
  }else{
    axios
    .get("http://localhost:3000/api/auth/user/"+this.id)
    
    .then(response => this.personne = response.data)
    
    .catch((error) => {console.log(error.message)})
  }
},
methods:{
    inputChange(){
        document.getElementById('prenom').addEventListener('input', function(){
           const texteInput = document.getElementById('prenom').value;
           const newPrenom = document.getElementById("prenom");
           newPrenom.value= texteInput;
         })

         document.getElementById('name').addEventListener('input', function(){
           const nameInput = document.getElementById('name').value;
           const newName = document.getElementById("name");
           newName.value= nameInput;
         })

         document.getElementById('mail').addEventListener('input', function(){
           const mailInput = document.getElementById('mail').value;
           const newMail = document.getElementById("mail");
           newMail.value= mailInput;
         })

          document.getElementById('bio').addEventListener('input', function(){
           const bioInput = document.getElementById('bio').value;
           const newBio = document.getElementById("bio");
           newBio.value= bioInput;
         })

          document.getElementById('mdp').addEventListener('input', function(){
           const mdpInput = document.getElementById('mdp').value;
           const newMdp = document.getElementById("mdp");
           newMdp.value= mdpInput;
         })
    },
    onSubmit(){
        const id = this.id;
        const prenomInput = document.getElementById('prenom').value;

        const nameInput = document.getElementById('name').value;

        const mailInput = document.getElementById('mail').value;

        const bioInput = document.getElementById('bio').value;

        const mdpInput = document.getElementById('mdp').value;

        const formData={
            email:  mailInput,
            password:mdpInput,
            prenom: prenomInput,
            nom: nameInput,
            bio: bioInput
        }
    
    axios
      .put("http://localhost:3000/api/auth/usermodifs/"+id, formData)

      .then(response => {console.log(response)
    
    axios
    .get("http://localhost:3000/api/auth/user/"+this.id)
    
    .then(response => this.personne = response.data)
    
    .catch((error) => {console.log(error.message)})
        })

      .catch((err)=> console.log(err))

      
    }
}
}
</script>

<style>
.i{
  margin: 7px;
}
li{
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.flex-center{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.input{
    color:black
}
.formulaire{
  display: flex;
  justify-content: center;
  background-color: #fdebeb;
  padding:3rem;
  width:fit-content;
  height:fit-content;
  border-radius:20px;
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, .2);
}
.profil{
  display:flex;
  justify-content: center;
}
#info{
  display: flex;
  align-items: center;
}
</style>