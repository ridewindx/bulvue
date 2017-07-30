<template>
  <div class="scrollview">
    <div class="scrollview-wrap" :class="[wrapClass, { 'hidden-default': !gutter }]" ref="wrap"
         :style="wrapStyle" @scroll="handleScroll">

      <ul class="scrollview-view" :class="[viewClass]" ref="view">
        <slot></slot>
      </ul>

    </div>

    <ScrollBar horizontal :thumbSize="thumbWidth" :thumbOffset="thumbXOffset"></ScrollBar>
    <ScrollBar :thumbSize="thumbHeight" :thumbOffset="thumbYOffset"></ScrollBar>

  </div>
</template>

<script>
  import ScrollBar from './scrollbar'
  import { addResizeListener, removeResizeListener } from '../utils/resize-event'
  import Vue from 'vue'

  export default {
    name: 'ScrollView',

    components: {ScrollBar},

    props: {
      wrapClass: String,
      viewClass: String
    },

    data () {
      return {
        thumbWidth: '0%',
        thumbHeight: '0%',
        thumbXOffset: '0%',
        thumbYOffset: '0%'
      }
    },

    computed: {
      gutter () {
        if (Vue.prototype.$isServer) return 0

        const outer = document.createElement('div')
        outer.className = 'scrollbar-wrap'
        outer.style.visibility = 'hidden'
        outer.style.width = '100px'
        outer.style.position = 'absolute'
        outer.style.top = '-9999px'
        document.body.appendChild(outer)

        const widthNoScroll = outer.offsetWidth
        outer.style.overflow = 'scroll'

        const inner = document.createElement('div')
        inner.style.width = '100%'
        outer.appendChild(inner)

        const widthWithScroll = inner.offsetWidth
        outer.parentNode.removeChild(outer)
        return widthNoScroll - widthWithScroll
      },

      wrapStyle () {
        return {
          'margin-bottom': `-${this.gutter}px`,
          'margin-right': `-${this.gutter}px`
        }
      }
    },

    methods: {
      handleScroll () {
        const wrap = this.$refs.wrap
        this.thumbXOffset = (wrap.scrollLeft * 100) / wrap.clientWidth + '%'
        this.thumbYOffset = (wrap.scrollTop * 100) / wrap.clientHeight + '%'
      },

      handleResize () {
        const wrap = this.$refs.wrap
        let widthPercent = wrap.clientWidth * 100 / wrap.scrollWidth
        let heightPercent = wrap.clientHeight * 100 / wrap.scrollHeight
        console.log('widthPercent', widthPercent, 'heightPercent', heightPercent)
        this.thumbWidth = (widthPercent < 100) ? (widthPercent + '%') : ''
        this.thumbHeight = (heightPercent < 100) ? (heightPercent + '%') : ''
        console.log('thumbWidth', this.thumbWidth, 'thumbHeight', this.thumbHeight)
      }
    },

    mounted () {
      this.$nextTick(this.handleResize)

      addResizeListener(this.$refs.view, this.handleResize)
    },

    beforeDestroy () {
      removeResizeListener(this.$refs.view, this.handleResize)
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';

  .scrollview {
    overflow: hidden;
    position: relative;

    .scrollview-wrap {
      overflow: scroll;
    }

    .scrollbar {
      position: absolute;
      right: 2px;
      bottom: 2px;
      z-index: 1;
      border-radius: 4px;
      opacity: 0;
      transition:opacity 120ms ease-out;

      > div {
        position: relative;
        display: block;
        width: 0;
        height: 0;
        cursor: pointer;
        border-radius: inherit;
        background-color: rgba($grey, .3);
        transition: .3s background-color;

        &:hover {
          background-color: rgba($grey, .5);
        }
      }

      &.is-vertical {
        width: 6px;
        top: 2px;

        > div {
          width: 100%;
        }
      }

      &.is-horizontal {
        height: 6px;
        left: 2px;

        > div {
          height: 100%;
        }
      }
    }

    &:hover, &:active, &:focus {
      .scrollbar {
        opacity: 1;
        transition: opacity 340ms ease-out;
      }
    }
  }
</style>
