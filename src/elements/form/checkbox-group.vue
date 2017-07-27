<template>
  <div class="control checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'CheckboxGroup',

    props: {
      value: Array,
      min: Number,
      max: Number
    },

    watch: {
      value (value) {
        // TODO
      }
    }
  }
</script>
