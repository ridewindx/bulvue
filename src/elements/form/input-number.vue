<template>
  <div class="input-number control" :class="{ focused: focused }">
    <input class="input-number-input input" @change="changeInput" :value="input" :disabled="disabled"
           @focus="focused = true" @blur="focused = false"
           @keydown.up.prevent="up" @keydown.down.prevent="down">

    <div class="input-number-handler">
      <div class="input-number-handler-up" :class="{ disabled: upDisabled || disabled }"
           v-repeat-click="up">
        <Icon icon="fa-angle-up"></Icon>
      </div>
      <div class="input-number-handler-down" :class="{ disabled: downDisabled || disabled }"
           v-repeat-click="down">
        <Icon icon="fa-angle-down"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
  import { once } from '../../utils/event'
  import Icon from '../icon'

  function isNumber (str) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(str)
  }

  function sum (num1, num2) {
    let fractionalLen = 0
    let parts = num1.toString().split('.')
    if (parts.length > 1) {
      fractionalLen = parts[1].length
    }
    parts = num2.toString().split('.')
    if (parts.length > 1) {
      fractionalLen = Math.max(parts[1].length, fractionalLen)
    }

    let m = Math.pow(10, fractionalLen)
    return Math.round((num1 + num2) * m) / m
  }

  export default {
    name: 'InputNumber',

    directives: {
      repeatClick: {
        bind (el, binding, vnode) {
          let interval = null
          let startTime
          const handler = () => vnode.context[binding.expression].apply()

          const clear = () => {
            if (new Date() - startTime < 100) {
              handler()
            }
            clearInterval(interval)
            interval = null
          }

          el.addEventListener('mousedown', () => {
            startTime = new Date()
            clearInterval(interval)
            interval = setInterval(handler, 100)

            once(document, 'mouseup', clear)
          })
        }
      }
    },

    components: { Icon },

    props: {
      value: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      step: {
        type: Number,
        validator (v) {
          return v > 0
        },
        default: 1
      },
      disabled: Boolean
    },

    data () {
      return {
        input: this.value,
        upDisabled: false,
        downDisabled: false,
        focused: false
      }
    },

    watch: {
      value: {
        immediate: true,
        handler (val) {
          this.upDisabled = sum(val, this.step) > this.max
          this.downDisabled = sum(val, -this.step) < this.min
          this.input = val
        }
      }
    },

    methods: {
      setValue (val) {
        this.$emit('input', val)
      },

      changeInput (e) {
        let val = e.target.value
        if (typeof val !== 'string') return

        val = val.trim()

        if (isNumber(val)) {
          val = Number(val)

          if (val > this.max) val = this.max
          else if (val < this.min) val = this.min

          if (val !== this.value) this.setValue(val)
        } else {
          val = this.value
        }

        e.target.value = val
        this.input = val
      },

      up () {
        if (this.disabled) return
        let val = sum(this.value, this.step)
        if (val > this.max) return  // val = this.max
        this.setValue(val)
      },

      down () {
        if (this.disabled) return
        let val = sum(this.value, -this.step)
        if (val < this.min) return  // val = this.min
        this.setValue(val)
      }
    },

    created () {
      console.assert(this.max > this.min)
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/elements/form";

  .input-number {
    position: relative;
    display: inline-block;

    &-input {
      box-sizing: border-box;
    }

    &:hover &-input {
      border-color: $input-hover-border;
    }

    &:hover &-handler, &.focused &-handler {
      opacity: 1;
    }

    &-handler {
      position: absolute;
      top: 1px;
      right: 1px;
      width: 1.375rem;
      height: calc(100% - 2px);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      text-align: center;

      &:hover {
        cursor: pointer;
      }

      &-up, &-down {
        box-sizing: border-box;
        height: 50%;
        border-left: 1px solid $grey-lighter;
        color: $grey-lighter;

        &:hover {
          color: $input-hover-border;
        }

        &.disabled {
          cursor: not-allowed;
        }
      }

      &-up {
        border-bottom: 0.5px solid $grey-lighter;
      }

      &-down {
        border-top: 0.5px solid $grey-lighter;
      }
    }
  }
</style>
