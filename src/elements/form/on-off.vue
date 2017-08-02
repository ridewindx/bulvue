<template>
  <span class="onoff" :class="classes" @click="toggle">
    <span class="onoff-inner">
      <slot name="open" v-if="value"></slot>
      <slot name="close" v-if="!value"></slot>
    </span>
  </span>
</template>

<script>
  import Emit from '../../utils/emit'

  export default {
    name: 'OnOff',

    mixins: [{methods: Emit}],

    props: {
      value: Boolean,
      disabled: Boolean,
      size: {
        validator (v) {
          return ['large', 'small'].indexOf(v) > -1
        }
      }
    },

    computed: {
      classes () {
        return {
          'is-checked': this.value,
          'is-disabled': this.disabled,
          [`is-${this.size}`]: this.size
        }
      }
    },

    methods: {
      toggle () {
        if (this.disabled) return false

        this.value = !this.value
        this.$emit('input', this.value)
        this.$emit('change', this.value)
        this.emitUp('Form', 'formchange', this.value)
      }
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";

  .onoff {
    display: inline-block;
    width: 48px;
    height: 24px;
    line-height: 22px;
    border-radius: 24px;
    vertical-align: middle;
    border: 1px solid #ccc;
    background-color: #ccc;
    position: relative;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease-in-out;

    &-inner {
      color: #fff;
      font-size: 0.75rem;
      position: absolute;
      left: 25px;

      i {
        width: 0.75rem;
        height: 0.75rem;
        text-align: center;
      }
    }

    &:after {
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background-color: #fff;
      position: absolute;
      left: 1px;
      top: 1px;
      cursor: pointer;
      transition: left 0.2s ease-in-out, width 0.2s ease-in-out;
    }

    &:active:after {
      width: 26px;
    }

    &:focus {
      box-shadow: 0 0 0 2px transparentize($info, 0.2);
      outline: 0;
    }

    &:focus:hover {
      box-shadow: none;
    }

    &.is-small {
      width: 24px;
      height: 12px;
      line-height: 10px;
      &:after {
        width: 10px;
        height: 10px;
        top: 0;
        left: 0;
      }
      &:active:after {
        width: 14px;
      }
    }

    &.is-small.is-checked:after {
      left: 12px;
    }

    &.is-small:active.is-checked:after {
      left: 8px;
    }

    &.is-large {
      width: 60px;
      &:active:after {
        width: 26px;
      }
    }

    &.is-large:active:after {
      width: 32px;
    }

    &.is-large.is-checked:after {
      left: 37px;
    }

    &.is-large:active.is-checked:after {
      left: 25px;
    }

    &.is-checked {
      border-color: $info;
      background-color: $info;

      .onoff-inner {
        left: 8px;
      }

      &:after {
        left: 25px;
      }

      &:active:after {
        left: 19px;
      }
    }

    &.is-disabled {
      cursor: not-allowed;
      background: #f3f3f3;
      border-color: #f3f3f3;

      &:after {
        background: #ccc;
        cursor: not-allowed;
      }

      .onoff-inner {
        color: #ccc;
      }
    }
  }
</style>
