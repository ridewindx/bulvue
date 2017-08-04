<template>
  <transition name="move-notification">

    <div class="notification-wrapper" :class="classes">

      <Icon :icon="iconClass" v-if="iconClass"></Icon>
      <div class="notification-title">{{ title }}</div>
      <div class="notification-content" v-if="content">{{ content }}</div>

      <button class="delete is-medium" @click="close" v-if="closable"></button>

    </div>

  </transition>
</template>

<script>
  import Icon from '../../elements/icon'

  const icons = {
    info: 'fa-info-circle',
    success: 'fa-check-circle',
    warning: 'fa-exclamation-circle',
    error: 'fa-times-circle'
  }

  export default {
    components: { Icon },

    props: {
      duration: Number,  // seconds
      type: String,
      title: String,
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
            'is-closable': this.closable,
            'has-content': this.content,
            'has-icon': this.iconClass
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

  @include move-motion(move-notification, moveNotification);

  @keyframes moveNotificationIn {
    0% {
      opacity: 0;
      transform-origin: 0 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform-origin: 0 0;
      transform: translateX(0%);
    }
  }

  @keyframes moveNotificationOut {
    0% {
      transform-origin: 0 0;
      transform: translateX(0%);
      opacity: 1;
    }
    70% {
      transform-origin: 0 0;
      transform: translateX(100%);
      height: auto;
      padding: 1rem;
      margin-bottom: 0.625rem;
      opacity: 0;
    }
    100% {
      transform-origin: 0 0;
      transform: translateX(100%);
      height: 0;
      padding: 0;
      margin-bottom: 0;
      opacity: 0;
    }
  }

  .notification-wrapper {
    position: relative;
    padding: 1rem;
    margin-right: 24px;
    margin-bottom: 0.625rem;
    background-color: $white;
    border-radius: $radius;
    box-shadow: $shadow-down;
    overflow: hidden;

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 0.25rem;
      background-color: $blue;
    }

    .icon {
      position: absolute;
      i {
        font-size: 1rem;
      }
    }

    @each $name, $pair in $colors {
      $color: nth($pair, 1);
      &.is-#{$name} {
        .icon {
          color: darken($color, 10%);
        }

        &:after {
          background-color: $color;
        }
      }
    }

    .notification-title {
      font-size: 0.875rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .notification-content {
      font-size: 0.75rem;
    }

    &.has-content .notification-title {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    &.has-icon .notification-title {
      margin-left: 2rem;
    }

    &.has-content.has-icon {
      .icon {
        left: 1.5rem;
        top: 1.5rem;
        i {
          font-size: 2.5rem;
        }
      }

      .notification-title, .notification-content {
        margin-left: 3rem;
      }
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
</style>
