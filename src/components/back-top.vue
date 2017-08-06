<template>
  <transition name="fade">
    <div class="back-top" :style="styles" v-show="visible" @click="backTop">
      <Icon icon="fa-angle-up"></Icon>
    </div>
  </transition>
</template>

<script>
  import Icon from '../elements/icon'
  import scrollTop from '../utils/scroll-top'

  export default {
    name: 'BackTop',

    components: { Icon },

    props: {
      scrollHeight: {
        type: Number,
        default: 400
      },
      bottom: {
        type: Number,
        default: 30
      },
      right: {
        type: Number,
        default: 30
      },
      duration: {  // seconds
        type: Number,
        default: 1
      }
    },

    data () {
      return {
        visible: false
      }
    },

    computed: {
      styles () {
        return {
          bottom: `${this.bottom}px`,
          right: `${this.right}px`
        }
      }
    },

    methods: {
      backTop () {
        scrollTop(window, document.body.scrollTop, 0, this.duration * 1000)
        this.$emit('click')
      },

      handleScroll () {
        this.visible = window.pageYOffset >= this.scrollHeight
      }
    },

    mounted () {
      window.addEventListener('scroll', this.handleScroll, false)
      window.addEventListener('resize', this.handleScroll, false)
    },

    beforeDestroy () {
      window.removeEventListener('scroll', this.handleScroll, false)
      window.removeEventListener('resize', this.handleScroll, false)
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "../styles/variables";
  @import "../styles/animations/fade";

  .back-top {
    position: fixed;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    z-index: 10;

    background-color: rgba($grey, .6);
    border-radius: $radius;
    box-shadow: $shadow-down;

    &:hover {
      background-color: rgba($grey, .7);
    }

    .icon {
      vertical-align: text-bottom;

      .fa {
        color: $white;
        font-size: 2.5rem;
      }
    }
  }
</style>
