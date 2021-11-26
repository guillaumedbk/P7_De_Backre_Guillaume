<template>
  <div>
     
  <ul>
    <li class="post" v-for="profil in personne" :key="profil.id">
        <h1>Bienvenue sur votre profil</h1>
            
        <h3>Vos coordonnées :</h3>

        <p>{{ profil.prenom }} {{ profil.nom }}</p>
        <p>{{ profil.email }}</p>
        <p>Biographie: {{ profil.bio }}</p>

         <form @submit.prevent="onSubmit" >
      
        <h3>Apportez vos modifications:</h3>
        <p> <input type="text" :value= profil.prenom name="texte" id="prenom" class="input" @click="inputChange"/></p>
        <p> <input type="text" :value= profil.nom name="texte" id="name" class="input" @click="inputChange"/></p>
        <p> <input type="email" :value= profil.email name="mail" id="mail" class="input"/></p>
        <p> <input type="textarea" :value= profil.bio name="bio" id="bio" class="input"/> </p>
        <p> <input type="submit" value="Modifier" class="input"/> </p>
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
    axios
    .get("http://localhost:3000/api/auth/user/"+this.id)
    
    .then(response => this.personne = response.data)
    
    .catch((error) => {console.log(error.message)})
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
    },
    onSubmit(){
        const id = this.id;
        const prenomInput = document.getElementById('prenom').value;
        console.log(prenomInput)

        const nameInput = document.getElementById('name').value;
        console.log(nameInput)

        const mailInput = document.getElementById('mail').value;
        console.log(mailInput)

        const bioInput = document.getElementById('bio').value;
        console.log(bioInput)


        const formData={
            email:  mailInput,
            password:'test',
            prenom: prenomInput,
            nom: nameInput,
            bio: bioInput
        }
      
        console.log(formData)

    axios
      .put("http://localhost:3000/api/auth/usermodifs/"+id, formData)

      .then(response => console.log(response))

      .catch((err)=> console.log(err))

      
    }
}
}
</script>

<style>
li{
    list-style-type: none;
}
.input{
    color:black
}
</style>