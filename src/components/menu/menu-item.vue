<template>
  <li class="menu-item" :class="classes" @click="handleClick">
    <slot></slot>
  </li>
</template>

<script>
  import Emit from '../../utils/emit.js'

  export default {
    name: 'MenuItem',

    mixins: [{ methods: Emit }],

    props: {
      name: [String, Number],
      disabled: Boolean
    },

    data () {
      return {
        active: false
      }
    },

    computed: {
      classes () {
        return {
          active: this.active,
          disabled: this.disabled
        }
      }
    },

    methods: {
      handleClick () {
        if (this.disabled) return

        const emitted = this.emitUp('Submenu', 'selected', this.name)
        if (!emitted) this.emitUp('Menu', 'selected', this.name)
      }
    },

    mounted () {
      this.$on('updated', name => {
        console.log('activeName', name, ', this.name', this.name)
        if (this.name === name) {
          this.active = true
          this.emitUp('Submenu', 'updated', true)
        } else {
          this.active = false
        }
      })
    }
  }
</script>
