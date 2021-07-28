<template>
  <div class="ranking-page position-relative">
    <div class="ranking-page-table">
      <div class="ranking-page-table-head">
        <div>
          <span>Position</span>
        </div>
        <div>
          <span>Player</span>
        </div>
        <div>
          <span>Score</span>
        </div>
      </div>

      <div class="ranking-page-table-body">
        <div
          v-for="(position, index) in scores"
          :key="position.name"
          class="ranking-page-table-body-line"
          :class="{'ranking-page-table-body-line--current': position.isPlayer }"
        >
          <div>
            <span>#{{ index }}</span>
          </div>
          <div>
            <span>{{ position.player }}</span>
          </div>
          <div>
            <span>{{ position.score }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'RankingPage',
  data() {
    return {
      scoreAdded: false,
    };
  },
  async mounted() {
    await this.$store.dispatch('fetchScores');
  },
  computed: {
    ...mapState({
      scores: (state) => state.scores,
    }),
    ...mapGetters(['playerScore']),
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.ranking-page {
  flex: 1;
  height: 100vh;

  &-table {
    height: 100%;
    font-size: 24px;
    text-transform: uppercase;
    color: white;
    display: grid;
    grid-template-rows: 60px 1fr;

    &-head {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-content: center;
      position: sticky;
      top: 0;

      & span {
        font-weight: 600;
        padding: 16px;
      }
    }

    &-body {
      overflow: auto;

      & .ranking-page-table-body-line {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        & span {
          font-weight: 300;
          padding: 16px;
        }

        &--current {
          color: red;
        }
      }
    }
  }

  & .overlay-content {
    & .overlay-heading {
      font-size: 96px;
      font-weight: 900;
      color: black;
      text-transform: uppercase;
      letter-spacing: 1px;
      line-height: 79px;
      text-align: center;
    }

    & .overlay-score {
      margin: 32px 0 0 0;
      font-size: 56px;
      font-weight: 900;
      color: black;
      text-transform: uppercase;
      letter-spacing: 1px;
      line-height: 79px;
      text-align: center;
    }

    & .action-btn {
      margin: 32px auto 0 auto;
    }
  }
}
</style>
