<template>
  <div class="columns">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Columns'
  }
</script>


<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/grid/columns';
</style>
