<template>
  <p class="timer">
    {{ formatTime(hours) }} :
    {{ formatTime(minutes) }} :
    {{ formatTime(seconds) }}
  </p>
</template>

<script>
let interval = null;
export default {
  name: 'TimerComp',
  props: {
    paused: {
      type: Boolean,
      default: true,
    },
    reset: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      now: 0,
    };
  },
  watch: {
    paused() {
      if (!this.paused) {
        this.startInterval();
      } else {
        clearInterval(interval);
      }
    },
  },
  computed: {
    seconds() {
      return Math.trunc(this.now) % 60;
    },
    minutes() {
      return Math.trunc(this.now / 60) % 60;
    },
    hours() {
      return Math.trunc(this.now / 60 / 60) % 24;
    },
  },
  methods: {
    startInterval() {
      interval = setInterval(() => {
        if (!this.paused) {
          this.now += 1;
        }
      }, 1000);
    },
    formatTime(value) {
      if (value.toString().length <= 1) {
        return `0${value.toString()}`;
      }
      return value.toString();
    },
  },
  unmounted() {
    clearInterval(interval);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.timer {
  margin: 24px 0;
  font-size: 38px;
  font-weight: 300;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
}
</style>
