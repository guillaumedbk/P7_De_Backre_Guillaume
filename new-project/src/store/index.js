import Vue from 'vue'
//import { axios } from 'vue/types/umd';
import Vuex from 'vuex'

Vue.use(Vuex)

let le_user = localStorage.getItem('le_user');
if (!le_user) {
 le_user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    le_user = JSON.parse(le_user);
   
  } catch (ex) {
    le_user = {
      userId: -1,
      token: '',
    };
  }
}


export default new Vuex.Store({
  state: {
    //Data Store global
    le_user : le_user,
    status:'',
    token:'',
    userId:'',
    prenom:'',
    nom: '',
    user:-1,
    userInfos:{
      bio:"",
      email:"",
      id:"",
      isAdmin:"",
      nom:"",
      prenom:""
    }
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
    user: function(state, id){
      state.user = id;
    },
    le_user: function(state, id){
      state.le_user = id;
    },
    userInfos: function(state, data){
      state.userInfos = data;
    }
  },
  actions: {
    //Logique pour gérer les mutation

    ////INSCRIPTION
    createAccount:({commit}, user) => {
    
        commit('setStatus', 'loading')

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
        commit('userInfos', response)
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

  },

})
