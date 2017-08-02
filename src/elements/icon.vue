<template>
  <span class="icon" :class="size">
    <i class="fa" :class="icon"></i>
  </span>
</template>

<script>
  export default {
    name: 'Icon',

    props: {
      icon: {
        type: String,
        required: true
      },
      size: String
    }
  }
</script>
