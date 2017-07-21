<template>
  <div class="carousel"
       :class="{ 'carousel-card': type === 'card' }"
       @mouseenter.stop="handleMouseEnter"
       @mouseleave.stop="handleMouseLeave">

    <div class="carousel-container" :style="{ height: height }">

      <transition name="carousel-arrow-left">
        <button class="carousel-arrow carousel-arrow-left"
                v-if="arrow !== 'never'"
                v-show="arrow === 'always' || hover"
                @mouseenter="handleButtonEnter('left')"
                @mouseleave="handleButtonLeave"
                @click.stop="throttledArrowClick(activeIndex - 1)">
          <i class="fa fa-chevron-left fa-lg fa-fw"></i>
        </button>
      </transition>

      <transition name="carousel-arrow-right">
        <button class="carousel-arrow carousel-arrow-right"
                v-if="arrow !== 'never'"
                v-show="arrow === 'always' || hover"
                @mouseenter="handleButtonEnter('right')"
                @mouseleave="handleButtonLeave"
                @click.stop="throttledArrowClick(activeIndex + 1)">
          <i class="fa fa-chevron-right fa-lg fa-fw"></i>
        </button>
      </transition>

      <slot><!-- carousel items --></slot>

    </div>

    <ul class="carousel-indicators"
        v-if="indicatorPosition !== 'none'"
        :class="{ 'carousel-indicators-labels': hasLabel,
                  'carousel-indicators-outside': indicatorPosition === 'outside' || type === 'card'
                }">

      <li class="carousel-indicator"
        v-for="(item, index) in items"
        :class="{ 'is-active': index === activeIndex }"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">

        <button class="carousel-button">
          <span v-if="hasLabel">{{ item.label }}</span>
        </button>

      </li>

    </ul>

  </div>
</template>

