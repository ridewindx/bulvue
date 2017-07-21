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

    <div class="block">
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
    <Button icon="fa-header" iconPlacement="right" disabled>Hello</Button>

    <router-view></router-view>
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

  export default {
    name: 'app',
    components: {
      Sidebar,
      Cols,
      Col,
      Container,
      Carousel,
      CarouselItem,
      Button
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
