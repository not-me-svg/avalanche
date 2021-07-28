import { createStore } from 'vuex';
import gamesData from '@/data/games.json';
import scoresData from '@/data/scores.json';
import _ from 'lodash';

export default createStore({
  state: {
    playing: false,
    paused: true,
    clicks: 0,
    guess1: null,
    guess2: null,
    games: [],
    scores: [],
  },
  mutations: {
    setGames(state, payload) {
      state.games = [];

      // Definition of random const to set unique ids
      const d = new Date();
      const n = d.getMilliseconds();

      // Clone payload twice to duplicate cards
      const cards1 = _.cloneDeep(payload);
      cards1.forEach((game) => {
        game.id = cards1.indexOf(game) * n;
        game.rel = (cards1.indexOf(game) * n) + 1;
      });
      const cards2 = _.cloneDeep(payload);
      cards2.forEach((game) => {
        game.id = (cards2.indexOf(game) * n) + 1;
        game.rel = cards2.indexOf(game) * n;
      });

      // Suffle cards
      state.games = _.shuffle(state.games.concat(cards1, cards2));

      // Assign false values
      state.games.forEach((game) => {
        game.isFlipped = false;
        game.isMatched = false;
      });
    },
    setScores(state, payload) {
      state.scores = payload.map((score) => {
        const num = Math.floor((Math.random() * 999) + 1);
        score.score *= num;
        return score;
      });
    },
    insertScore(state, payload) {
      state.scores.push(payload);
      state.scores.sort((a, b) => {
        if (a.score > b.score) {
          return 1;
        }
        if (a.score < b.score) {
          return -1;
        }
        return 0;
      });
      console.log(state.scores);
    },
    flipCard(state, payload) {
      // Sets a variable with clicked card and count number of clicks
      const cardClicked = state.games.find((card) => card.id === payload.id);
      state.clicks += 1;

      // If click is even
      if (state.clicks % 2 === 1) {
        state.guess1 = cardClicked.id;
        state.guess2 = null;

        // Flip card
        state.games = state.games.map((card) => {
          if (card.id === payload.id) {
            card.isFlipped = true;
          } else {
            card.isFlipped = false;
          }
          return card;
        });
      // If click is odd and is the same card as the selected one
      } else if (cardClicked.rel === state.guess1) {
        state.guess2 = cardClicked.rel;
        state.games = state.games.map((card) => {
          // Set matched
          if (card.id === payload.id || card.id === state.guess1) {
            card.isFlipped = true;
            card.isMatched = true;
          }
          return card;
        });
      } else {
        state.guess2 = cardClicked.rel;

        // Flip card
        state.games = state.games.map((card) => {
          if (card.id === payload.id) {
            card.isFlipped = true;
          }
          return card;
        });
      }
    },
    startGame(state) {
      state.playing = true;
      state.paused = false;
      state.clicks = 0;
    },
    pauseGame(state) {
      state.paused = true;
    },
    resumeGame(state) {
      state.paused = false;
    },
  },
  actions: {
    fetchGames({ commit }) {
      commit('setGames', gamesData);
    },
    fetchScores({ commit }) {
      commit('setScores', scoresData);
    },
    insertScore({ commit }, info) {
      commit('insertScore', info);
    },
    flipCard({ commit }, game) {
      commit('flipCard', game);
    },
    startGame({ commit }) {
      commit('startGame');
    },
    pauseGame({ commit }) {
      commit('pauseGame');
    },
    resumeGame({ commit }) {
      commit('resumeGame');
    },
  },
  getters: {
    gamesList(state) {
      return state.games;
    },
    scoresList(state) {
      return state.scores;
    },
    matched(state) {
      return state.games.length
        ? state.games.filter((game) => game.isMatched).length / 2
        : 0;
    },
    attempts(state) {
      return Math.round(state.clicks / 2);
    },
    completed(state) {
      return (
        state.games.length
        && state.games.filter((game) => game.isMatched).length
        === state.games.length
      );
    },
    playerScore: (state, getters) => Math.round((getters.matched / getters.attempts) * 1000),
  },
});
