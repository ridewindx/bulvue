<template>
  <li class="menu-item-group">
    <div class="menu-item-group-title">{{ title }}</div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'MenuItemGroup',

    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script>
