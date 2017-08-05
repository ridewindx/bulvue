<template>
  <transition :name="overlayTransition" appear>
  <div class="modal is-active" v-if="visible">
      <div class="modal-background" @click="clickOverlay"></div>

    <transition :name="modalTransition" appear>
      <div class="modal-content" :style="{ width: width }">
        <slot name="header">
          <div class="modal-header" v-if="!$slots.header && title">{{ title }}</div>
        </slot>

        <div class="modal-body">
          <slot></slot>
        </div>

        <slot name="footer">
          <div class="modal-footer">
            <Button @click="cancel">{{ cancelText }}</Button>
            <Button class="is-info" :loading="okLoading" @click="ok">{{ okText }}</Button>
          </div>
        </slot>

        <Button class="modal-close is-large" v-if="closable" @click="cancel"></Button>

      </div>
    </transition>
  </div>
  </transition>
</template>

<script>
  import Button from '../../elements/button'

  export default {
    name: 'Modal',

    components: { Button },

    props: {
      value: Boolean,
      width: {
        type: String,
        default: '576px'
      },
      closable: {
        type: Boolean,
        default: true
      },
      overlayClosable: {
        type: Boolean,
        default: true
      },
      title: String,
      okText: {
        type: String,
        default: 'Yes'
      },
      cancelText: {
        type: String,
        default: 'No'
      },
      loading: Boolean,
      overlayTransition: {
        type: String,
        default: 'fade'
      },
      modalTransition: {
        type: String,
        default: 'ease'
      }
    },

    data () {
      return {
        okLoading: false
      }
    },

    computed: {
      visible () {
        return this.value
      }
    },

    watch: {
      visible (val) {
        if (!val && this.okLoading) this.okLoading = false
      },
      loading (val) {
        if (!val && this.okLoading) this.okLoading = false
      }
    },

    methods: {
      ok () {
        if (this.loading) {
          this.okLoading = true
        } else {
          this.$emit('input', false)
        }
        this.$emit('ok')
      },

      cancel () {
        this.$emit('input', false)
        this.$emit('cancel')
      },

      clickOverlay () {
        if (this.overlayClosable) this.cancel()
      },

      esc (e) {
        if (this.visible && this.closable && e.keyCode === 27) this.cancel()
      }
    },

    mounted () {
      document.addEventListener('keydown', this.esc)
    },

    beforeDestroy () {
      document.removeEventListener('keydown', this.esc)
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import '~bulma/sass/components/modal';
  @import '../../styles/animations/ease';
  @import '../../styles/animations/fade';

  .modal {
    // z-index: -1;
  }

  .modal-background {
    background-color: rgba($grey-darker, 0.6);
  }

  .modal-content {
    background-color: $white;
    border-radius: $radius-large;

    .modal-header {
      padding: 1rem 1rem;
      border-bottom: 1px solid $grey-lighter;
      font-weight: bold;
      text-align: left;
    }

    .modal-body {
      padding: 1rem;
      font-size: 0.74rem;
      text-align: left;
    }

    .modal-footer {
      padding: 0.75rem 1rem;
      border-top: 1px solid $grey-lighter;
      text-align: right;

      button + button {
        margin-left: 0.5rem;
      }
    }
  }
</style>
