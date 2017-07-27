<template>
  <label class="checkbox"
         :class="{
                   'is-disabled': disabled,
                   'is-checked': isChecked,
                   'is-focused': focused
                 }">

    <input type="checkbox" :name="name" :value="value" :disabled="disabled"
           v-model="innerModel" @change="changed"
           @focus="focused = true" @blur="focused = false">

    <span></span>

    <slot></slot>
    <template v-if="!$slots.default">{{value}}</template>

  </label>
</template>

<script>
  import Emit from '../../utils/emit.js'

  export default {
    name: 'Checkbox',

    mixins: [{ methods: Emit }],

    model: {
      prop: 'outerModel',
      event: 'input'
    },

    props: {
      name: String,
      value: null,
      disabled: Boolean,
      checked: Boolean,
      outerModel: null
    },

    data () {
      return {
        focused: false
      }
    },

    computed: {
      innerModel: {
        get () {
          if (this.isGrouped) {
            return this.checkboxGroup.value
          } else {
            return this.outerModel
          }
        },

        set (val) {
          if (this.isGrouped) {
            if ((this.checkboxGroup.min &&
                  val.length < this.checkboxGroup.min) &&
                (this.checkboxGroup.max &&
                  val.length > this.checkboxGroup.max)) {
              return
            }

            this.emitUp('CheckboxGroup', 'input', val)
          } else {
            this.$emit('input', val)
          }
        }
      },

      isGrouped () {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.name !== 'CheckboxGroup') {
            parent = parent.$parent
          } else {
            this.checkboxGroup = parent
            return true
          }
        }
        return false
      },

      isChecked () {
        if (Array.isArray(this.innerModel)) {
          return this.innerModel.indexOf(this.value) > -1
        } else {
          return this.innerModel
        }
      }
    },

    methods: {
      changed (event) {
        // this.$emit('change', event)
        if (this.isGrouped) {
          this.emitUp('CheckboxGroup', 'change', [this.checkboxGroup.value])
        }
      }
    },

    created () {
      if (!this.checked) {
        return
      }
      if (!Array.isArray(this.innerModel)) {
        this.innerModel = true
        return
      }
      if (this.value !== undefined &&
          this.innerModel.indexOf(this.value) === -1) {
        this.innerModel.push(this.value)
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/elements/form.sass';

  label.checkbox {
    user-select: none;

    input {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
    }

    & > span {
      position: relative;
      display: inline-block;
      width: 1.125em;
      height: 1.125em;
      box-sizing: border-box;
      border-radius: 22%;
      border: 1px solid $grey-light;
      vertical-align: text-bottom;
      transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),
                  background-color .25s cubic-bezier(.71,-.46,.29,1.46);

      &:hover {
        border-color: $blue;
      }

      &:after {
        content: "";
        position: absolute;
        width: 0.25em;
        height: 0.5em;
        box-sizing: content-box;
        border: 0.125em solid $white;
        border-left: 0;
        border-top: 0;
        left: 0.3125em;
        top: 0.0625em;
        transform: rotate(45deg) scaleY(0);
        transform-origin: center;
        transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
      }
    }

    &.is-focused > span {
      border-color: $blue;
    }

    &.is-checked > span {
      border-color: $blue;
      background-color: $blue;
      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }

    &.is-disabled {
      color: $grey-light;
      cursor: not-allowed;

      & > span {
        border-color: $grey-light;
        background-color: $grey-lighter;
      }

      &.is-checked > span {
        border-color: $grey-light;
        background-color: $grey-light;
      }
    }
  }
</style>
