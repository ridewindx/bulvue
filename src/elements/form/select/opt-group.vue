<template>
  <li class="opt-group" v-show="visible">
    <div class="opt-group-label">{{ label }}</div>
    <ul class="opt-group-options">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'OptGroup',

    props: {
      label: String
    },

    data () {
      return {
        visible: true
      }
    }
  }
</script>
