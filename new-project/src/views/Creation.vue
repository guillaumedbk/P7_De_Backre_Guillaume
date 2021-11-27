<template>
  <div>
      <h1>Créez votre post</h1>
      
      <FileUpload></FileUpload>
      
  </div>
</template>

<script>

import FileUpload from '../components/FileUpload.vue'


export default {
    name:'Creation',
    components: {
        FileUpload
  }, 
  data(){
  return{
   id: this.$route.params.id,
  }
  }

}
</script>

<style>

</style>