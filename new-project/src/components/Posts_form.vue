<template>
  <div id="postsForm">
    <form action="/upload" method="POST" id="formulaire" enctype="multipart/form-data">
      <!--<p>   <input type="text" v-model="texte" name="contenu" placeholder="Votre message" required/> </p>
       <p>   <input type="text" v-model="imageUrl" name="image" placeholder="image" required/> </p>-->
      <p>   <input type="file" name="image"/> </p>
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
  
  

    export default {
    name:'PostsForm',
    data: function(){
    return{
        selectedFile: null,
        texte:"",
        //imageUrl:""
    }
},

    methods:{
      
        createPost: function(){
            const self = this;
            self.$store.dispatch('createPost', {
                texte: this.texte,
                imageUrl: this.imageUrl,
            })
        }

  }} 

</script>

<style>
#postsForm{
    display:flex;
    justify-content: center;
    flex-wrap: wrap;
}

</style>