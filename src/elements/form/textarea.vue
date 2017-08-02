<template>
  <div class="control">
    <textarea class="textarea" :class="textareaClass" :placeholder="placeholder" :disabled="disabled"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'Textarea',

    props: {
      placeholder: String,
      disabled: Boolean,
      textareaClass: String
    }
  }
</script>
