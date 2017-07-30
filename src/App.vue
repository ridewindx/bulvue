<template>
  <div id="app">
    <!--<sidebar></sidebar>-->
    <!--<Container class="is-fluid">
    <Cols>
      <Col>
        <p class="notification is-info">First column</p>
      </Col>
      <Col>
        <p class="notification is-info">First column</p>
      </Col>
      <Col>
        <p class="notification is-info">First column</p>
      </Col>
    </Cols>
    </Container>

    <Container>
    <Carousel height="150px" trigger="click" indicator-position="outside" arrow="always" type="card">
      <CarouselItem class="notification is-info" v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </CarouselItem>
    </Carousel>
    </Container>

    <img src="./assets/logo.png">-->

    <!--<div class="block">
      <Button>Button</Button>
      <Button class="is-white">White</Button>
      <Button class="is-light">Light</Button>
      <Button class="is-dark">Dark</Button>
      <Button class="is-black">Black</Button>
      <Button class="is-link">Link</Button>
    </div>
    <div class="block">
      <Button class="is-primary is-loading">Primary</Button>
      <Button class="is-info">Info</Button>
      <Button class="is-success">Success</Button>
      <Button class="is-warning">Warning</Button>
      <Button class="is-danger">Danger</Button>
    </div>
    <Button icon="fa-header"></Button>
    <Button class="is-danger is-outlined" icon="fa-times" iconSize="is-small" iconPlacement="right">Delete</Button>
    <Button icon="fa-github">Github</Button>
    <Button icon="fa-header" iconSize="is-small">Hello</Button>
    <Button icon="fa-header" iconPlacement="right">Hello</Button>
    <Button icon="fa-header" iconPlacement="right" disabled>Hello</Button>-->

    <!--<router-view></router-view>-->

    <!--<div class="control">
    <Radio name="Hello" :checked="hello" @change="val => { hello = val }" value="hello-1">Hello-1</Radio>
    <Radio name="Hello" v-model="hello" value="hello-2">Hello-2</Radio>
    </div>
    <p>{{hello}}</p>-->

    <!--<RadioGroup>
      <Radio name="HelloGroup" v-model="helloGroup" value="hello-1">Hello-1</Radio>
      <Radio name="HelloGroup" v-model="helloGroup" value="hello-2">Hello-2</Radio>
    </RadioGroup>
    <p>{{helloGroup}}</p>

    <CheckboxGroup v-model="checks">
      <Checkbox value="check-1" disabled></Checkbox>
      <Checkbox value="check-2" disabled></Checkbox>
    </CheckboxGroup>
    <p>{{checks}}</p>

    <Checkbox v-model="check1" value="check-1" checked></Checkbox>
    <p>{{check1}}</p>-->

    <div class="field">
      <Input type="email" input-class="is-primary" placeholder="Email" icon-left="fa-envelope" icon-right="fa-check" icon-class="is-small" disabled></Input>
    </div>
    <div class="field">
      <Input type="password" class="is-loading" placeholder="Password" icon-left="fa-lock" icon-class="is-small"></Input>
    </div>

    <ScrollView>
      <li>hello-1</li>
      <li>hello-2</li>
      <li>hello-3</li>
    </ScrollView>

  </div>
</template>

<script>
  import Sidebar from './components/Sidebar'
  import Cols from './grid/columns'
  import Col from './grid/column'
  import Container from './layout/container'
  import Carousel from './components/carousel'
  import CarouselItem from './components/carousel-item'

  import Button from './elements/button'
  import Radio from './elements/form/radio'
  import RadioGroup from './elements/form/radio-group'
  import Checkbox from './elements/form/checkbox'
  import CheckboxGroup from './elements/form/checkbox-group'
  import Input from './elements/form/input'

  import ScrollView from './elements/scrollview'

  export default {
    name: 'app',

    data () {
      return {
        hello: 'hello-2',
        helloGroup: 'hello-2',
        checks: ['check-2'],
        check1: null
      }
    },

    components: {
      Sidebar,
      Cols,
      Col,
      Container,
      Carousel,
      CarouselItem,
      Button,
      Radio,
      RadioGroup,
      Checkbox,
      CheckboxGroup,
      Input,
      ScrollView
    }
  }
</script>

<style lang="scss">
  $fa-font-path: "~font-awesome/fonts";
  @import '~font-awesome/scss/font-awesome';

  @import '~bulma';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
