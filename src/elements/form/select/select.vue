<template>
  <div class="select" :class="classes" v-click-outside="hideDropdown">

    <div class="select-selection" ref="reference" @click="toggleDropdown">

      <span class="select-placeholder" v-show="!hasSelected">{{ placeholder }}</span>

      <div class="select-multiple-selected" v-for="(label, index) in multipleSelected">
        <span>{{ label }}</span>
        <Icon icon="fa-times" @click="removeSelected(index)"></Icon>
      </div>

      <span class="select-single-selected" v-show="!multiple && hasSelected && !filterable">{{ singleSelected }}</span>

      <input type="text" class="select-input" ref="input" v-if="filterable"
             v-model="query" :placeholder="!hasSelected ? placeholder : ''">
             <!--@blur="handleBlur" @keydown="" @keydown.delete="">-->

      <Icon icon="fa-times-circle" class="icon-clear" v-show="showClearIcon" @click.native.stop="clearSingleSelected"></Icon>
      <Icon icon="fa-caret-down" class="icon-arrow"></Icon>

    </div>

    <transition :name="dropdownTransition">
      <div class="select-dropdown" ref="popper" v-show="showDropdown"
           :style="{ width: dropdownWidth }" :placement="dropdownPlacement">

        <ul v-if="Array.isArray(options)">
          <Option v-for="item in options" :label="item.label" :value="item.value" :key="item.value" :disabled="item.disabled"></Option>
        </ul>

        <ul v-else>
          <OptGroup v-for="(items, label) in options" :label="label" :key="label">
            <Option v-for="item in items" :label="item.label" :value="item.value" :key="item.value" :disabled="item.disabled"></Option>
          </OptGroup>
        </ul>

        <ul class="select-not-found" v-show="showNotFound">
          <li>{{ notFoundText }}</li>
        </ul>

        <ul class="select-loading" v-show="loading">{{ loadingText }}</ul>

      </div>
    </transition>

  </div>

</template>

