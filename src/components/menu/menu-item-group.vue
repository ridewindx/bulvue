<template>
  <li class="menu-item-group">
    <div class="menu-item-group-title" :style="titleStyles">{{ title }}</div>
    <ul><slot></slot></ul>
  </li>
</template>

<script>
  import { findParentComponent } from '../../utils/find'

  export default {
    name: 'MenuItemGroup',

    props: {
      title: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        inlineLevel: -1
      }
    },

    computed: {
      titleStyles () {
        if (this.inlineLevel >= 0) {
          return {
            'padding-left': (this.inlineLevel * 1.5 + 0.5) + 'rem'
          }
        }
      }
    },

    methods: {
      getInlineLevel () {
        let submenu = findParentComponent(this, 'Submenu')
        if (submenu) this.inlineLevel = submenu.inlineLevel
      }
    }
  }
</script>
