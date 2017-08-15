import Popper from 'popper.js'

export default {
  props: {
    placement: {
      type: String,
      validator (v) {
        return /^(top|bottom|left|right)(-start|-end)?$/g.test(v)
      },
      default: 'bottom'
    },
    offset: {
      type: [Number, String],
      default: 0
    },
    conf: {
      type: Object,
      default () {
        return {
          modifiers: {
            computeStyle: {
              gpuAcceleration: false
            },
            preventOverflow: {
              padding: 0
            }
          }
        }
      }
    },
    reference: null,
    popper: null
  },

  data () {
    return {
      visible: false
    }
  },

  watch: {
    visible (val) {
      if (val) this.update()
    }
  },

  methods: {
    update () {
      if (this.arbiter) {
        this.arbiter.update()
        return
      }

      let popper = this.popper || this.$refs.popper
      if (popper && popper.$el) popper = popper.$el
      let reference = this.reference || this.$refs.reference
      if (reference && reference.$el) reference = reference.$el

      if (!popper || !reference) return

      // document.body.appendChild(popper)

      const options = this.conf
      options.placement = this.placement
      options.modifiers.offset = {
        offset: this.offset
      }

      this.arbiter = new Popper(reference, popper, {
        ...options,
        onCreate: () => {
          this.resetTransformOrigin(popper)
          this.$nextTick(this.update())
        }
      })
    },

    resetTransformOrigin (popper) {
      const placementMap = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'}
      let placement = popper.getAttribute('x-placement').split('-')[0]
      let origin = placementMap[placement]
      popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`
    }
  },

  beforeDestroy () {
    if (this.arbiter) {
      // document.body.removeChild(this.arbiter.popper)
      this.arbiter.destroy()
      this.arbiter = null
    }
  }
}
