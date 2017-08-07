<template>
  <li class="option" :class="classes" v-show="visible"
      @click="select" @mouseout="focused = false">
    <slot>{{ label ? label : value }}</slot>
  </li>
</template>

<script>
  import Emit from '../../../utils/emit'

  export default {
    name: 'Option',

    mixins: [{ methods: Emit }],

    props: {
      value: {
        type: [String, Number],
        required: true
      },
      label: String,
      disabled: Boolean
    },

    data () {
      return {
        visible: true,
        focused: false,
        selected: false,
        content: ''
      }
    },

    computed: {
      classes () {
        return {
          disabled: this.disabled,
          focused: this.focused,
          selected: this.selected
        }
      }
    },

    methods: {
      select () {
        if (this.disabled) return

        this.$emitUp('Select', 'selected', this.value)
      }
    },

    mounted () {
      this.content = this.$el.innerHTML

      this.$on('queryChanged', val => {
        val = val.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1')
        this.visible = new RegExp(val, 'i').test(this.content)
      })
    }
  }
</script>
