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
        console.log('activeName', this.activeName)
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
  @import "../../styles/variables";

  .menu {
    position: relative;
    display: block;
    font-size: 0.875rem;
    text-align: left;

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

    &-item, &-submenu-title {
      .icon:first-child {
        margin-right: 0.375rem;
      }
    }

    &-horizontal {
      & > .menu-item, & > .menu-submenu {
        position: relative;
        float: left;
        cursor: pointer;
      }

      & > .menu-item,
      & > .menu-submenu .menu-submenu-title {
        height: 3.75rem;
        padding: 0 1.25rem;
        border-bottom: 2px solid transparent;
        transition: all 0.2s ease-in-out;
      }

      & > .menu-item:hover,
      & > .menu-item.active,
      & > .menu-submenu .menu-submenu-title:hover,
      & > .menu-submenu.active .menu-submenu-title,
      & > .menu-submenu.opened .menu-submenu-title {
        border-bottom-color: $blue;
      }
    }

    &-submenu {
      position: relative;

      &-title .icon:last-child {
        display: inline-block;
        font-size: 1rem;
        transition: transform 0.2s ease-in-out;
      }

      &.opened &-title .icon:last-child {
        transform: rotate(180deg);
      }
    }

    &-item-group {
      &-title {
        height: 2rem;
        line-height: 2rem;
        padding-left: 0.5rem;
        color: $grey-light;
        font-size: 0.75rem;
        cursor: default;
      }
    }

    &-horizontal &-submenu &-item {
      height: 2rem;
      line-height: 2rem;
      padding: 0 1rem;
      color: $black-ter;
      white-space: nowrap;
      cursor: pointer;
      transition: background 0.2s ease-in-out;

      &:hover:not(.disabled) {
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

    &-vertical {
      > li {
        padding-left: 1.5rem;
      }

      ul {
        li {
          &.menu-item {
            padding-left: 1.5rem;
          }
          &.menu-item-group {
            padding-left: 0.5rem;
          }
        }
      }

      & .menu-item,
      & .menu-submenu .menu-submenu-title {
        height: 2.625rem;
        line-height: 2.625rem;
        cursor: pointer;
      }

      & .menu-item {
        border-right: 2px solid transparent;
        transition: all 0.2s ease-in-out;

        &:hover, &.active {
          color: $blue;
          border-right-color: $blue;
        }
      }

      .menu-submenu-title .icon:last-child {
        float: right;
        margin-right: 1rem;
      }
    }

    /*&-vertical &-item {
      height: 2rem;
      line-height: 2rem;
      position: relative;
      display: block;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }*/

    &-submenu-dropdown {
      position: absolute;
      z-index: 10;
      width: 100%;
      overflow: hidden;
      margin: 0.32rem 0;
      padding: 0.32rem 0;
      background-color: $white;
      box-sizing: border-box;
      border-radius: $radius;
      box-shadow: $shadow-down;
    }
  }
</style>
