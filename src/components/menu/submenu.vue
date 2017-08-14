<template>
  <li class="menu-submenu" :class="classes"
      @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">

    <div class="menu-submenu-title" ref="reference" @click="handleClick">
      <slot name="title"></slot>
      <Icon icon="fa-angle-down"></Icon>
    </div>

    <CollapseTransition v-if="renderMode === 'inline'">
      <ul v-show="opened"><slot></slot></ul>
    </CollapseTransition>

    <transition name="slide-up" v-else>
      <div class="menu-submenu-dropdown" ref="popper" v-show="opened">
        <ul><slot></slot></ul>
      </div>
    </transition>

  </li>
</template>

<script>
  import Emit from '../../utils/emit.js'
  import Icon from '../../elements/icon'
  import CollapseTransition from '../../utils/collapse-transition'
  import Popper from '../../utils/popper'

  export default {
    name: 'Submenu',

    mixins: [ { methods: Emit }, Popper ],

    components: { Icon, CollapseTransition },

    props: {
      name: [String, Number],
      disabled: Boolean,
      mode: {
        type: String,
        validator (v) {
          return ['inline', 'dropdown'].indexOf(v) > -1
        },
        default: 'dropdown'
      }
    },

    data () {
      return {
        opened: false,
        accordion: false,
        active: false
      }
    },

    computed: {
      classes () {
        return {
          opened: this.opened,
          active: this.active
        }
      },

      renderMode () {
        if (this.$parent.$options.name === 'Menu') {
          if (this.$parent.mode === 'horizontal') return 'dropdown'
          return 'inline'
        } else {
          return this.mode
        }
      }
    },

    watch: {
      opened (val) {
        this.visible = val
      }
    },

    methods: {
      handleMouseenter () {
        if (this.disabled) return
        if (this.renderMode === 'inline') return

        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.opened = true
        }, 250)
      },

      handleMouseleave () {
        if (this.disabled) return
        if (this.renderMode === 'inline') return

        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.opened = false
        }, 150)
      },

      handleClick () {
        if (this.disabled) return
        if (this.renderMode === 'dropdown') return

        if (this.accordion) {
          this.$parent.$children.forEach(item => {
            if (item.$options.name === 'Submenu' && item !== this) {
              item.opened = false
            }
          })
        }

        this.opened = !this.opened
      }
    },

    mounted () {
      this.accordion = this.$parent.accordion

      if (this.$parent.$options.name === 'Menu') this.placement = 'bottom'
      else this.placement = 'right-start'

      this.$on('selected', name => {
        if (this.renderMode === 'dropdown') this.opened = false
        this.emitUp('Menu', 'selected', name)
      })

      this.$on('updated', active => {
        console.log('active', active)
        this.active = active
      })
    }
  }
</script>
