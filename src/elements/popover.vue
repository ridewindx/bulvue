<template>
  <div class="popover" :class="{ 'popover-confirm': confirm }"
       @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
       v-click-outside="handleClose">

    <div class="popover-rel" ref="reference"
         @click="handleClick" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
      <slot></slot>
    </div>

    <transition name="fade">
      <div class="popover-popper" :style="{ width: width }" ref="popper"
           v-show="visible"
           @mouseenter="handleMouseEnter"
           @mouseleave="handleMouseLeave">

        <div class="popover-arrow"></div>

        <div class="popover-inner">

          <template v-if="!confirm">
            <div class="popover-title" v-if="$slots.title || title" ref="title">
              <slot name="title">
                <div class="popover-title-message">{{ title }}</div>
              </slot>
            </div>
            <div class="popover-content">
              <slot name="content">
                <div class="popover-content-message">{{ content }}</div>
              </slot>
            </div>
          </template>

          <template v-else>
            <div class="popover-confirm-content">
              <Icon icon="fa-exclamation-circle" size="is-small"></Icon>
              <span><slot name="title">{{ title }}</slot></span>
            </div>
            <div class="popover-confirm-button">
              <Button class="is-small" @click="cancel">{{ cancelText }}</Button>
              <Button class="is-primary is-small" @click="ok">{{ okText }}</Button>
            </div>
          </template>

        </div>


      </div>
    </transition>

  </div>
</template>

<script>
  import Icon from './icon'
  import Button from './button'
  import Popper from '../utils/popper'
  import ClickOutside from '../utils/click-outside'

  export default {
    name: 'Popover',

    mixins: [ Popper ],

    directives: { ClickOutside },

    components: { Button, Icon },

    props: {
      trigger: {
        validator (v) {
          return ['click', 'focus', 'hover'].indexOf(v) > -1
        },
        default: 'click'
      },
      placement: {
        validator (v) {
          return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].indexOf(v) > -1
        },
        default: 'top'
      },
      title: String,
      content: String,
      width: String,
      confirm: {
        type: Boolean,
        default: false
      },
      okText: {
        type: String,
        default: 'Yes'
      },
      cancelText: {
        type: String,
        default: 'No'
      }
    },

    data () {
      return {
        visible: false
      }
    },

    methods: {
      handleClick () {
        if (this.trigger === 'click') this.visible = !this.visible
      },

      handleClose () {
        if (this.trigger === 'click') this.visible = false
      },

      handleFocus () {
        if (this.trigger === 'focus') this.visible = true
      },

      handleBlur () {
        if (this.trigger === 'focus') this.visible = false
      },

      handleMouseDown () {
        if (this.trigger === 'focus' && !this.inputChild) this.visible = true
      },

      handleMouseUp () {
        if (this.trigger === 'focus' && !this.inputChild) this.visible = false
      },

      handleMouseEnter () {
        if (this.trigger !== 'hover' || this.confirm) {
          return
        }
        clearTimeout(this.hoverTimer)
        this.hoverTimer = setTimeout(() => { this.visible = true }, 100)
      },

      handleMouseLeave () {
        if (this.trigger !== 'hover' || this.confirm) {
          return false
        }
        clearTimeout(this.hoverTimer)
        this.hoverTimer = setTimeout(() => { this.visible = false }, 100)
      },

      ok () {
        this.visible = false
        this.$emit('ok')
      },

      cancel () {
        this.visible = false
        this.$emit('cancel')
      }
    },

    computed: {
      inputChild () {
        let children = this.$refs.reference.querySelectorAll('input, textarea')
        if (children.length) return children[0]
      }
    },

    mounted () {
      if (this.confirm) this.trigger = 'click'

      if (this.trigger === 'focus') {
        this.$children[0].$el.addEventListener('focus', () => this.handleFocus(), false)
        this.$children[0].$el.addEventListener('blur', () => this.handleBlur(), false)
      }

      if (this.inputChild) {
        this.trigger = 'focus'

        this.inputChild.addEventListener('focus', () => this.handleFocus(), false)
        this.inputChild.addEventListener('blur', () => this.handleBlur(), false)
      }
    },

    beforeDestroy () {
      if (this.trigger === 'focus') {
        this.$children[0].$el.removeEventListener('focus', () => this.handleFocus(), false)
        this.$children[0].$el.removeEventListener('blur', () => this.handleBlur(), false)
      }

      if (this.inputChild) {
        this.inputChild.removeEventListener('focus', () => this.handleFocus(), false)
        this.inputChild.removeEventListener('blur', () => this.handleBlur(), false)
      }
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/elements/icon";
  @import "../styles/variables";
  @import "../styles/popper";

  $popover-arrow-width: 5px;
  $popover-arrow-distance: $popover-arrow-width - 1 + 4;

  .popover {
    display: inline-block;
    text-align: left;

    &-rel {
      display: inline-block;
      position: relative;
    }

    &-popper {
      min-width: 150px;
      font-size: 0.75rem;
      @include popper(".popover-arrow", $popover-arrow-width, $popover-arrow-distance, $white-ter);

      &[x-placement^="top"] .popover-arrow:after {
        content: " ";
        bottom: 1px;
        margin-left: - $popover-arrow-width;
        border-bottom-width: 0;
        border-top-color: #fff;
      }

      &[x-placement^="right"] .popover-arrow:after {
        content: " ";
        left: 1px;
        bottom: - $popover-arrow-width;
        border-left-width: 0;
        border-right-color: #fff;
      }

      &[x-placement^="bottom"] .popover-arrow:after {
        content: " ";
        top: 1px;
        margin-left: - $popover-arrow-width;
        border-top-width: 0;
        border-bottom-color: #fff;
      }

      &[x-placement^="left"] .popover-arrow:after {
        content: " ";
        right: 1px;
        border-right-width: 0;
        border-left-color: #fff;
        bottom: - $popover-arrow-width;
      }
    }

    &-arrow {
      border-width: $popover-arrow-width + 1;

      &:after {
        content: "";
        border-width: $popover-arrow-width;
      }

      &, &:after {
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        border-color: transparent;
        border-style: solid;
      }
    }

    &-inner {
      width: 100%;
      background-color: #fff;
      background-clip: padding-box;
      border-radius: $radius;
      box-shadow: $shadow-down;
      white-space: nowrap;
    }

    &-title {
      margin: 0;
      padding: 0.5rem 1rem;
      position: relative;

      &:after {
        content: '';
        display: block;
        height: 1px;
        position: absolute;
        left: 0.5rem;
        right: 0.5rem;
        bottom: 0;
        background-color: $white-ter;
      }

      &-message {
        font-weight: 500;
        font-size: 0.875rem;
      }
    }

    &-content {
      padding: 8px 16px;
      overflow: auto;

      &-message {
        font-weight: normal;
      }
    }

    &-confirm &-popper {
      max-width: 300px;
    }

    &-confirm-content {
      padding: 1rem 1rem 0.5rem;

      i {
        color: darkorange;
      }

      span {
        vertical-align: middle;
      }
    }

    &-confirm-button {
      text-align: right;
      padding: 0.5rem 1rem 1rem;
      button {
        margin-left: 6px;
        font-weight: 500;
      }
    }
  }
</style>
