<template>
<div>
  <Header />
<h1>COMMENTAIRE</h1>
  <CommentPopup />

</div>
</template>

<script>
import CommentPopup from '../components/CommentPopup.vue'
import Header from '../components/Header.vue'
export default {
name: 'commmentaire',

components:{
    CommentPopup,
    Header
}
}
</script>

<style>

</style>