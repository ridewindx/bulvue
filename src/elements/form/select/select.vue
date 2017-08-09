<template>
  <div class="select" :class="classes" v-click-outside="hideDropdown" :tabindex="tabindex"
       @keydown.enter.prevent="handleKeydownEnter"
       @keydown.tab="hideDropdown" @keydown.esc="hideDropdown"
       @keydown.down.prevent="handleKeydownArrow('down')" @keydown.up.prevent="handleKeydownArrow('up')">

    <div class="select-selection" ref="reference" @click="toggleDropdown">

      <span class="select-placeholder" v-show="!hasSelected && !filterable">{{ placeholder }}</span>

      <div class="select-multiple-selected" v-if="multipleSelected.length">
        <div class="select-multiple-selected-item" v-for="(label, index) in multipleSelected">
          <span>{{ label }}</span>
          <Icon icon="fa-times" @click.native.stop="removeSelected(index)"></Icon>
        </div>
      </div>

      <span class="select-single-selected" v-show="!multiple && hasSelected && !filterable">{{ singleSelected }}</span>

      <input type="text" class="select-input" ref="input" v-if="filterable"
             v-model="query" :placeholder="!hasSelected ? placeholder : ''"
             @focus="handleFocus" @blur="handleBlur" @keydown.esc="hideDropdown">
             <!--@keydown="" @keydown.delete="">-->

      <Icon icon="fa-times-circle" class="icon-clear" v-show="showClearIcon" @click.native.stop="clearSingleSelected"></Icon>
      <Icon icon="fa-caret-down" class="icon-arrow"></Icon>

    </div>

    <transition :name="dropdownTransition">
      <Dropdown ref="popper" v-show="dropdownVisible"
                :reference="$refs.reference" :popper="$refs.popper"
                :width="dropdownWidth" :placement="dropdownPlacement">

        <ul v-if="Array.isArray(options)">
          <Option v-for="item in options" :label="item.label" :value="item.value" :key="item.value" :disabled="item.disabled"></Option>
        </ul>

        <ul v-else>
          <OptGroup v-for="(items, label) in options" :label="label" :key="label">
            <Option v-for="item in items" :label="item.label" :value="item.value" :key="item.value" :disabled="item.disabled"></Option>
          </OptGroup>
        </ul>

        <ul class="select-not-found" v-show="notFound">
          <li>{{ notFoundText }}</li>
        </ul>

        <ul class="select-loading" v-show="loading">{{ loadingText }}</ul>

      </Dropdown>
    </transition>

  </div>

</template>

