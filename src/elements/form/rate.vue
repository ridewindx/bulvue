<template>
  <div class="rate">

    <div class="rate-item" :class="{ disabled: disabled }" v-for="item in max"
         @mousemove="setCurrentValue(item, $event)"
         @mouseleave="resetCurrentValue"
         @click="selectValue(item)">

        <Icon :class="{ hover: hoverIndex === item }"
              :icon="(item <= currentValue) ? activeIcon
                                            : (item - 1 < currentValue) ? icons.half
                                                                        : icons.empty"
              :style="{ color: (item <= currentValue || item - 1 < currentValue)
                      ? activeColor : colors.empty }">
        </Icon>

    </div>

  </div>
</template>

<script>
  import Icon from '../icon'

  export default {
    name: 'Rate',

    components: { Icon },

    props: {
      value: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 5
      },
      lowThreshold: {
        type: Number,
        default: 2
      },
      highThreshold: {
        type: Number,
        default: 4
      },
      colors: {
        type: Object,
        default () {
          return {
            empty: '#C6D1DE',
            low: '#F7BA2A',
            middle: '#F7BA2A',
            high: '#F7BA2A'
          }
        }
      },
      icons: {
        type: Object,
        default () {
          return {
            empty: 'fa-star-o',
            low: 'fa-star',
            middle: 'fa-star',
            high: 'fa-star',
            half: 'fa-star-half-o'
          }
        }
      },
      disabled: Boolean,
      showText: Boolean,
      texts: {
        type: Array,
        default () {
          return ['极差', '失望', '一般', '满意', '惊喜']
        }
      }
    },

    data () {
      return {
        currentValue: this.value,
        hoverIndex: -1
      }
    },

    computed: {
      allowHalf () {
        const half = this.icons.half
        return (typeof half === 'string') && half !== ''
      },

      activeColor () {
        if (this.currentValue <= this.lowThreshold) {
          return this.colors.low
        } else if (this.currentValue >= this.highThreshold) {
          return this.colors.high
        } else {
          return this.colors.middle
        }
      },

      activeIcon () {
        if (this.currentValue <= this.lowThreshold) {
          return this.icons.low
        } else if (this.currentValue >= this.highThreshold) {
          return this.icons.high
        } else {
          return this.icons.middle
        }
      }
    },

    watch: {
      value (val) {
        this.currentValue = val
      }
    },

    methods: {
      setCurrentValue (value, event) {
        if (this.disabled) return

        this.hoverIndex = value
        if (!this.allowHalf) {
          this.currentValue = value
        } else {
          let target = event.target
          if (target.classList.contains('rate-item')) target = target.querySelector('.icon')

          if (event.offsetX < target.clientWidth / 2) this.currentValue = value - 0.5
          else this.currentValue = value
        }
      },

      resetCurrentValue () {
        if (this.disabled) return

        this.currentValue = this.value
        this.hoverIndex = -1
      },

      selectValue () {
        if (this.disabled) return

        this.$emit('input', this.currentValue)
      }
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";

  .rate {
    height: 1.25rem;
    line-height: 1;

    &-item {
      position: relative;
      display: inline-block;
      vertical-align: middle;

      .icon {
        font-size: 1.125rem;
        margin-right: 0.375rem;

        &:hover {
          cursor: pointer;
          transform: scale(1.15);
        }

        .fa {
          transition: 0.3s;

          &:hover {
            transform: scale(1.15);
          }
        }
      }

      &.disabled {
        :hover {
          cursor: default;
        }

        .fa {
          transition: none;

          &:hover {
            transform: none;
          }
        }
      }
    }
  }
</style>