<script>
  import isEmpty from 'lodash/isEmpty'
  import Popper from '../../../utils/popper'
  import ClickOutside from '../../../utils/click-outside'
  import Icon from '../../../elements/icon'
  import { findChildComponents } from '../../../utils/find'
  import OptGroup from './opt-group'
  import Option from './option'

  export default {
    name: 'Select',

    mixins: [ Popper ],

    directives: { ClickOutside },

    components: { Icon, OptGroup, Option },

    props: {
      options: [Array, Object],
      value: [String, Number, Array],
      multiple: Boolean,
      disabled: Boolean,
      clearable: Boolean,
      placeholder: {
        type: String,
        default: '请选择'
      },
      filterable: Boolean,
      fetchFunc: Function,
      loading: Boolean,
      loadingText: {
        type: String,
        default: '加载中'
      },
      notFoundText: {
        type: String,
        default: '无匹配数据'
      },
      dropdownPlacement: {
        validator (v) {
          return ['top', 'bottom'].indexOf(v) > -1
        },
        default: 'bottom'
      },
      dropdownWidth: String
    },

    data () {
      return {
        opts: [],
        optGroups: [],
        dropdownVisible: false,
        multipleSelected: [],
        singleSelected: null,
        query: '',
        notFound: false,
        focusedIndex: 0,
        lastSelectedIndex: 0
      }
    },

    computed: {
      classes () {
        return {
          'disabled': this.disabled,
          'dropdown-shown': this.showDropdown,
          'multiple': this.multiple,
          'clear-icon-shown': this.showClearIcon
        }
      },

      showDropdown () {
        return this.dropdownVisible && (!isEmpty(this.options) || this.loading || (this.fetchFunc && !this.query))
      },

      hasSelected () {
        return this.multiple ? this.value.length : this.value
      },

      showClearIcon () {
        return !this.multiple && this.clearable && this.hasSelected
      },

      dropdownTransition () {
        return this.dropdownPlacement === 'bottom' ? 'slide-up' : 'slide-down'
      },

      showNotFound () {
        return this.notFound
      }
    },

    watch: {
      options (val) {
        this.$nextTick(() => {
          this.updateOpts()
        })
        if (Array.isArray(val)) {
        } else {

        }
      },

      value (val) {
        if (!val) return

        if (this.multiple) {
          if (!Array.isArray(val)) return

          const multipleSelected = []
          for (const v of val) {
            for (const opt of this.opts) {
              if (opt.value === v) {
                multipleSelected.push(opt.label)
                break
              }
            }
          }
          this.multipleSelected = multipleSelected
        } else {
          for (const opt of this.opts) {
            if (val === opt.value) {
              this.singleSelected = opt.label
            }
          }
        }
      },

      query (val) {
        this.$emit('queryChanged', val)

        if (this.fetchFunc) {
          if (!val) {
            this.options = []
          } else {
            this.loading = true
            this.fetchFunc(val, options => {
              this.loading = false
              this.focusedIndex = 0
              this.options = options
            })
          }
        } else {

        }
      }
    },

    methods: {
      toggleDropdown () {
        if (this.disabled) return
        this.dropdownVisible = !this.dropdownVisible
        if (this.dropdownVisible) {
          this.focusedIndex = this.lastSelectedIndex
          this.opts.forEach(opt => { opt.focused = false })
          this.opts[this.focusedIndex].focused = true
          this.$nextTick(this.scrollOption)
        }
      },

      hideDropdown () {
        if (!this.dropdownVisible) return
        this.dropdownVisible = false
      },

      updateOpts () {
        this.opts = findChildComponents(this, 'Option')
        this.optGroups = findChildComponents(this, 'OptGroup')
      },

      handleKeydown (e) {
        if (!this.dropdownVisible) return

        let prevent = true

        switch (e.keyCode) {
          case 27:
            this.hideDropdown()
            break
          case 40:
            this.navigateOption('down')
            break
          case 38:
            this.navigateOption('up')
            break
          case 13:
            this.selectOption()
            break
          default:
            prevent = false
            break
        }

        if (prevent) e.preventDefault()
      },

      navigateOption (direction) {
        const opts = this.opts

        if (direction === 'down') {
          if (this.focusedIndex >= opts.length - 1) this.focusedIndex = 0
          else ++this.focusedIndex
        } else if (direction === 'up') {
          if (this.focusedIndex <= 0) this.focusedIndex = opts.length - 1
          else --this.focusedIndex
        }

        opts.forEach(opt => { opt.focused = false })

        const opt = opts[this.focusedIndex]
        if (opt.disabled || !opt.visible) {
          this.navigateOption(direction)
        } else {
          opt.focused = true

          this.scrollOption()
        }
      },

      scrollOption () {
        const dropdown = this.$refs.popper
        const dropdownRect = dropdown.getBoundingClientRect()
        const optRect = this.opts[this.focusedIndex].$el.getBoundingClientRect()
        const bottomOverflow = optRect.bottom - dropdownRect.bottom
        const topOverflow = dropdownRect.top - optRect.top

        if (bottomOverflow > 0) {
          dropdown.scrollTop += bottomOverflow
        } else if (topOverflow > 0) {
          dropdown.scrollTop -= topOverflow
        }
      },

      selectOption (value) {
        let opt, lastSelectedIndex
        if (value === undefined) {
          opt = this.opts[this.focusedIndex]
          value = opt.value
          lastSelectedIndex = this.focusedIndex
        } else {
          for (let i = 0; i < this.opts.length; ++i) {
            if (this.opts[i].value === value) {
              opt = this.opts[i]
              lastSelectedIndex = i
              break
            }
          }
        }

        if (this.multiple) {
          if (this.value.indexOf(value) < 0) {
            this.$emit('input', this.value.concat(value))
            opt.selected = true

            this.update()
          }

          if (this.filterable) {
            this.query = ''
            this.$refs.input.focus()
          }
        } else if (value !== this.value) {
          this.$emit('input', value)

          for (const o of this.opts) o.selected = false
          opt.selected = true
          this.lastSelectedIndex = lastSelectedIndex

          if (this.filterable) {
            this.query = opt.label ? opt.label : opt.value
          }
        }

        this.hideDropdown()
      },

      showSelected () {
        if (!(!this.multiple && this.filterable && this.value)) {
          return
        }

        for (const opt of this.opts) {
          if (opt.value !== this.value) continue
          if (opt.label) this.query = opt.label
          else this.query = opt.value
        }
      },

      removeSelected (index) {
        let value = this.value.slice()
        value.splice(index, 1)
        this.$emit('input', value)

        if (this.filterable) {
          this.$refs.input.focus()
        }
      },

      clearSingleSelected () {
        this.opts[this.lastSelectedIndex].selected = false
        this.lastSelectedIndex = 0
        if (this.filterable) this.query = ''
        this.$emit('input', undefined)
      }
    },

    mounted () {
      if (this.multiple) {
        if (!Array.isArray(this.value)) {
          if (this.value === undefined) this.value = []
          else this.value = [this.value]
        }
      } else if (Array.isArray(this.value)) {
        this.value = this.value.length ? this.value[0] : undefined
      }

      this.showSelected()

      document.addEventListener('keydown', this.handleKeydown)

      this.$on('selected', this.selectOption)

      this.$on('focused', target => {
        for (let i = 0; i < this.opts.length; ++i) {
          const opt = this.opts[i]
          opt.focused = false
          if (opt.value === target.value) this.focusedIndex = i
        }
        target.focused = true
      })

      this.updateOpts()
    },

    beforeDestroy () {
      document.removeEventListener('keydown', this.handleKeydown)
    }
  }
