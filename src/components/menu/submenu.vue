<template>
  <li class="menu-submenu" :class="classes"
      @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">

    <div class="menu-submenu-title" ref="reference" @click="handleClick">
      <slot name="title"></slot>
      <Icon icon="fa-angle-down"></Icon>
    </div>

    <CollapseTransition v-if="mode === 'vertical'">
      <ul v-show="opened"><slot></slot></ul>
    </CollapseTransition>

    <transition name="slide-up" v-else>
      <Dropdown v-show="opened">
        <ul><slot></slot></ul>
      </Dropdown>
    </transition>

  </li>
</template>

<script>
  import Emit from '../../utils/emit.js'
  import Icon from '../../elements/icon'
  import CollapseTransition from '../../utils/collapse-transition'
  import Dropdown from './dropdown'

  export default {
    name: 'Submenu',

    mixins: [{ methods: Emit }],

    components: { Icon, CollapseTransition, Dropdown },

    props: {
      name: [String, Number],
      disabled: Boolean
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

      mode () {
        return this.$parent.mode
      }
    },

    methods: {
      handleMouseenter () {
        if (this.disabled) return
        if (this.mode === 'vertical') return

        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.opened = true
        }, 250)
      },

      handleMouseleave () {
        if (this.disabled) return
        if (this.mode === 'vertical') return

        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.opened = false
        }, 150)
      },

      handleClick () {
        if (this.disabled) return
        if (this.mode === 'horizontal') return

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

      this.$on('selected', name => {
        if (this.mode === 'horizontal') this.opened = false
        this.emitUp('Menu', 'selected', name)
      })

      this.$on('updated', active => {
        console.log('active', active)
        this.active = active
      })
    }
  }

</script>
