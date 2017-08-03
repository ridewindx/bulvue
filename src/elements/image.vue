<template>
  <figure class="image" :class="[size]">
    <img :src="src" :alt="alt">
  </figure>
</template>

<script>
  export default {
    name: 'Img',

    props: {
      size: String,
      src: String,
      alt: String
    }
  }
</script>
