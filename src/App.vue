<template>
  <div class="d-flex">
    <router-view/>

    <div class="sidebar">
      <h1 class="sidebar-heading">Memory game</h1>

      <div v-if="!isRanking">
        <Timer v-if="rendered" :paused="paused || completed" />

        <button v-if="!playing" class="action-btn d-block" @click="startGame">
          Start Game
        </button>
        <button v-if="playing && paused && !completed"
                class="action-btn d-block" @click="resumeGame">
          Resume Game
        </button>
        <button v-if="playing && !paused && !completed"
                class="action-btn d-block" @click="pauseGame">
          Pause Game
        </button>
        <button v-if="completed" class="action-btn d-block" @click="enterScore()">
          Enter your score
        </button>

        <h4 class="sidebar-info">Matched: <span>{{ matched }}</span></h4>
        <h4 class="sidebar-info">Attempts: <span>{{ attempts }}</span></h4>
      </div>

      <div v-if="isRanking">
        <input class="sidebar-input d-block" type="text" v-model="playerName"/>
        <button class="action-btn d-block"
          @click="insertScore({ player: playerName, score: playerScore, isPlayer: true })">
          Insert Score
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Timer from '@/components/timer.vue';

export default {
  name: 'App',
  components: {
    Timer,
  },
  data() {
    return {
      rendered: true,
      isRanking: false,
    };
  },
  computed: {
    ...mapState({
      paused: (state) => state.paused,
      playing: (state) => state.playing,
      attempts: (state) => state.attempts,
      matched: (state) => state.matched,
      completed: (state) => state.completed,
    }),
    ...mapGetters(['attempts', 'matched', 'completed', 'playerScore']),
  },
  methods: {
    ...mapActions([
      'startGame', 'resumeGame', 'pauseGame', 'insertScore',
    ]),
    enterScore() {
      this.$router.push('/ranking');
      this.isRanking = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sidebar {
  width: 312px;
  height: 100vh;
  background: #000;
  padding: 32px;

  & .sidebar-heading {
    font-size: 56px;
    font-weight: 900;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 49px;
  }

  & .sidebar-info {
    font-size: 18px;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 24px;

    & span {
      font-weight: 300;
    }
  }

  & .sidebar-input {
    background: white;
    min-width: 230px;
    width: 100%;
    height: 40px;
    font-size: 16px;
    padding: 16px;
    color: black;
    margin: 24px 0;
  }

  & .action-btn {
      background-color: #fff;
      color: #000;
      min-width: 160px;
      padding: 16px 20px;
      font-size: 16px;
      font-weight: 900;
      text-transform: uppercase;
      border-radius: 8px;
      text-align: center;
      transition: all .2s;
      display: block;

    &:hover {
      border-radius: 64px;
    }
  }
}
</style>
