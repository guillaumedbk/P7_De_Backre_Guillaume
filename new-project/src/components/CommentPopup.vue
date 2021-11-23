<template>
  <div class="modal" id="modal">

      <div class="modal-header">
          <h2>Votre commentaire:</h2>
           <button data-close-button class="close-button">&times;</button>
      </div>

      <div>
          <form @submit.prevent="onSubmit">
            <textarea name="commentaire" id="commentaire" v-model="texte" placeholder="Votre commentaire" rows="10" cols="50"></textarea>
            <button>Envoyer</button>
          </form>

      </div>

  </div>

</template>

<script>
import axios from 'axios'
export default {
    name:'CommentPopup',

    data(){
        return{
            texte:"",
            id:this.$route.params.id
        }
    },
    
    methods:{
        onSubmit(){
    const self =this;
    const id = this.id;
    const commentaire = {postId: id, texte: this.texte}
   
    axios.post('http://localhost:3000/api/comments',commentaire)  
        //this.message = 'Uploaded!!'
       .then(function (response){
         console.log(response)
         if (response.status === 200){
           self.$router.push({ name: 'Post', params: { id: id }})
         }
       })
        .catch(function (error) {
          console.log(error);
        })
        }
    }
}
</script>

<style>
.modal{
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    border-radius: 10px;
    z-index:10;
    background-color: white;
    width:500px;
    max-width: 80%;

    overflow: -moz-hidden-unscrollable;
}
.modal-header{
    padding:10px 15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
}
h2{
    font-size:1.25 rem;
    font-weight: bold;
}
.modal-header .close-button {
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  font-size: 1.25rem;
  font-weight: bold;
}
#commentaire{
    width:99%;
    border:none;
}
</style>