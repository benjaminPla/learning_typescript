import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: [], // missing ts
  },
  mutations: {
    // async getPokemons(offset: number): Promise<void> {
    //   const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}`)
    //     .then((res) => res.json())
    //     .catch((err) => err.json());
    // },
    setPokemons(state, payload) {
      state.pokemons = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
