<template>
  <div>
      
      <Header></Header>
      <h1>Créez votre post</h1>
      <FileUpload></FileUpload>
      
  </div>
</template>

<script>

import FileUpload from '../components/FileUpload.vue'
import Header from '../components/Header.vue'

export default {
    name:'Creation',
    components: {
        FileUpload,
        Header
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