<template>
  <div id="app">
    <Cols>
      <Col>
        <Input-number :max="10" :min="1" v-model="value1" style="width: 100px;"></Input-number>
      </Col>
      <Col>
        <Input-number :max="10" :min="1" :step="1.2" v-model="value2" @input="changeValue2"></Input-number>
      </Col>
      <Col>
        <Input-number v-model="value6" disabled></Input-number>
      </Col>
      <Col>
      </Col>
    </Cols>
  </div>
</template>

<script>
  import Cols from './grid/columns'
  import Col from './grid/column'
  import InputNumber from './elements/form/input-number'

  export default {
    name: 'app',

    data () {
      return {
        value1: 1,
        value2: 1,
        value6: 1
      }
    },

    methods: {
      changeValue2 (v) {
        console.log(v)
      }
    },

    components: {
      Cols,
      Col,
      InputNumber
    }
  }
</script>

<style lang="scss">
  $fa-font-path: "~font-awesome/fonts";
  @import '~font-awesome/scss/font-awesome';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
