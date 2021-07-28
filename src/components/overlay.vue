<template>
    <div class="overlay d-flex justify-content-center align-items-center">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Overlay',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        background: white;
        opacity: 0.6;
    }
}
</style>
