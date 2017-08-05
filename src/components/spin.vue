<template>
  <transition name="fade">
    <div class="spin">
      <div class="spin-spinner">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
        <div class="spin-text" v-if="text">{{ text }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Spin',

    props: {
      text: String
    }
  }

</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import '../styles/animations/fade';

  $spin-size: 2.625rem;

  .spin {
    @include overlay;
    background-color: rgba($white, 0.8);

    .spin-spinner {
      position: absolute;
      top: 50%;
      margin-top: - ($spin-size + 1rem) / 2;
      width: 100%;
      text-align: center;

      .spin-text {
        color: $blue;
        font-size: 0.875rem;
      }

      .circular {
        width: $spin-size;
        height: $spin-size;
        animation: spin-rotate 2s linear infinite;
      }

      .path {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: $blue;
        stroke-linecap: round;
        animation: spin-dash 1.5s ease-in-out infinite;
      }
    }
  }

  @keyframes spin-rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
</style>
