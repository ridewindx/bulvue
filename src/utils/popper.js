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
      type: Number,
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

      const popper = this.popper || this.$refs.popper
      const reference = this.reference || this.$refs.reference
      if (!popper || !reference) return

      const options = this.conf
      options.placement = this.placement
      options.offset = this.offset

      this.arbiter = new Popper(reference, popper, {
        ...options,
        onCreate: popper => {
          this.resetTransformOrigin()
          this.$nextTick(this.update())
        }
      })
    },

    resetTransformOrigin () {
      const popper = this.popper || this.$refs.popper
      if (!popper) return

      const placementMap = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'}
      let placement = popper.getAttribute('x-placement').split('-')[0]
      let origin = placementMap[placement]
      popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`
    }
  },

  beforeDestroy () {
    if (this.arbiter) {
      this.arbiter.destroy()
      this.arbiter = null
    }
  }
}
