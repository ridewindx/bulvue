<template>
  <div class="select" v-click-outside="hideDropdown">

    <div class="select-selection" ref="reference" @click="toggleDropdown">
      <span class="select-placeholder" v-show="hasSelected">{{ placeholder }}</span>

      <div class="select-tag" v-for="(label, index) in multipleSelected">
        <span>{{ label }}</span>
        <Icon icon="fa-times" @click="removeSelected(index)"></Icon>
      </div>

      <span class="select-selected-option" v-show="!multiple && hasSelected && !filterable">{{ singleSelected }}</span>

      <input type="text" class="select-input" ref="input" v-if="filterable"
             v-model="query" :placeholder="!hasSelected ? placeholder : ''">
             <!--@blur="handleBlur" @keydown="" @keydown.delete="">-->

      <Icon icon="fa-times-circle" v-show="showClearIcon" @click="clearSingleSelected"></Icon>
      <Icon icon="fa-caret-down"></Icon>
    </div>

    <transition :name="dropdownTransition">
      <div class="select-dropdown" ref="popper" v-show="showDropdown"
           :style="{ width: dropdownWidth }" :placement="dropdownPlacement">
        <!--<ul>
          <slot></slot>
        </ul>-->

        <ul v-if="Array.isArray(options)">
          <Option v-for="item in options" :label="item.label" :value="item.value" :key="item.value" :disabled="item.disabled"></Option>
        </ul>
        <ul v-else>
          <OptionGroup v-for="(items, lable) in options" :label="lable">
            <Option v-for="item in items" :label="item.label" :value="item.value" :key="item.value" :disabled="item.disabled"></Option>
          </OptionGroup>
        </ul>

        <ul v-show="showNotFound">
          <li>{{ notFoundText }}</li>
        </ul>

        <ul v-show="loading">{{ loadingText }}</ul>

      </div>
    </transition>

  </div>

</template>

<script>
  import Popper from '../../../utils/popper'
  import ClickOutside from '../../../utils/click-outside'
  import Icon from '../../../elements/icon'
  import { findChildComponents } from '../../../utils/find'

  export default {
    name: 'Select',

    mixins: [ Popper ],

    directives: { ClickOutside },

    components: { Icon },

    props: {
      options: [Array, Object],
      value: [String, Number, Array],
      multiple: Boolean,
      disabled: Boolean,
      clearable: Boolean,
      placeholder: String,
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
          return ['top', 'down'].indexOf(v) > -1
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
        query: ''
      }
    },

    computed: {
      classes () {
        return {
          disabled: this.disabled,
          dropdownShown: this.showDropdown,
          multiple: this.multiple,
          clearIconShown: this.showClearIcon
        }
      },

      hasSelected () {
        return this.multiple ? this.value.length : this.value
      },

      showClearIcon () {
        return !this.multiple && this.clearable && ! this.hasSingleSelected
      },

      dropdownTransition () {
        return this.dropdownPlacement === 'bottom' ? 'slide-up' : 'slide-down'
      },

      showDropdown () {
        return this.dropdownVisible && (this.$slots.default || this.loading || (this.fetchFunc && !this.query))
      }
    },

    watch: {
      options (val) {
        this.$nextTick(() => {
          this.updateOpts()
          this.updateOptGroups()
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
      },

      hideDropdown () {
        if (this.dropdownVisible) return
        this.dropdownVisible = false
      },

      updateOpts () {
        this.opts = findChildComponents(this.$refs.popper, 'Option')
      },

      updateOptGroups () {
        this.optGroups = findChildComponents(this.$refs.popper, 'OptGroup')
      },

      handleKeydown (e) {
        if (!this.visible) return

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
        let opt
        if (value === undefined) {
          opt = this.opts[this.focusedIndex]
          value = opt.value
        } else {
          for (const o of this.opts) {
            if (o.value === value) {
              opt = o
              break
            }
          }
        }

        opt.selected = true

        if (this.multiple) {
          if (this.value.indexOf(value) < 0) {
            this.$emit('input', this.value.concat(value))
            this.update()
          }

          if (this.filterable) {
            this.query = ''
            this.$refs.input.focus()
          }
        } else if (value === this.value) {
          this.hideDropdown()
        } else {
          this.$emit('input', value)

          if (this.filterable) {
            this.query = opt.label ? opt.label : opt.value
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
        value.splice(index, 1)
        this.$emit('input', value)

        if (this.filterable) {
          this.$refs.input.focus()
        }
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
    },

    beforeDestroy () {
      document.removeEventListener('keydown', this.handleKeydown)
    }
  }
</script>
