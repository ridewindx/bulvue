<template>
  <transition name="fade">
    <div class="alert" :class="classes" v-if="!closed">
      <span class="alert-icon" v-if="icon">
        <slot name="icon">
          <Icon :icon="iconClass" :size="this.$slots.desc ? 'is-medium': 'is-small'"></Icon>
        </slot>
      </span>
      <span class="alert-message">
        <slot></slot>
      </span>
      <span class="alert-desc">
        <slot name="desc"></slot>
      </span>
      <a class="alert-close" v-if="closable" @click="close">
        <slot name="close">
          <Icon icon="fa-times" size="is-small"></Icon>
        </slot>
      </a>
    </div>
  </transition>
</template>

<script>
  import Icon from './icon'

  export default {
    name: 'Alert',
    components: { Icon },
    props: {
      type: {
        validator (v) {
          return ['info', 'success', 'warning', 'error'].indexOf(v) > -1
        },
        default: 'info'
      },
      closable: Boolean,
      icon: Boolean,
      banner: Boolean
    },
    data () {
      return {
        closed: false
      }
    },
    computed: {
      classes () {
        let type = this.type === 'error' ? 'danger' : this.type
        return [
          `is-${type}`,
          {
            'has-icon': this.icon,
            'has-desc': this.$slots.desc,
            'has-banner': this.banner
          }
        ]
      },
      iconClass () {
        return {
          info: 'fa-info-circle',
          success: 'fa-check-circle',
          warning: 'fa-exclamation-circle',
          error: 'fa-times-circle'
        }[this.type]
      }
    },
    methods: {
      close (e) {
        this.closed = true
        this.$emit('close', e)
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '../styles/animations/fade';

  .alert {
    position: relative;
    padding: 0.5rem 3rem 0.5rem 1rem;
    border-radius: $radius-large;
    text-align: justify;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    @each $name, $pair in $colors {
      $color: nth($pair, 1);
      // $color-invert: nth($pair, 2);
      &.is-#{$name} {
        background-color: rgba($color, 0.7);
        // color: $color-invert;
        .alert-icon {
          color: desaturate(darken($color, 10%), 20%);
        }
      }
    }

    &-icon {
      position: absolute;
      top: 0.5rem;
      left: 1rem;
    }

    &-message {
      font-size: 0.75em;
    }

    &-desc {
      display: none;
    }

    &-close {
      position: absolute;
      right: 0.5em;
      top: 1em;
      cursor: pointer;
      color: $grey-light;
      font-size: 0.75rem;
    }

    &.has-banner {
      border-radius: 0;
    }

    &.has-desc {
      padding: 1rem;

      .alert-message {
        display: block;
        font-size: 0.875em;
      }

      .alert-desc {
        display: block;
        font-size: 0.75em;
      }
    }

    &.has-icon {
      padding-left: 2.5rem;

      &.has-desc {
        padding-left: 4rem;

        .alert-icon {
          top: 1rem;
        }
      }
    }
  }
</style>
