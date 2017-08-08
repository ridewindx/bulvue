<template>
  <div class="select-dropdown" :style="{ width: width }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Dropdown',

    props: {
      width: String
    }
  }
</script>
