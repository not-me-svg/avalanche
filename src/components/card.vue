<template>
    <div class="card position-relative"
        :class="{'card--flipped': game.isFlipped, 'card--matched' : game.isMatched}">
        <div class="card-front">
            <img width="120" height="120" :src="require(`./../assets/AvalancheLogo.jpg`)">
        </div>
        <div class="card-back">
            <img width="120" height="120" :src="require(`./../assets/${ game.img }`)">
        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    game: {
      type: Object,
      required: true,
    },
    isFlipped: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  min-height: 120px;
  cursor: pointer;

  &-front,
  &-back {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: 0.6s;
    -webkit-transform-style: preserve-3d;
    transition: 0.6s;
    transform-style: preserve-3d;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  &-back {
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
    position: absolute;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 60%);
  }

  &.card--flipped .card-back,
  &.card--matched .card-back {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }

  &.card--flipped .card-front,
  &.card--matched .card-front {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }

  &.card--matched {
    opacity: 0.3;
    pointer-events: none;
  }
}

</style>