</script>

<style lang="scss">
  $fa-font-path: "~font-awesome/fonts";
  @import '~font-awesome/scss/font-awesome';
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/base/_all";
  @import "../../../styles/variables";

  .select {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    text-align: left;
    font-size: 0.75rem;
    line-height: normal;

    &-selection {
      display: block;
      cursor: pointer;
      background-color: $white;
      border-radius: $radius;
      border: 1px solid $grey-lighter;
      transition: all 0.2s ease-in-out;

      &:hover {
        border-color: $grey-light;

        .icon-clear {
          display: block;
        }
      }
    }

    .icon-clear, .icon-arrow {
      position: absolute;
      top: 50%;
      right: 0.5rem;
      margin-top: -0.5rem;
      color: $grey;
      font-size: 0.875rem;
    }

    .icon-clear {
      display: none;
    }

    .icon-arrow {
      transition: transform 0.2s ease-in-out;
    }

    &.clear-icon-shown &-selection:hover .icon-arrow {
      display: none;
    }

    &.dropdown-shown {
      .select-selection {
        border-color: $grey-light;
        box-shadow: 0 0 0 1px rgba($grey-light, 0.5);
      }

      .icon-arrow {
        transform: rotate(180deg);
      }
    }

    &.disabled {
      color: $grey-lighter;
      background-color: $white-ter;
      box-shadow: none;
    }

    &.disabled &-selection {
      cursor: not-allowed;
    }

    &-placeholder, &-single-selected {
      // display: block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-placeholder {
      color: $grey;
    }

    &:not(.multiple) &-selection {
      position: relative;
      height: 2rem;

      .select-placeholder, .select-single-selected {
        line-height: 2rem;
        padding-left: 0.5rem;
        padding-right: 1.5rem;
      }
    }

    &.multiple &-selection {
      padding: 0 1.5rem 0 0.25rem;
      min-height: 2rem;

      .select-placeholder {
        padding-left: 0.25rem;
        padding-right: 1.5rem;
      }
    }

    &-input {
      position: relative;
      display: inline-block;
      height: 2rem;
      padding: 0 1.5rem 0 0.5rem;
      box-sizing: border-box;
      outline: none;
      border: none;
      background-color: transparent;

      @include placeholder {
        color: $grey;
      }
    }

    &:not(.multiple) &-input {
      width: 100%;
    }

    &-multiple-selected {
      margin-right: 0.25rem;
    }

    &-dropdown {
      position: absolute;
      z-index: 10;
      width: inherit;
      max-height: 200px;
      overflow: auto;
      margin: 0.32rem 0;
      padding: 0.32rem 0;
      background-color: $white;
      box-sizing: border-box;
      border-radius: $radius;
      box-shadow: $shadow-down;
    }

    &-not-found, &-loading {
      text-align: center;
      color: $grey;
    }

    .opt-group-label {
      padding: 0.4rem 0 0.4rem 0.5rem;
      color: $grey-light;
    }

    .option {
      padding: 0.4rem 1rem;
      color: $black-ter;
      white-space: nowrap;
      cursor: pointer;
      transition: background 0.2s ease-in-out;

      &:hover:not(.disabled), &.focused {
        background-color: $white-ter;
      }

      &.disabled {
        color: $grey-light;
        cursor: not-allowed;
      }

      &.selected {
        color: $white;
        background-color: lighten($blue, 10%);

        &:hover, &.focused {
          background-color: $blue;
        }
      }
    }

    &-multiple .option {
      &.selected {
        color: fade($blue, 0.1);
        background-color: $white;

        &:after {
          @include fa-icon;
          content: $fa-var-check;
          font-size: 1.5rem;
        }
      }
    }
  }
</style>
