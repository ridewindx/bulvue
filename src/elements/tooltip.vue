<template>
  <div class="tooltip" @mouseenter="showPopper" @mouseleave="hidePopper">
    <div class="tooltip-rel" ref="reference">
      <slot></slot>
    </div>
    <transition name="fade">
      <div class="tooltip-popper" ref="popper" v-show="!disabled && (visible || always)"
           @mouseenter="showPopper" @mouseleave="hidePopper">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Popper from '../utils/popper'

  export default {
    name: 'Tooltip',

    mixins: [ Popper ],

    props: {
      content: [String, Number],
      delay: {
        type: Number,
        default: 0.1
      },
      disabled: Boolean,
      always: Boolean
    },

    methods: {
      showPopper () {
        if (this.disabled || this.always) return
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.visible = true
        }, this.delay * 1000)
      },

      hidePopper () {
        if (this.disabled || this.always) return
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.visible = false
          }, this.delay * 1000)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "../styles/variables";
  @import "../styles/popper";
  @import "../styles/animations/fade";

  $tooltip-arrow-width: 5px;
  $tooltip-arrow-distance: $tooltip-arrow-width - 1 + 4;
  $tooltip-bg-color: rgba($grey-darker, 0.9);
  $tooltip-color: $white;

  .tooltip {
    display: inline-block;

    &-rel {
      display: inline-block;
      position: relative;
    }

    &-popper {
      @include popper(".tooltip-arrow", $tooltip-arrow-width, $tooltip-arrow-distance, $tooltip-bg-color);
    }

    &-inner {
      max-width: 200px;
      min-height: 2rem;
      box-sizing: border-box;
      padding: 0.5rem 0.75rem;
      color: $tooltip-color;
      text-align: left;
      text-decoration: none;
      background-color: $tooltip-bg-color;
      border-radius: $radius-small;
      box-shadow: $shadow-down;
      white-space: nowrap;
    }

    &-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
    }
  }
</style>