<script>
  import isEmpty from 'lodash/isEmpty'
  // import Popper from '../../../utils/popper'
  import ClickOutside from '../../../utils/click-outside'
  import Icon from '../../../elements/icon'
  import { findChildComponents, findParentComponent } from '../../../utils/find'
  // import { addResizeListener, removeResizeListener } from '../../../utils/resize-event'
  import Dropdown from './dropdown'
  import OptGroup from './opt-group'
  import Option from './option'

  export default {
    name: 'Select',

    // mixins: [ Popper ],

    directives: { ClickOutside },

    components: { Icon, Dropdown, OptGroup, Option },

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
        queryResultIndex: -1,
        queryFromInput: true,
        notFound: false,
        focusedIndex: 0,
        lastSelectedIndex: 0
      }
    },

    computed: {
      classes () {
        return {
          'disabled': this.disabled,
          'dropdown-shown': this.dropdownVisible,
          'multiple': this.multiple,
          'clear-icon-shown': this.showClearIcon
        }
      },

      tabindex () {
        if (this.filterable || this.disabled) return -1
        else return 0
      },

      hasSelected () {
        return this.multiple ? this.value.length : this.value
      },

      showClearIcon () {
        return !this.multiple && this.clearable && this.hasSelected
      },

      dropdownTransition () {
        return this.dropdownPlacement === 'bottom' ? 'slide-up' : 'slide-down'
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
          if (!val) return

          for (const opt of this.opts) {
            if (val === opt.value) {
              this.singleSelected = opt.label
              if (this.filterable) this.query = opt.label
              break
            }
          }
        }
      },

      query (val) {
        this.$emit('queryChanged', val)

        if (!this.queryFromInput) {
          this.queryFromInput = true
          return
        }

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
          if (!this.dropdownVisible) this.showDropdown()

          val = val.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1')
          const re = new RegExp(val, 'i')
          let groups = new Set(this.optGroups)
          let firstOptIndex
          for (let i = 0; i < this.opts.length; ++i) {
            const opt = this.opts[i]
            if (re.test(opt.label)) {
              let group = findParentComponent(opt, 'OptGroup')
              if (group && groups.has(group)) {
                group.visible = true
                groups.delete(group)
              }
              opt.visible = true
              if (firstOptIndex === undefined) firstOptIndex = i
              else if (this.lastSelectedIndex === i) firstOptIndex = i
            } else {
              opt.visible = false
            }
          }
          groups.forEach(group => { group.visible = false })
          if (firstOptIndex !== undefined) {
            this.navigateOption('down', firstOptIndex)
            this.notFound = false
            this.queryResultIndex = firstOptIndex
          } else {
            this.notFound = true
            this.queryResultIndex = -1
          }
        }
      }
    },

    methods: {
      toggleDropdown () {
        if (this.disabled) return

        if (this.dropdownVisible) this.hideDropdown()
        else this.showDropdown()
      },

      showDropdown () {
        if (this.dropdownVisible) return
        if (this.disabled) return
        if (!(!isEmpty(this.options) || this.loading || (this.fetchFunc && !this.query))) return

        this.dropdownVisible = true
        if (this.dropdownVisible) {
          this.focusedIndex = this.lastSelectedIndex
          this.opts.forEach(opt => { opt.focused = false })
          this.opts[this.focusedIndex].focused = true
          this.$nextTick(() => {
            if (!this.filterable) this.setOptsVisible()
            this.scrollOption()
          })
        }
      },

      hideDropdown () {
        if (!this.dropdownVisible) return
        this.dropdownVisible = false

        if (this.queryResultIndex > -1) {
          if (!this.multiple) {
            const opt = this.opts[this.queryResultIndex]
            if (this.queryResultIndex !== this.lastSelectedIndex) {
              this.selectOption(opt.value)
            }
            this.queryFromInput = false
            this.query = opt.label
          }
        }
      },

      updateOpts () {
        this.opts = findChildComponents(this, 'Option')
        this.optGroups = findChildComponents(this, 'OptGroup')
      },

      setOptsVisible () {
        this.opts.forEach(opt => { opt.visible = true })
        this.optGroups.forEach(group => { group.visible = true })
      },

      handleKeydownEnter () {
        if (!this.dropdownVisible) this.showDropdown()
        else this.selectOption()

        if (this.filterable) this.$refs.input.focus()
      },

      handleKeydownArrow (direction) {
        if (!this.dropdownVisible) this.showDropdown()
        else this.navigateOption(direction)

        if (this.filterable) this.$refs.input.focus()
      },

      navigateOption (direction, index) {
        const opts = this.opts

        if (index === undefined) {
          if (direction === 'down') {
            if (this.focusedIndex >= opts.length - 1) this.focusedIndex = 0
            else ++this.focusedIndex
          } else if (direction === 'up') {
            if (this.focusedIndex <= 0) this.focusedIndex = opts.length - 1
            else --this.focusedIndex
          }
        } else {
          this.focusedIndex = index
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
        const dropdown = this.$refs.popper.$el
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
          const index = this.value.indexOf(value)
          if (index < 0) {
            this.$emit('input', this.value.concat(value))
            opt.selected = true
          } else {
            let v = this.value.slice()
            v.splice(index, 1)
            this.$emit('input', v)
            opt.selected = false
          }

          if (this.filterable) {
            this.query = ''
            this.$refs.input.focus()
          }
        } else {
          this.hideDropdown()

          if (value !== this.value) {
            this.$emit('input', value)

            for (const o of this.opts) o.selected = false
            opt.selected = true
            this.lastSelectedIndex = lastSelectedIndex
          }
        }
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
        const v = value.splice(index, 1)[0]
        this.$emit('input', value)

        for (let i = 0; i < this.opts.length; ++i) {
          if (this.opts[i].value === v) this.opts[i].selected = false
        }

        if (this.filterable) {
          this.$refs.input.focus()
        }
      },

      clearSingleSelected () {
        this.opts[this.lastSelectedIndex].selected = false
        this.lastSelectedIndex = 0
        if (this.filterable) this.query = ''
        this.$emit('input', undefined)
      },

      handleFocus () {
      },

      handleBlur () {
      }
    },

    created () {
      if (Array.isArray(this.options)) {
        for (let option of this.options) {
          if (option.label === undefined) option.label = option.value
        }
      } else {
        for (let optGroupLabel in this.options) {
          for (let option of this.options[optGroupLabel]) {
            if (option.label === undefined) option.label = option.value
          }
        }
      }

      if (this.multiple) {
        if (!Array.isArray(this.value)) {
          if (this.value === undefined) this.$emit('input', [])
          else this.$emit('input', [this.value])
        }
      } else if (Array.isArray(this.value)) {
        let value = this.value.length ? this.value[0] : undefined
        this.$emit('input', value)
      }
    },

    mounted () {
      this.showSelected()

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
    }
  }
</script>

<style lang="scss">
  $fa-font-path: "~font-awesome/fonts";
  @import '~font-awesome/scss/font-awesome';
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/base/_all";
  @import "../../../styles/variables";
  @import "../../../styles/animations/slide";

  .select {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    text-align: left;
    font-size: 0.75rem;
    line-height: 1rem;

    &-selection {
      position: relative;
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
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-placeholder {
      color: $grey;
    }

    &:not(.multiple) &-selection {
      position: relative;
      height: 2.25rem;

      .select-placeholder, .select-single-selected {
        padding-left: 0.5rem;
        padding-right: 1.5rem;
      }
    }

    &.multiple &-selection {
      padding: 0 1.5rem 0 0.25rem;
      min-height: 2.25rem;

      .select-placeholder {
        padding-left: 0.25rem;
        padding-right: 1.5rem;
      }
    }

    &-input {
      position: relative;
      display: inline-block;
      height: calc(2.25rem - 2px);
      padding: 0 1.5rem 0 0.5rem;
      box-sizing: border-box;
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 0.75rem;

      @include placeholder {
        color: $grey;
      }
    }

    &:not(.multiple) &-input {
      width: 100%;
    }

    &-multiple-selected {
      margin: 0.125rem 0;
    }

    &-multiple-selected-item {
      display: inline-block;
      margin: 0.125rem 0.25rem 0.125rem 0;
      padding: 0.25rem 0.5rem;
      border: 1px solid $grey-lighter;
      border-radius: $radius;
      background-color: $white-bis;

      .fa {
        color: $grey-light;
        font-weight: lighter;

        &:hover {
          color: $grey;
        }
      }
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

      li {
        padding: 0.2rem 0 0.2rem 0;
      }
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

    &.multiple .option {
      &.selected {
        color: lighten($blue, 10%);
        background-color: $white;

        &:hover, &.focused {
          background-color: $white-ter;
        }

        &:after {
          float: right;
          @include fa-icon;
          content: $fa-var-check;
          font-size: 0.875rem;
          color: lighten($blue, 25%);
        }
      }
    }
  }
</style>