<script>
  import throttle from 'throttle-debounce/throttle'
  import { addResizeListener, removeResizeListener } from '../utils/resize-event'

  export default {
    name: 'Carousel',

    props: {
      height: String,
      initialIndex: {
        type: Number,
        default: 0
      },
      trigger: {
        type: String,
        default: 'hover'
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      },
      indicator: {
        type: Boolean,
        default: true
      },
      indicatorPosition: String,
      arrow: {
        type: String,
        default: 'hover'
      },
      type: String
    },

    data () {
      return {
        items: [],
        activeIndex: -1,
        containerWidth: 0,
        timer: null,
        hover: false
      }
    },

    computed: {
      hasLabel () {
        return this.items.some(item => item.label.toString().length > 0)
      }
    },

    watch: {
      items (val) {
        if (val.length > 0) this.setActiveItem(this.initialIndex)
      },

      activeIndex (val, oldVal) {
        this.resetItemPosition()
        this.$emit('change', val, oldVal)
      },

      autoplay (val) {
        val ? this.startTimer() : this.pauseTimer()
      }
    },

    methods: {
      handleMouseEnter () {
        this.hover = true
        this.pauseTimer()
      },

      handleMouseLeave () {
        this.hover = false
        this.startTimer()
      },

      itemInStage (item, index) {
        const length = this.items.length
        if (index === length - 1 && item.inStage && this.items[0].active ||
          (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
          return 'left'
        } else if (index === 0 && item.inStage && this.items[length - 1].active ||
          (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
          return 'right'
        }
        return false
      },

      handleButtonEnter (arrow) {
        this.items.forEach((item, index) => {
          if (arrow === this.itemInStage(item, index)) {
            item.hover = true
          }
        })
      },

      handleButtonLeave () {
        this.items.forEach(item => {
          item.hover = false
        })
      },

      updateItems () {
        this.items = this.$children.filter(child => child.$options.name === 'CarouselItem')
      },

      resetItemPosition () {
        this.items.forEach((item, index) => {
          item.translateItem(index, this.activeIndex)
        })
      },

      playSlides () {
        if (this.activeIndex < this.items.length - 1) {
          this.activeIndex++
        } else {
          this.activeIndex = 0
        }
        console.log('playSlides', this.activeIndex)
      },

      pauseTimer () {
        clearInterval(this.timer)
      },

      startTimer () {
        if (this.interval <= 0 || !this.autoplay) return
        this.timer = setInterval(this.playSlides, this.interval)
      },

      setActiveItem (index) {
        if (typeof index === 'string') {
          const filteredItems = this.items.filter(item => item.name === index)
          if (filteredItems.length > 0) {
            index = this.items.indexOf(filteredItems[0])
          }
        }
        index = Number(index)
        if (isNaN(index) || index !== Math.floor(index)) {
          process.env.NODE_ENV !== 'production' &&
          console.warn('[Element Warn][Carousel]index must be an integer.')
          return
        }
        let length = this.items.length
        if (index < 0) {
          this.activeIndex = length - 1
        } else if (index >= length) {
          this.activeIndex = 0
        } else {
          this.activeIndex = index
        }
      },

      prev () {
        this.setActiveItem(this.activeIndex - 1)
      },

      next () {
        this.setActiveItem(this.activeIndex + 1)
      },

      handleIndicatorClick (index) {
        this.activeIndex = index
      },

      handleIndicatorHover (index) {
        if (this.trigger === 'hover' && index !== this.activeIndex) {
          this.activeIndex = index
        }
      }
    },

    created () {
      this.throttledArrowClick = throttle(300, true, index => {
        this.setActiveItem(index)
      })
      this.throttledIndicatorHover = throttle(300, index => {
        this.handleIndicatorHover(index)
      })
    },

    mounted () {
      this.updateItems()
      this.$nextTick(() => {
        addResizeListener(this.$el, this.resetItemPosition)
        if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
          this.activeIndex = this.initialIndex
        }
        this.startTimer()
      })
    },

    beforeDestroy () {
      if (this.$el) removeResizeListener(this.$el, this.resetItemPosition)
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';

  $fa-font-path: "~font-awesome/fonts";
  @import '~font-awesome/scss/font-awesome';

  $carousel-arrow-font-size: 12px;
  $carousel-arrow-size: 36px;
  $carousel-arrow-background: rgba(31, 45, 61, 0.11);
  $carousel-arrow-hover-background: rgba(31, 45, 61, 0.23);
  $carousel-indicator-width: 30px;
  $carousel-indicator-height: 2px;
  $carousel-indicator-padding-horizontal: 4px;
  $carousel-indicator-padding-vertical: 12px;
  $carousel-indicator-out-color: hsl(215, 16%, 58%);

  .carousel {
    position: relative;
    overflow-x: hidden;
  }

  .carousel-container {
    position: relative;
    height: 300px;
  }

  .carousel-arrow {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    width: $carousel-arrow-size;
    height: $carousel-arrow-size;
    cursor: pointer;
    transition: .3s;
    border-radius: 50%;
    background-color: $carousel-arrow-background;
    color: $white;
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    text-align: center;
    font-size: $carousel-arrow-font-size;

    &:hover {
      background-color: $carousel-arrow-hover-background;
    }

    i {
      cursor: pointer;
      line-height: 1;
      vertical-align: middle;
      display: inline-block;
    }
  }

  .carousel-arrow-left {
    left: 16px;
  }

  .carousel-arrow-right {
    right: 16px;
  }

  .carousel-indicators {
    position: absolute;
    list-style: none;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    z-index: 2;
  }

  .carousel-indicators-outside {
    bottom: $carousel-indicator-height + $carousel-indicator-padding-vertical * 2;
    text-align: center;
    position: static;
    transform: none;
    .carousel-indicator:hover button {
      opacity: 0.64;
    }
    button {
      background-color: $carousel-indicator-out-color;
      opacity: 0.24;
    }
  }

  .carousel-indicators-labels {
    left: 0;
    right: 0;
    transform: none;
    text-align: center;

    .carousel-button {
      width: auto;
      height: auto;
      padding: 2px 18px;
      font-size: 12px;
    }

    .carousel-indicator {
      padding: 6px 4px;
    }
  }

  .carousel-indicator {
    display: inline-block;
    background-color: transparent;
    padding: $carousel-indicator-padding-vertical $carousel-indicator-padding-horizontal;
    cursor: pointer;

    &:hover button {
      opacity: 0.72;
    }

    .is-active {
      button {
        opacity: 1;
      }
    }
  }

  .carousel-button {
    display: block;
    opacity: 0.48;
    width: $carousel-indicator-width;
    height: $carousel-indicator-height;
    background-color: $white;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: .3s;
  }

  .carousel-arrow-left-enter,
  .carousel-arrow-left-leave-active {
    transform: translateY(-50%) translateX(-10px);
    opacity: 0;
  }

  .carousel-arrow-right-enter,
  .carousel-arrow-right-leave-active {
    transform: translateY(-50%) translateX(10px);
    opacity: 0;
  }
</style>
