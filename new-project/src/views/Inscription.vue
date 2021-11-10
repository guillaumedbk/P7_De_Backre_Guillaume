<template>
  <div class="inscription">
   <SignupForm></SignupForm>
  </div>

</template>

<script>
import SignupForm from '../components/SignupForm.vue'

export default{
  name:'Signup',
  components:{
    SignupForm
  },
  data: function(){
    return{
      mode:'signup',
      email:'',
      password:'',
      prenom:'',
      nom:'',
      bio:'',
      isAdmin:true
    }
  },
  methods:{
  sendToApi: function(){
    const self = this;
    this.$store.dispatch('createAccount', {
          email: this.email,
          password: this.password,
          prenom: this.prenom,
          nom: this.nom,
          bio: this.bio,
          isAdmin: true
    })
    .then(function(){
      self.$router.push('Home')
    }, 
    function (error){
      console.log(error);
    })
  }
}
}
</script>



