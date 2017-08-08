<template>
  <div id="app">
    <Cols>
      <Col>
        <Select v-model="model1" style="width:200px" :options="cityList">
        </Select>
      </Col>
      <Col>
        <p>{{ model1 }}</p>
      </Col>
      <Col>
        <Select v-model="model5" disabled style="width:200px" :options="cityList">
        </Select>
      </Col>
      <Col>
        <Select v-model="model6" style="width:200px" :options="cityList1">
        </Select>
      </Col>
    </Cols>
    <Cols>
    <Col>
      <Select v-model="model7" style="width:200px" :options="cityList2" clearable>
      </Select>
    </Col>
      <Col>
      {{ cityList2 }}
      </Col>
    </Cols>
  </div>
</template>

<script>
  import Cols from './grid/columns'
  import Col from './grid/column'
  import Select from './elements/form/select'

  export default {
    name: 'app',

    data () {
      return {
        cityList: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
        cityList1: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市',
            disabled: true
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市',
            disabled: true
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
        cityList2: {
          '热门城市': [
            {
              value: 'beijing',
              label: '北京市'
            },
            {
              value: 'shanghai',
              label: '上海市'
            },
            {
              value: 'shenzhen',
              label: '深圳市'
            },
            {
              value: '111',
              label: '111'
            },
            {
              value: '222',
              label: '222'
            },
            {
              value: '333',
              label: '333'
            }
          ],
          '其它城市': [
            {
              value: 'hangzhou',
              label: '杭州市'
            },
            {
              value: 'nanjing',
              label: '南京市'
            },
            {
              value: 'chongqing',
              label: '重庆市'
            }
          ]
        },
        model1: '',
        model5: '',
        model6: '',
        model7: ''
      }
    },

    methods: {
    },

    components: {
      Cols,
      Col,
      Select
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
