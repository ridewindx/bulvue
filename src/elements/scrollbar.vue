<template>
  <div class="scrollbar"
       :class="{ 'is-horizontal': horizontal, 'is-vertical': !horizontal }"
       @mousedown="handleBarMouseDown">

    <div ref="thumb" :style="thumbStyle"
         @mousedown="handleThumbMouseDown">

    </div>

  </div>
</template>

<script>
  export default {
    name: 'ScrollBar',

    props: {
      horizontal: Boolean,
      thumbSize: String,
      thumbOffset: String
    },

    data () {
      return {

      }
    },

    computed: {
      keys () {
        if (this.horizontal) {
          return {
            offset: 'offsetWidth',
            scroll: 'scrollLeft',
            scrollSize: 'scrollWidth',
            size: 'width',
            key: 'horizontal',
            axis: 'X',
            client: 'clientX',
            direction: 'left',
            translate: 'translateX'
          }
        } else {
          return {
            offset: 'offsetHeight',
            scroll: 'scrollTop',
            scrollSize: 'scrollHeight',
            size: 'height',
            key: 'vertical',
            axis: 'Y',
            client: 'clientY',
            direction: 'top',
            translate: 'translateY'
          }
        }
      },

      wrap () {
        return this.$parent.wrap
      },

      thumbStyle () {
        return {
          [this.keys.size]: `${this.thumbSize}`,
          transform: `${this.keys.translate}(${this.thumbOffset})`
        }
      }
    },

    methods: {
      handleBarMouseDown (event) {
        const offset = Math.abs(event.target.getBoundingClientRect()[this.keys.direction] - event[this.keys.client])
        const thumbHalf = this.$refs.thumb[this.keys.offset] / 2
        const thumbPosPercent = (offset - thumbHalf) * 100 / this.$el[this.keys.offset]

        this.wrap[this.keys.scroll] = thumbPosPercent * this.wrap[this.keys.scrollSize] / 100
      },

      handleThumbMouseDown (event) {
        event.stopImmediatePropagation()

        this.lastPage = (event.currentTarget[this.keys.offset] - (event[this.keys.client] - event.currentTarget.getBoundingClientRect()[this.keys.direction]))

        document.addEventListener('mousemove', this.handleThumbMouseMove, false)
        document.addEventListener('mouseup', this.handleThumbMouseUp, false)
        document.onselectstart = () => false
      },

      handleThumbMouseMove (event) {
        if (!this.lastPage) return

        const offset = event[this.keys.client] - this.$el.getBoundingClientRect()[this.keys.direction]
        const thumbClickPos = this.$refs.thumb[this.keys.offset] - this.lastPage
        const thumbPosPercent = (offset - thumbClickPos) * 100 / this.$el[this.keys.offset]

        this.wrap[this.keys.scroll] = thumbPosPercent * this.wrap[this.keys.scrollSize] / 100
      },

      handleThumbMouseUp (event) {
        document.removeEventListener('mousemove', this.handleThumbMouseMove, false)
        document.removeEventListener('mouseup', this.handleThumbMouseUp, false)
        document.onselectstart = null

        this.lastPage = 0
      }
    }
  }
</script>
