<template>
  <li class="menu-item" :class="classes" @click.stop="handleClick">
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'MenuItem',

    props: {
      key: [String, Number],
      disabled: Boolean,
    },

    data () {
      return {
        active: false
      }
    },

    computed: {
      classes () {
        return {
          'menu-item-active': this.active,
          'menu-item-disabled': this.disabled
        }
      }
    },

    methods: {

    }
  }
</script>
