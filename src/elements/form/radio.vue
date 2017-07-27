<template>
  <label class="radio"
         :class="{
                   'is-disabled': isDisabled,
                   'is-checked': checked === value
                 }">

    <input
           type="radio" :name="name" :value="value" :disabled="isDisabled"
           @change="$emit('change', $event.target.value)">

    <span></span>

    <slot></slot>
    <template v-if="!$slots.default">{{value}}</template>

  </label>
</template>

<script>
  export default {
    name: 'Radio',

    model: {
      prop: 'checked',
      event: 'change'
    },

    props: {
      checked: String,
      value: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      disabled: Boolean
    },

    computed: {
      isDisabled () {
        return this.disabled
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/elements/form.sass';

  label.radio {
    user-select: none;

    input {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
    }

    & > span {
      position: relative;
      display: inline-block;
      width: 1.125em;
      height: 1.125em;
      box-sizing: border-box;
      border-radius: 50%;
      border: 1px solid $grey-light;
      vertical-align: text-bottom;

      &:hover {
        border-color: $blue;
      }

      &:after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0.375em;
        height: 0.375em;
        border-radius: 50%;
        background-color: $white;

        transform: translate(-50%, -50%) scale(0);
      }
    }

    &.is-checked > span {
      border-color: $blue;
      background-color: $blue;
      &:after {
        transform: translate(-50%, -50%) scale(1);
        transition: transform 0.15s cubic-bezier(.71,-.46,.88,.6);
      }
    }

    &.is-disabled {
      color: $grey-light;
      cursor: not-allowed;

      & > span {
        border-color: $grey-light;
        background-color: $grey-lighter;
      }

      &.is-checked > span {
        border-color: $grey-light;
        background-color: $grey-light;
      }
    }
  }
</style>
