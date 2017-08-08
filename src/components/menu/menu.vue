<template>
  <ul class="menu" :class="[`menu-${mode}`]">
    <slot></slot>
  </ul>
</template>

<script>

  export default {
    name: 'Menu',

    props: {
      mode: {
        validator (v) {
          return ['horizontal', 'vertical'].indexOf(v) > -1
        },
        default: 'vertical'
      },
    }
  }
</script>
