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
    offset: Number,
    conf: {
      type: Object,
      default () {
        return {
          gpuAcceleration: false,
          boundariesElement: 'body',
          boundariesPadding: 0,
          forceAbsolute: true
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
          this.resetTransformOrigin(popper)
          this.$nextTick(this.update())
        }
      })
    },

    resetTransformOrigin (popper) {
      let placementMap = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'}
      let placement = popper.placement
      let origin = placementMap[placement]
      popper.styles.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`
    }
  },

  beforeDestroy () {
    if (this.arbiter) {
      this.arbiter.destroy()
      this.arbiter = null
    }
  }
}
