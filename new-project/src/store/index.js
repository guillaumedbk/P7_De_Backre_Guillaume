import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Data Store global
  },
  mutations: {
    //Mettre à jour, modifier le state
  },
  actions: {
    //Logique pour gérer les mutations
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
