<template>
  <div class="select-dropdown" :style="{ width: width }">
    <slot></slot>
  </div>
</template>

<script>
  import Popper from '../../../utils/popper'

  export default {
    name: 'Dropdown',

    mixins: [ Popper ],

    props: {
      width: String
    }
  }
</script>
