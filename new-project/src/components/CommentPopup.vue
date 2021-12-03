<template>
  <div class="comment" id="comment">

      <div class="comment-header">
          <h2>Votre commentaire:</h2>
          
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
        const self = this;
        return{
            texte:"",
            id: self.$store.state.userId,
            postId: this.$route.params.id,
        }
    },
    
    methods:{
        onSubmit(){
    
    const self =this;
    const id = this.id;
    const postId = this.postId;
    console.log(id)
    const commentaire = {userId: self.id, postId: self.postId, texte: self.texte}

    let tokenLocal = localStorage.getItem('le_user')
    let object = JSON.parse(tokenLocal)
    let token = object.token;
   
    axios.post('http://localhost:3000/api/comments',commentaire, {headers:  {'authorization' : 'bearer ' + token}})  
        //this.message = 'Uploaded!!'
       .then(function (response){
         console.log(response)
         if (response.status === 200){
           self.$router.push({ name: 'Post', params: { id: postId }})
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
.comment{
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    border: none;
    border-radius: 10px;
    z-index:10;
    background-color: rgba(255, 255, 255, 0.336);
    width:500px;
    max-width: 80%;

    overflow: -moz-hidden-unscrollable;
}
.comment-header{
    padding:10px 15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
h2{
    font-size:1.25 rem;
    font-weight: bold;
}
.modal-header .close {
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  font-size: 1.25rem;
  font-weight: bold;
}
#commentaire{
    width:100%;
    border:none;
    background-color: rgba(255, 255, 255, 0.336);
}
</style>