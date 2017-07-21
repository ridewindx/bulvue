<template>
  <label class="radio">

    <span class="radio-input"
          :class="{
                    'is-disabled': isDisabled,
                    'is-checked': model === label,
                    'is-focus': focus
                  }">

      <span class="radio-inner"></span>
      <input type="radio" class="radio-original"
             :name="name" :value="label"
             :disabled="isDisabled"
             v-model="model"
             @focus="focus = true" @blur="focus = false">

    </span>

    <span class="radio-label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>

  </label>
</template>

<script>
  import Emit from '../../utils/emit.js'

  export default {
    name: 'Radio',

    mixins: [{ methods: Emit }],

    props: {
      value: null,
      label: null,
      disabled: Boolean,
      name: String
    },

    data() {
      return {
        focus: false
      };
    },

    computed: {
      isGrouped () {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.name !== 'RadioGroup') {
            parent = parent.$parent
          } else {
            this.radioGroup = parent
            return true
          }
        }
        return false
      },

      model: {
        get () {
          return this.isGrouped ? this.radioGroup.value : this.value
        },

        set (val) {
          if (this.isGrouped) {
            this.emitUp('RadioGroup', 'input', val)
          } else {
            this.$emit('input', val)
          }
        }
      },

      isDisabled () {
        return (this.isGrouped && this.radioGroup.disabled) || this.disabled
      }
    }
  }
</script>

<style lang="scss">

</style>
