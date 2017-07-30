<template>
  <div class="control" :class="{ 'has-icons-left': iconLeft, 'has-icons-right': iconRight }">
    <input class="input" :class="inputClass" :type="type" :placeholder="placeholder" :disabled="disabled">
    <span class="icon is-left" :class="iconClass" v-if="iconLeft">
      <i class="fa" :class="iconLeft"></i>
    </span>
    <span class="icon is-right" :class="iconClass" v-if="iconRight">
      <i class="fa" :class="iconRight"></i>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'Input',

    props: {
      type: {
        type: String,
        default: 'text',
        validator (v) {
          return ['text', 'password', 'email', 'tel'].indexOf(v) !== -1
        }
      },
      placeholder: String,
      disabled: Boolean,
      inputClass: String,
      iconLeft: String,
      iconRight: String,
      iconClass: String
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/elements/form';
</style>
