<template>
  <div class="carousel-item"
       v-show="ready"
       :class="{
         'is-active': active,
         'carousel-item-card': $parent.type === 'card',
         'is-in-stage': inStage,
         'is-hover': hover
       }"
       @click="handleItemClick"
       :style="{ transform: `translateX(${ translate }px) scale(${ scale })` }">

    <div class="carousel-mask"
         v-if="$parent.type === 'card'"
         v-show="!active">
    </div>

    <slot><!-- content --></slot>

  </div>
</template>

<script>
  const CARD_SCALE = 0.83

  export default {
    name: 'CarouselItem',

    props: {
      name: String,
      label: {
        type: [String, Number],
        default: ''
      }
    },

    data () {
      return {
        hover: false,
        translate: 0,
        scale: 1,
        active: false,
        ready: false,
        inStage: false
      }
    },

    methods: {
      processIndex (index, activeIndex, length) {
        if (activeIndex === 0 && index === length - 1) {
          return -1
        } else if (activeIndex === length - 1 && index === 0) {
          return length
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
          return length + 1
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
          return -2
        }
        return index
      },

      calculateTranslate (index, activeIndex, parentWidth) {
        if (this.inStage) {
          return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4
        } else if (index < activeIndex) {
          return -(1 + CARD_SCALE) * parentWidth / 4
        } else {
          return (3 + CARD_SCALE) * parentWidth / 4
        }
      },

      translateItem (index, activeIndex) {
        const parentWidth = this.$parent.$el.offsetWidth
        const length = this.$parent.items.length
        if (index !== activeIndex && length > 2) {
          index = this.processIndex(index, activeIndex, length)
        }
        if (this.$parent.type === 'card') {
          this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1
          this.active = index === activeIndex
          this.translate = this.calculateTranslate(index, activeIndex, parentWidth)
          this.scale = this.active ? 1 : CARD_SCALE
        } else {
          this.active = index === activeIndex
          this.translate = parentWidth * (index - activeIndex)
        }
        this.ready = true
        console.log('carousel-item', this.ready)
      },

      handleItemClick () {
        const parent = this.$parent
        if (parent && parent.type === 'card') {
          const index = parent.items.indexOf(this)
          parent.setActiveItem(index)
        }
      }
    },

    create () {
      this.$parent && this.$parent.updateItems()
    },

    destroyed () {
      this.$parent && this.$parent.updateItems()
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';

  .carousel-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    transition: .4s ease-in-out;
    overflow: hidden;
    z-index: 0;
    &.is-active {
      z-index: 2;
    }
  }

  .carousel-item-card {
    width: 50%;
    &.is-in-stage {
      cursor: pointer;
      z-index: 1;
      &:hover .carousel-mask,
      &.is-hover .carousel-mask {
        opacity: 0.12;
      }
    }
    &.is-active {
      z-index: 2;
    }
  }

  .carousel-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $white;
    opacity: 0.24;
    transition: .2s;
  }
</style>
