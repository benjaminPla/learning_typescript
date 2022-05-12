<template>
  <div class='home'>
    <h1>Pokemon</h1>
    <div v-if='loading'>Loading...</div>
    <div v-else>
      <ul class='grid'>
        <li v-for='(pokemon, index) in pokemons' :key='index'>
          <PokemonCard :pokemon='pokemon'/>
        </li>
      </ul>
      <button @click='getPokemons(-20)' :disabled='offset <= 0'>&lt;</button>
      <button @click='getPokemons(20)'>&gt;</button>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import PokemonCard from '../components/PokemonCard.vue';

export default Vue.extend({
  name: 'Home',
  components: { PokemonCard },
  data() {
    return {
      offset: 0 as number,
      pokemons: [] as string[],
      loading: false as boolean,
    };
  },
  methods: {
    async getPokemons(offset: number): Promise<void> {
      this.loading = true;
      this.offset += offset;
      const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}`)
        .then((res) => res.json())
        .catch((err) => err.json())
        .finally(() => {
          this.loading = false;
        });
      this.pokemons = pokemons.results;
      this.$store.commit('setPokemons', this.pokemons);
    },
  },
  created() {
    this.getPokemons(this.offset);
  },
});
</script>

<style scoped lang='scss'>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
