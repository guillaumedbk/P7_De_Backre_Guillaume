import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Data Store global
    status:'',
    token:'',
    userId:'',
    prenom:'Henry',
    nom: 'Dupond',
    user:{
      userId:-1,
      token:''
    },
  },
  mutations: {
    //Mettre à jour, modifier le state
    userId:(state, id) =>{
      state.userId = id
    },
    userToken:(state, token) =>{
      state.token = token
    },
    setStatus: function(state, status){
      state.status = status;
    },
    logUser: function(state, user){
      state.user = user;
    }
  },
  actions: {
    //Logique pour gérer les mutation

    ////INSCRIPTION
    createAccount:({commit}, user) => {
        commit;

        fetch("http://localhost:3000/api/auth/signup", {
          method: 'POST',
          headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
          },
          body: JSON.stringify(user) 
      })
      .then((response) =>{
        commit('setStatus', 'created')
        console.log(response.json(response))
      })
      .catch(function(error){
        commit('setStatus', 'error_create')
        alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      })
    },

    ////CREATION DES POSTS
    createPost:({commit}, post) =>{
      commit;

      fetch("http://localhost:3000/api/post", {
          method: 'POST',
          headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
          },
          body: JSON.stringify(post) 
      })
      .then((response) =>{
        console.log(response.json(response))
      })
      .catch(function(error){
        alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      })
    }
   

  },
  modules: {

  }
})
