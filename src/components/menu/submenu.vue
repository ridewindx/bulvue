<template>
  <li class="menu-submenu" :class="classes"
      @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">

    <div class="menu-submenu-title" :class="titleClasses" :style="titleStyles"
         ref="reference" @click="handleClick">
      <slot name="title"></slot>
      <Icon :icon="angleDirection"></Icon>
    </div>

    <CollapseTransition v-if="renderMode === 'inline'">
      <ul class="menu-submenu-inline" v-show="opened"><slot></slot></ul>
    </CollapseTransition>

    <transition name="slide-up" v-else>
      <Dropdown ref="popper" v-show="opened" :placement="placement" :value="opened"
                :reference="$refs.reference" :popper="$refs.popper">
        <ul><slot></slot></ul>
      </Dropdown>
    </transition>

  </li>
</template>

<script>
  import { findParentComponent } from '../../utils/find'
  import Emit from '../../utils/emit.js'
  import Icon from '../../elements/icon'
  import CollapseTransition from '../../utils/collapse-transition'
  import Dropdown from './dropdown'

  export default {
    name: 'Submenu',

    mixins: [ { methods: Emit } ],

    components: { Icon, CollapseTransition, Dropdown },

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
        active: false,
        angleDirection: 'fa-angle-down',
        placement: 'bottom',
        inlineLevel: -1
      }
    },

    computed: {
      classes () {
        return {
          inline: this.renderMode === 'inline',
          dropdown: this.renderMode === 'dropdown',
          opened: this.opened
        }
      },

      titleClasses () {
        return {
          active: this.active
        }
      },

      titleStyles () {
        if (this.inlineLevel > 0) {
          return {
            'padding-left': this.inlineLevel * 1.5 + 'rem'
          }
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
      },

      computeInlineLevel () {
        this.inlineLevel = -1
        if (this.renderMode !== 'inline') {
          this.$nextTick(() => {
            this.inlineLevel = this.$parent.inlineLevel + 1
          })
          return
        }

        let submenu = this
        while (submenu) {
          // if (submenu.renderMode !== 'inline') break
          ++this.inlineLevel
          if (submenu.renderMode === 'dropdown') break
          submenu = findParentComponent(submenu, 'Submenu')
        }
      }
    },

    mounted () {
      this.accordion = this.$parent.accordion

      if (this.$parent.$options.name !== 'Menu' && this.renderMode === 'dropdown') {
        this.placement = 'right-start'
        this.angleDirection = 'fa-angle-right'
      }

      this.$on('selected', name => {
        if (this.renderMode === 'dropdown') this.opened = false

        const emitted = this.emitUp('Submenu', 'selected', name)
        if (!emitted) this.emitUp('Menu', 'selected', name)
      })

      this.$on('updated', active => {
        this.active = active
        this.emitUp('Submenu', 'updated', active)
      })
    }
  }
</script>
