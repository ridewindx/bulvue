<template>
  <transition name="collapse"
              @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
              @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
    <slot></slot>
  </transition>
</template>

<script>
  export default {
    name: 'CollapseTransition',

    methods: {
      beforeEnter (el) {
        el.classList.add('collapse-transition')
        if (!el.dataset) el.dataset = {}

        el.dataset.oldPaddingTop = el.style.paddingTop
        el.dataset.oldPaddingBottom = el.style.paddingBottom

        el.style.height = '0'
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      },

      enter (el) {
        el.dataset.oldOverflow = el.style.overflow
        if (el.scrollHeight !== 0) {
          el.style.height = el.scrollHeight + 'px'
          el.style.paddingTop = el.dataset.oldPaddingTop
          el.style.paddingBottom = el.dataset.oldPaddingBottom
        } else {
          el.style.height = ''
          el.style.paddingTop = el.dataset.oldPaddingTop
          el.style.paddingBottom = el.dataset.oldPaddingBottom
        }

        el.style.overflow = 'hidden'
      },

      afterEnter (el) {
        // for safari: remove class then reset height is necessary
        el.classList.remove('collapse-transition')
        el.style.height = ''
        el.style.overflow = el.dataset.oldOverflow
      },

      beforeLeave (el) {
        if (!el.dataset) el.dataset = {}
        el.dataset.oldPaddingTop = el.style.paddingTop
        el.dataset.oldPaddingBottom = el.style.paddingBottom
        el.dataset.oldOverflow = el.style.overflow

        el.style.height = el.scrollHeight + 'px'
        el.style.overflow = 'hidden'
      },

      leave (el) {
        if (el.scrollHeight !== 0) {
          // for safari: add class after set height, or it will jump to zero height suddenly, weired
          el.classList.add('collapse-transition')
          el.style.height = 0
          el.style.paddingTop = 0
          el.style.paddingBottom = 0
        }
      },

      afterLeave (el) {
        el.classList.remove('collapse-transition')
        el.style.height = ''
        el.style.overflow = el.dataset.oldOverflow
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }
    }
  }
</script>

<style lang="scss">
  .collapse-transition {
    transition: 0.2s height ease-in-out, 0.2s padding-top ease-in-out, 0.2s padding-bottom ease-in-out;
  }
</style>
