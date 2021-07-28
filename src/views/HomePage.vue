<template>
  <div class="homepage-cards-container
                position-relative
                d-flex
                align-items-center
                justify-content-center">

    <Overlay v-if="!playing">
      <div class="overlay-content position-relative">
          <h2 class="overlay-heading">Press start to begin</h2>
      </div>
    </Overlay>

    <Overlay v-if="playing && paused">
      <div class="overlay-content position-relative">
          <h2 class="overlay-heading">Game Paused</h2>
      </div>
    </Overlay>

    <Overlay v-if="playing && completed">
      <div class="overlay-content position-relative">
          <h2 class="overlay-heading">🎉 Hooray! You did it! 🎉</h2>
          <h4 class="overlay-score">Your score: {{ playerScore }}</h4>
      </div>
    </Overlay>

    <div class="homepage-cards-grid position-relative" v-if="games.length">
      <Card v-for="game in games" :key="game.id" :game="game" @click="flipCard(game)"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Overlay from '@/components/overlay.vue';
import Card from '@/components/card.vue';

export default {
  name: 'HomePage',
  components: { Card, Overlay },
  async mounted() {
    await this.$store.dispatch('fetchGames');
  },
  computed: {
    ...mapState({
      paused: (state) => state.paused,
      playing: (state) => state.playing,
      games: (state) => state.games,
    }),
    ...mapGetters(['completed', 'playerScore']),
  },
  methods: {
    ...mapActions([
      'fetchGames', 'flipCard',
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.homepage-cards-container {
  flex: 1;
  height: 100vh;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: url('../assets/gen-z-bg.jpeg');
    background-size: cover;
    background-position: center;
    opacity: 0.6;
  }

  & .homepage-cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 32px;
    row-gap: 32px;
    padding: 32px;
    border-radius: 8px;
    overflow: hidden;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      background: black;
      opacity: 0.6;
    }
  }
}

.overlay-content {
  & .overlay-heading {
    font-size: 42px;
    font-weight: 900;
    color: black;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
  }

  & .overlay-score {
    margin: 32px 0 0 0;
    font-size: 30px;
    font-weight: 900;
    color: black;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
  }

  & .action-btn {
    margin: 32px auto 0 auto;
  }
}
</style>
