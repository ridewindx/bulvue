import Popper from 'popper.js'

export default {
  props: {
    value: Boolean,
    placement: {
      type: String,
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
    reference: Object,
    popper: Object
  },
  data () {
    return {
      visible: this.value,
      arbiter: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.visible = val
        this.$emit('input', val)
      }
    },
    visible (val) {
      if (val) {
        this.update()
      } else {
        this.$emit('popperhide')
      }
      this.$emit('input', val)
    }
  },
  methods: {
    update () {
      if (this.arbiter) {
        this.arbiter.update()
        return
      }

      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.placement)) {
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
          this.$emit('created', this)
        }
      })
    },

    destroy () {
      if (this.arbiter) {
        this.arbiter.destroy()
        this.arbiter = null
      }
    },

    resetTransformOrigin (popper) {
      let placementMap = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'}
      let placement = popper.placement
      let origin = placementMap[placement]
      popper.styles.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`
    }
  },

  beforeDestroy () {
    this.destroy()
  }
}
