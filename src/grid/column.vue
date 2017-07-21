<template>
  <div class="column">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Column'
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/grid/columns';
</style>
