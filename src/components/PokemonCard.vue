<template>
  <div>
    <h4>{{ pokemon.name }}</h4>
    <button @click='getMoreInfo(pokemon.url)'>
      {{ show ? 'Less Info' : 'More Info'}}
    </button>
    <div v-if='loading'>Loading...</div>
    <div v-if='show'>
      <ul v-if='moreInfo.types'>{{ moreInfo.types.length > 1 ? 'Types:' : 'Type:'}}
        <li v-for='(type, index) in moreInfo.types' :key='index'>
          {{ type.type.name }}
        </li>
      </ul>
      <ul v-if='moreInfo.abilities'>{{ moreInfo.abilities.length > 1 ? 'Abilities:' : 'Ability:'}}
        <li v-for='(ability, index) in moreInfo.abilities' :key='index'>
          {{ ability.ability.name }}
        </li>
      </ul>
      <img v-if='moreInfo.sprites' :src='moreInfo.sprites.front_default' :alt='moreInfo.name'>
      <img
        v-if='moreInfo.sprites'
        :src='moreInfo.sprites.other.dream_world.front_default'
        :alt='moreInfo.name'
        />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'PokemonCard',
  props: ['pokemon'] as string[],
  data() {
    return {
      moreInfo: {} as Record<string, unknown>,
      show: false as boolean,
      loading: false as boolean,
    };
  },
  methods: {
    async getMoreInfo(url: string): Promise<void> {
      if (Object.keys(this.moreInfo).length === 0) {
        this.loading = true;
        const moreInfo = await fetch(url)
          .then((res) => res.json())
          .catch((err) => err.json())
          .finally(() => {
            this.loading = false;
          });
        this.moreInfo = moreInfo;
      }
      this.show = !this.show;
    },
  },
});
</script>
