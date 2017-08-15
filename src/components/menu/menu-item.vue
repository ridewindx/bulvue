<template>
  <li class="menu-item" :class="classes" :style="styles" @click="handleClick">
    <slot></slot>
  </li>
</template>

<script>
  import { findParentComponent } from '../../utils/find'
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
        active: false,
        inlineLevel: -1
      }
    },

    computed: {
      classes () {
        return {
          active: this.active,
          disabled: this.disabled
        }
      },

      styles () {
        if (this.inlineLevel >= 0) {
          return {
            'padding-left': (this.inlineLevel * 1.5 + 1.5) + 'rem'
          }
        }
      }
    },

    methods: {
      handleClick () {
        if (this.disabled) return

        const emitted = this.emitUp('Submenu', 'selected', this.name)
        if (!emitted) this.emitUp('Menu', 'selected', this.name)
      },

      getInlineLevel () {
        let submenu = findParentComponent(this, 'Submenu')
        if (submenu) this.inlineLevel = submenu.inlineLevel
      }
    },

    mounted () {
      this.$on('updated', name => {
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
