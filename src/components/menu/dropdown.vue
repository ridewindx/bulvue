<template>
  <div class="menu-submenu-dropdown">
    <slot></slot>
  </div>
</template>

<script>
  import Popper from '../../utils/popper'

  export default {
    name: 'Dropdown',

    mixins: [ Popper ]
  }
</script>
