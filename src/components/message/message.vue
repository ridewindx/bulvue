<template>
  <div class="message-container" :style="styles">
    <Item v-for="item in items"
          v-on:close="close"
          :name="item.name" :key="item.name"
          :type="item.type" :content="item.content"
          :duration="item.duration" :closable="item.closable"
          :icon="item.icon" :on-close="item.onClose">
    </Item>
  </div>
</template>

<script>
  import Item from './item'

  export default {
    name: 'Message',

    components: { Item },

    data () {
      return {
        duration: 1.5,
        top: '20px',
        count: 0,
        items: []
      }
    },

    computed: {
      styles () {
        return {
          top: this.top
        }
      }
    },

    methods: {
      open (options, type) {
        if (typeof options === 'string') options = { content: options }
        options.name = `message-${this.count++}`
        if (type) options.type = type
        if (options.duration === undefined) options.duration = this.duration
        this.items.push(options)

        return () => this.close(options.name)
      },

      close (name) {
        for (let i = 0; i < this.items.length; i++) {
          if (name === this.items[i].name) {
            this.items.splice(i, 1)
            break
          }
        }
      },

      closeAll () {
        this.items = []
      },

      info (options) {
        return this.open(options, 'info')
      },

      success (options) {
        return this.open(options, 'success')
      },

      warning (options) {
        return this.open(options, 'warning')
      },

      error (options) {
        return this.open(options, 'error')
      },

      loading (options) {
        return this.open(options, 'loading')
      }
    }
  }
</script>

<style lang="scss">
  .message-container {
    position: fixed;
    width: 100%;
    left: 0;
  }
</style>
