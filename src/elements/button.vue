<template>
  <button class="button" :autofocus="autofocus" @click="handleClick">
    <span v-if="$slots.default && iconPlacement === 'right'">
      <slot></slot>
    </span>
    <Icon :icon="loadingIcon || icon" v-if="loadingIcon || icon"></Icon>
    <span v-if="$slots.default && iconPlacement === 'left'">
      <slot></slot>
    </span>
  </button>
</template>

<script>
  import Icon from './icon'

  export default {
    name: 'Button',

    components: { Icon },

    props: {
      tag: {
        type: String,
        default: 'a'
      },
      autofocus: Boolean,
      icon: {
        type: String
      },
      iconPlacement: {
        type: String,
        default: 'left'
      },
      loading: Boolean
    },

    data () {
      return {
        loadingIcon: ''
      }
    },

    watch: {
      loading (val) {
        if (val) {
          this.loadingIcon = 'fa-spinner fa-spin'
        } else if (this.loadingIcon) {
          this.loadingIcon = ''
        }
      }
    },

    mounted () {
      if (this.loading) {
        this.loadingIcon = 'fa-spinner fa-spin'
      }
    },

    methods: {
      handleClick (event) {
        this.$emit('click', event)
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/elements/button';

  .button .icon .fa {
    font-size: 1em;
  }
</style>
