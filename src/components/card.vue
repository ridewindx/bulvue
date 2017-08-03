<template>
  <div class="card" :class="classes">
    <header class="card-header" v-if="$slots.headerTitle || $slots.headerExtra">
      <div class="card-header-title">
        <slot name="headerTitle"></slot>
      </div>
      <div class="card-header-icon">
        <slot name="headerExtra"></slot>
      </div>
    </header>
    <div class="card-image" v-if="$slots.image">
      <slot name="image"></slot>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <footer class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Card',

    props: {
      bordered: Boolean,
      noshadow: Boolean,
      nohover: Boolean
    },

    computed: {
      classes () {
        return {
          bordered: this.bordered || this.noshadow,
          noshadow: this.noshadow || this.bordered,
          nohover: this.nohover || this.noshadow
        }
      }
    },

    mounted () {
      if (!this.$slots.footer) return
      for (let item of this.$slots.footer) {
        if (item.context) {
          item.elm.classList.add('card-footer-item')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/components/card';
  @import '../styles/variables';

  .card {
    box-shadow: $shadow-card;
    transition: all 0.2s ease-in-out;

    &.bordered {
      border: 1px solid rgba($black, 0.1);
    }

    &.noshadow {
      box-shadow: none;
    }

    &:hover {
      box-shadow: $shadow-down;

      &.nohover {
        box-shadow: $shadow-card;

        &.noshadow {
          box-shadow: none;
        }
      }
    }
  }
</style>
