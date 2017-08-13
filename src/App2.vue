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

    <Cols>
      <Col>
      <Slider v-model="value11"></Slider>
      <Slider v-model="value12" range></Slider>
      </Col>
      <Col>
      <Slider v-model="value16" :step="10" show-stops></Slider>
      <Slider v-model="value17" :step="10" show-stops range disabled></Slider>
      </Col>
      <Col>
      <Slider v-model="value18" show-input disabled></Slider>
      </Col>
      <Col>
      </Col>
    </Cols>


    <Cols>
      <Col>
        <Rate v-model="value21"></Rate>
      </Col>
      <Col>
        <Rate v-model="value21" disabled></Rate>
      </Col>
      <Col>
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
  import Slider from './components/slider'
  import Rate from './elements/form/rate'

  export default {
    name: 'app',

    data () {
      return {
        value1: 1,
        value2: 1,
        value6: 1,
        value11: 25,
        value12: [20, 50],
        value16: 30,
        value17: [20, 50],
        value18: 25,
        value21: 1.1
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
      InputNumber,
      Slider,
      Rate
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
