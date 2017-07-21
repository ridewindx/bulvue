<template>
  <button class="button" :autofocus="autofocus" @click="handleClick">
    <span v-if="$slots.default && iconPlacement === 'right'">
      <slot></slot>
    </span>
    <span class="icon" :class="iconSize" v-if="icon">
      <i class="fa" :class="icon"></i>
    </span>
    <span v-if="$slots.default && iconPlacement === 'left'">
      <slot></slot>
    </span>
  </button>
</template>

<script>
  export default {
    name: 'Button',

    props: {
      tag: {
        type: String,
        default: 'a'
      },
      autofocus: Boolean,
      icon: {
        type: String
      },
      iconSize: {
        type: String
      },
      iconPlacement: {
        type: String,
        default: 'left'
      }
    },

    methods: {
      handleClick (event) {
        this.$emit('click', event)
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/elements/button';
</style>
