<template>
  <ul class="menu" :class="[`menu-${mode}`]">
    <slot></slot>
  </ul>
</template>

<script>
  import { findChildComponents } from '../../utils/find'
  import Emit from '../../utils/emit.js'

  export default {
    name: 'Menu',

    mixins: [{ methods: Emit }],

    props: {
      mode: {
        validator (v) {
          return ['horizontal', 'vertical'].indexOf(v) > -1
        },
        default: 'vertical'
      },
      accordion: Boolean,
      submenuModes: {
        type: Array,
        validator (v) {
          for (const item of v) {
            if (['inline', 'dropdown'].indexOf(item) < 0) return false
          }
          return v.length >= 1
        },
        default () {
          return ['dropdown']
        }
      }
    },

    data () {
      return {
        activeName: '',
        openedNames: []
      }
    },

    watch: {
      activeName () {
        this.broadcastActiveName()
        this.$emit('selected', this.activeName)
      },

      openedNames () {
        this.broadcastOpenedNames()
        this.$emit('opened', this.openedNames)
      }
    },

    methods: {
      broadcastActiveName () {
        this.emitDown('Submenu', 'updated', false)
        this.emitDown('MenuItem', 'updated', this.activeName)
      },

      broadcastOpenedNames () {
        findChildComponents(this, 'Submenu', child => {
          if (this.openedNames.indexOf(child.name) > -1) child.opened = true
        })
      }
    },

    mounted () {
      findChildComponents(this, 'Submenu', child => {
        child.computeInlineLevel()
      })
      findChildComponents(this, 'MenuItemGroup', child => {
        child.getInlineLevel()
      })
      findChildComponents(this, 'MenuItem', child => {
        child.getInlineLevel()
      })

      this.$on('selected', name => {
        this.activeName = name
      })

      this.$on('opened', name => {
        const index = this.openedNames.indexOf(name)
        if (index > -1) {
          this.openedNames.splice(index, 1)
        } else {
          if (this.accordion) this.openedNames = name
          else this.openedNames.push(name)
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/base/_all";
  @import "../../styles/animations/slide";
  @import "../../styles/animations/fade";
  @import "../../styles/variables";

  .menu {
    position: relative;
    display: block;
    font-size: 0.875rem;
    text-align: left;
    cursor: pointer;
    color: $black-ter;
    white-space: nowrap;

    // menu border
    &:after {
      content: '';
      position: absolute;
      display: block;
      background-color: $grey-lighter;
      z-index: -1;
    }

    &-horizontal {
      height: 3.75rem;
      line-height: 3.75rem;

      &:after {
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
      }
    }

    &-vertical {
      &:after {
        width: 1px;
        height: 100%;
        top: 0;
        right: 0;
      }
    }

    // icon spacing
    &-item, &-submenu-title {
      .icon:first-child {
        display: inline-block;
        width: 1.25rem;
      }
    }
  }

  .menu-submenu-dropdown {
    min-width: 100%;
    background-color: $white;
    border-radius: $radius;
    box-shadow: $shadow-down;
    box-sizing: border-box;
    z-index: 10;

    margin: 0.32rem 0;
    padding: 0.32rem 0;

    .menu-item-group .menu-item-group-title {
      padding-left: 0.5rem;
    }

    .menu-item, .menu-submenu-title {
      padding-left: 1.5rem;
    }
  }

  .menu-item-group-title {
    color: $grey-light;
    font-size: 0.75rem;
    cursor: default;
  }

  // item height
  .menu-item-group-title,
  .menu-item,
  .menu-submenu-title {
    height: 2rem;
    line-height: 2rem;
    padding-right: 1rem;
  }

  .menu-vertical {
    .menu-item, .menu-submenu-title {
      height: 2.625rem;
      line-height: 2.625rem;
    }

  }

  // submenu angle-right arrow
  .menu-submenu-title .icon:last-child {
    margin-left: 0.5rem;
    float: right;
  }
  // horizontal menu format and highlight
  .menu-horizontal {
    & > .menu-item, & > .menu-submenu {
      position: relative;
      float: left;
    }

    & > .menu-item,
    & > .menu-submenu > .menu-submenu-title {
      height: 3.75rem;
      line-height: 3.75rem;
      padding: 0 1.25rem;
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease-in-out;
    }

    & > .menu-item:hover,
    & > .menu-item.active,
    & > .menu-submenu > .menu-submenu-title:hover,
    & > .menu-submenu > .menu-submenu-title.active,
    & > .menu-submenu.opened > .menu-submenu-title {
      border-bottom-color: $blue;
    }
  }

  // submenu angle-down arrow rotate
  .menu-submenu.inline,
  .menu-horizontal > .menu-submenu.dropdown {
    > .menu-submenu-title .icon:last-child {
      display: inline-block;
      font-size: 1rem;
      transition: transform 0.2s ease-in-out;
    }

    &.opened > .menu-submenu-title > .icon:last-child {
      transform: rotate(180deg);
    }
  }

  // menu item highlight
  .menu-item, .menu-submenu.dropdown > .menu-submenu-title {
    transition: background 0.2s ease-in-out;

    &:hover:not(.disabled):not(.active) {
      background-color: $white-ter;
    }

    &.disabled {
      color: $grey-light;
      cursor: default;
    }

    &.active {
      color: $white;
      background-color: lighten($blue, 10%);
    }
  }

  .menu-horizontal {
    & > .menu-item, & > .menu-submenu.dropdown > .menu-submenu-title {
      &.active {
        color: $black-ter;
        background-color: transparent;
      }
    }
  }
</style>
