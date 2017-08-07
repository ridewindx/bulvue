<template>
  <li class="opt-group">
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
    }
  }
</script>
