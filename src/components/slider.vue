<template>
  <div class="slider">

    <div class="slider-wrap" ref="slider" @click.self="handleClick">

      <template v-if="showStops">
        <div class="slider-stop" v-for="item in stops"
             :style="{ left: item + '%' }" @click.self="handleClick"></div>
      </template>

      <div class="slider-bar" :style="barStyle" @click.self="handleClick"></div>

      <div class="slider-button-wrap" @mousedown.prevent="firstDragStart" :style="{ 'z-index': firstHeld ? 1 : 0, left: firstPos + '%' }">
        <Tooltip ref="first"
                 :content="formatTip(firstValue)" :disabled="showTip === 'never'"
                 :always="showTip === 'always' || firstHeld" placement="top">
          <div class="slider-button" :class="{ dragging: firstHeld }"></div>
        </Tooltip>
      </div>

      <div class="slider-button-wrap" @mousedown.prevent="secondDragStart" :style="{ 'z-index': secondHeld ? 1 : 0, left: secondPos + '%' }">
        <Tooltip ref="second" v-if="range"
                 :content="formatTip(secondValue)" :disabled="showTip === 'never'"
                 :always="showTip === 'always' || secondHeld" placement="top">
          <div class="slider-button" :class="{ dragging: secondHeld }"></div>
        </Tooltip>
      </div>

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
        firstValue: 0,
        secondValue: 0,
        sliderWidth: 0,
        draggingNo: null,
        firstPos: 0,
        secondPos: 0,
        startX: 0,
        startFirstPos: 0,
        startSecondPos: 0
      }
    },

    computed: {
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
      },

      firstHeld () {
        return this.draggingNo === FIRST
      },

      secondHeld () {
        return this.draggingNo === SECOND
      }
    },

    watch: {
      value: {
        immediate: true,
        handler (val) {
        }
      }
    },

    methods: {
      handleClick (e) {
        if (this.disabled) return

        this.sliderWidth = this.$refs.slider.clientWidth
        const newPos = (e.clientX - this.$refs.slider.getBoundingClientRect().left) / this.sliderWidth * 100

        if (this.range && newPos > this.firstPos && (newPos - this.firstPos) > (this.secondPos - newPos)) {
          this.draggingNo = SECOND
        } else {
          this.draggingNo = FIRST
        }
        this.changePos(newPos)
        this.draggingNo = null
      },

      handleInput (val) {
        const newPos = (val - this.min) / (this.max - this.min) * 100
        this.draggingNo = FIRST
        this.changePos(newPos)
        this.draggingNo = null
      },

      firstDragStart (e) {
        this.draggingNo = FIRST
        this.dragStart(e)
      },

      secondDragStart (e) {
        this.draggingNo = SECOND
        this.dragStart(e)
      },

      dragStart (e) {
        this.sliderWidth = this.$refs.slider.clientWidth
        this.startX = e.clientX
        this.startFirstPos = this.firstPos
        this.startSecondPos = this.secondPos

        window.addEventListener('mousemove', this.dragging)
        window.addEventListener('mouseup', this.dragEnd)
      },

      dragEnd () {
        if (this.draggingNo === FIRST) this.$refs.first.hidePopper()
        else if (this.draggingNo === SECOND) this.$refs.second.hidePopper()
        this.draggingNo = null

        window.removeEventListener('mousemove', this.dragging)
        window.removeEventListener('mouseup', this.dragEnd)
      },

      dragging (e) {
        const diff = (e.clientX - this.startX) / this.sliderWidth * 100

        let startPos
        if (this.draggingNo === FIRST) startPos = this.startFirstPos
        else if (this.draggingNo === SECOND) startPos = this.startSecondPos

        let newPos = startPos + diff
        if (newPos < 0) newPos = 0
        else if (newPos > 100) newPos = 100

        this.changePos(newPos)
      },

      changePos (newPos) {
        const currentValue = Math.round(newPos / 100 * (this.max - this.min) / this.step) * this.step + this.min
        const pos = (currentValue - this.min) / (this.max - this.min) * 100
        if (this.draggingNo === FIRST) {
          this.firstPos = pos
          this.firstValue = currentValue
        } else if (this.draggingNo === SECOND) {
          this.secondPos = pos
          this.secondValue = currentValue
        }

        this.changeValue()
      },

      changeValue () {
        if (!this.range) {
          if (this.firstValue !== this.value[0]) {
            this.$emit('input', this.firstValue)
          }
        } else if (this.firstValue > this.secondValue) {
          if (this.secondValue !== this.value[0] || this.firstValue !== this.value[1]) {
            this.$emit('input', [this.secondValue, this.firstValue])
          }
        } else {
          if (this.firstValue !== this.value[0] || this.secondValue !== this.value[1]) {
            this.$emit('input', [this.firstValue, this.secondValue])
          }
        }
      }
    },

    created () {
      if (!this.range) {
        this.firstValue = this.value
        this.firstPos = (this.value - this.min) / (this.max - this.min) * 100
      } else {
        this.firstValue = this.value[0]
        this.secondValue = this.value[1]
        this.firstPos = (this.value[0] - this.min) / (this.max - this.min) * 100
        this.secondPos = (this.value[1] - this.min) / (this.max - this.min) * 100
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

    &-button-wrap {
      position: absolute;
      width: 0.75rem;
      height: 0.75rem;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);

      .tooltip {
        position: absolute;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);

        .tooltip-rel {
          display: block;
        }
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
