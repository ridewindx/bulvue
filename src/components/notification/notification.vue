<template>
  <div class="notification-container" :style="styles">
    <Item v-for="item in items"
          v-on:close="close"
          :name="item.name" :key="item.name"
          :type="item.type" :title="item.title" :content="item.content"
          :duration="item.duration" :closable="item.closable"
          :icon="item.icon" :on-close="item.onClose">
    </Item>
  </div>
</template>

<script>
  import Item from './item'

  export default {
    name: 'Notification',

    components: { Item },

    data () {
      return {
        duration: 4.5,
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
        options.name = `notification-${this.count++}`
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
      }
    }
  }
</script>

<style lang="scss">
  .notification-container {
    position: fixed;
    width: 335px;
    top: 24px;
    right: 0;
  }
</style>
