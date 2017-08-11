<template>
  <div class="slider">

    <div class="slider-wrap" ref="slider" @click.self="handleClick">

      <template v-if="showStops">
        <div class="slider-stop" v-for="item in stops"
             :style="{ left: item + '%' }" @click.self="handleClick"></div>
      </template>

      <div class="slider-bar" :style="barStyle" @click.self="handleClick"></div>

      <Tooltip class="slider-button-tooltip" :style="{ left: firstPos + '%' }"
               placement="top" :content="formatTip(range ? value[0] : value)"
               :disabled="showTip === 'never'" :always="showTip === 'always' || firstHeld === true"
               @mousedown.prevent="firstDragStart">
        <div class="slider-button" :class="{ dragging: firstHeld }"></div>
      </Tooltip>

      <Tooltip class="slider-button-tooltip" :style="{ left: secondPos + '%' }" v-if="range"
               placement="top" :content="formatTip(value[1])"
               :disabled="showTip === 'never'" :always="showTip === 'always' || secondHeld === true"
               @mousedown.prevent="secondDragStart">
        <div class="slider-button" :class="{ dragging: secondHeld }"></div>
      </Tooltip>

    </div>

    <InputNumber v-if="!range && showInput" @input="handleInput"
                 :min="min" :max="max" :step="step" :value="value" :disabled="disabled">
    </InputNumber>

  </div>
</template>

<script>
  import Tooltip from '../elements/tooltip'
  import InputNumber from '../elements/form/input-number'

  const FIRST = 0
  const SECOND = 1

  export default {
    name: 'Slider',

    components: { Tooltip, InputNumber },

    props: {
      value: {
        type: [Number, Array],
        validator (v) {
          if (Array.isArray(v)) return v.length === 2 && v[0] <= v[1]
          else return true
        },
        default: 0
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      disabled: Boolean,
      range: Boolean,
      showInput: Boolean,
      showStops: Boolean,
      showTip: {
        type: String,
        validator (v) {
          return ['hover', 'always', 'never'].indexOf(v) > -1
        },
        default: 'hover'
      },
      formatTip: {
        type: Function,
        default: v => v
      }
    },

    data () {
      return {
        draggingNo: null,
        firstPos: 0,
        secondPos: 0,
        firstHeld: false,
        secondHeld: false,
        startX: 0,
        currentX: 0
      }
    },

    computed: {
      sliderWidth () {
        // return parseInt(getStyle(this.$refs.slider, 'width'), 10);
        return this.$refs.slider.clientWidth
      },

      stops () {
        let count = (this.max - this.min) / this.step
        let stops = []
        let step = 100 / count
        for (let i = 1; i < count; i++) {
          stops.push(i * step)
        }
        return stops
      },

      barStyle () {
        if (this.range) {
          return {
            width: (this.value[1] - this.value[0]) / (this.max - this.min) * 100 + '%',
            left: (this.value[0] - this.min) / (this.max - this.min) * 100 + '%'
          }
        } else {
          return {
            width: (this.value - this.min) / (this.max - this.min) * 100 + '%'
          }
        }
      }
    },

    methods: {
      handleClick (e) {
        if (this.disabled) return

        const newPos = (e.clientX - this.$refs.slider.getBoundingClientRect().left) / this.sliderWidth * 100

        if (this.range && newPos > this.firstPos && (newPos - this.firstPos) > (this.secondPos - newPos)) {
          this.changePos(SECOND, newPos)
        } else {
          this.changePos(FIRST, newPos)
        }
      },

      handleInput (val) {
        const newPos = (val - this.min) / (this.max - this.min) * 100
        this.changePos(FIRST, newPos)
      },

      firstDragStart (e) {
        this.dragStart(FIRST, e)
      },

      secondDragStart (e) {
        this.dragStart(SECOND, e)
      },

      dragStart (no, e) {
        if (no === FIRST) this.firstHeld = true
        else if (no === SECOND) this.secondHeld = true
        this.startX = e.clientX

        const dragging = this.dragging.bind(this, no)

        window.addEventListener('mousemove', dragging)

        const dragEnd = () => {
          if (no === FIRST) {
            if (!this.firstHeld) return
            this.firstHeld = false
          } else if (no === SECOND) {
            if (!this.secondHeld) return
            this.secondHeld = false
          }
          window.removeEventListener('mousemove', dragging)
          window.removeEventListener('mouseup', dragEnd)
        }
        window.addEventListener('mouseup', dragEnd)
      },

      dragging (no, e) {
        if (no === FIRST && !this.firstHeld) return
        else if (no === SECOND && !this.secondHeld) return

        this.currentX = e.clientX
        const diff = (this.currentX - this.startX) / this.sliderWidth * 100
        let newPos = this.firstPos + diff
        if (newPos < 0) newPos = 0
        else if (no === FIRST && newPos > this.secondPos) newPos = this.secondPos
        else if (no === SECOND && newPos < this.firstPos) newPos = this.firstPos

        this.changePos(no, newPos)
      },

      changePos (no, newPos) {
        const currentValue = Math.round(newPos / 100 * (this.max - this.min) / this.step) * this.step + this.min
        const pos = (currentValue - this.min) / (this.max - this.min) * 100
        if (no === FIRST) {
          this.firstPos = pos
          if (this.range) {
            if (currentValue !== this.value[0]) {
              this.$emit('input', [currentValue, this.value[1]])
            }
          } else {
            if (currentValue !== this.value) {
              this.$emit('input', currentValue)
            }
          }
          this.$emit('input', this.range ? [currentValue, this.value[1]] : currentValue)
        } else if (no === SECOND) {
          this.secondPos = pos
          if (currentValue !== this.value[1]) {
            this.$emit('input', [this.value[0], currentValue])
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";

  .slider {
    &-wrap {
      position: relative;
      width: 100%;
      height: 0.25rem;
      margin: 1rem 0;
      background-color: $grey-lighter;
      border-radius: $radius-small;
      cursor: pointer;
    }

    &-button-tooltip {
      position: absolute;
      width: 0.75rem;
      height: 0.75rem;
      text-align: center;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);

      .tooltip-rel {
        display: block;
      }
    }

    &-button {
      width: 0.5rem;
      height: 0.5rem;
      border: 2px solid lighten($blue, 20%);
      border-radius: 50%;
      background-color: $white;
      transition: all 0.2s linear;

      &:hover, &.dragging {
        border-color: $blue;
        transform: scale(1.5);
      }

      &:hover {
        cursor: grab;
      }

      &.dragging {
        cursor: grabbing;
      }
    }

    &-bar {
      position: absolute;
      height: 0.25rem;
      background-color: lighten($blue, 20%);
      border-radius: $radius-small;
    }

    &-stop {
      position: absolute;
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      background-color: $grey-light;
      transform: translateX(-50%);
    }
  }
</style>
