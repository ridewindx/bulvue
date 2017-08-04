<template>
  <transition name="move-up">

    <div class="message-wrapper">
      <div class="message-inner" :class="classes">

        <Icon :icon="iconClass" size="is-small"></Icon>
        <span class="message-content">{{ content }}</span>

        <button class="delete is-medium" @click="close" v-if="closable"></button>

      </div>
    </div>

  </transition>
</template>

<script>
  import Icon from '../../elements/icon'

  const icons = {
    info: 'fa-info-circle',
    success: 'fa-check-circle',
    warning: 'fa-exclamation-circle',
    error: 'fa-times-circle',
    loading: 'fa-spinner fa-spin'
  }

  export default {
    components: { Icon },

    props: {
      duration: Number,  // seconds
      type: String,
      content: String,
      closable: Boolean,
      name: String,
      onClose: Function,
      icon: String
    },

    computed: {
      classes () {
        let type = this.type === 'error' ? 'danger' : this.type
        return [
          `is-${type}`,
          {
            'is-closable': this.closable
          }
        ]
      },
      iconClass () {
        if (this.icon) return this.icon
        return icons[this.type]
      }
    },

    methods: {
      clearCloseTimer () {
        if (this.closeTimer) {
          clearTimeout(this.closeTimer)
          this.closeTimer = null
        }
      },

      close () {
        this.clearCloseTimer()
        if (this.onClose) this.onClose()
        this.$emit('close', this.name)
      }
    },

    mounted () {
      if (this.duration !== 0) {
        this.closeTimer = setTimeout(() => this.close(), this.duration * 1000)
      }
    },

    beforeDestroy () {
      this.clearCloseTimer()
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import "../../styles/animations/move";
  @import "../../styles/variables";

  .message-wrapper {
    position: absolute;
    left: 50%;

    .message-inner {
      position: relative;
      right: 50%;
      padding: 0.5rem 1rem 0.5rem 1rem;
      font-size: 0.75rem;
      background-color: $white;
      border-radius: $radius;
      box-shadow: $shadow-down;

      &.is-closable {
        padding-right: 3rem;
      }

      @each $name, $pair in $colors {
        $color: nth($pair, 1);
        &.is-#{$name} {
          .icon {
            color: darken($color, 10%);
          }
        }
      }

      &.is-loading {
        .icon {
          color: $blue;
        }
      }

      span.message-content {
        margin-left: 0.5rem;
      }

      .delete {
        position: absolute;
        top: 5px;
        right: 0.5em;

        &, &:hover, &:focus, &:active {
          background-color: $white;
        }

        &:before {
          height: 1px;
        }
        &:after {
          width: 1px;
        }

        &:before, &:after {
          background-color: $grey-light;
        }
      }
    }
  }
</style>
