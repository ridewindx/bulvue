<script>
  export default {
    name: 'Container',

    props: {
      tag: {
        type: String,
        default: 'div'
      }
    },

    render (h) {
      return h(
        this.tag,
        {
          class: 'container'
        },
        this.$slots.default
      )
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/elements/other';
</style>
