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

    <!--<div class="field">
      <Input type="email" input-class="is-primary" placeholder="Email" icon-left="fa-envelope" icon-right="fa-check" icon-class="is-small" disabled></Input>
    </div>
    <div class="field">
      <Input type="password" class="is-loading" placeholder="Password" icon-left="fa-lock" icon-class="is-small"></Input>
    </div>

    <div class="field">
      <Textarea placeholder="Primary textarea" textarea-class="is-primary"></Textarea>
    </div>
    <div class="field">
      <Textarea placeholder="Primary textarea" textarea-class="is-info" disabled></Textarea>
    </div>-->

    <!--<Popover trigger="hover" title="提示标题" content="提示内容">
      <Button>hover 激活</Button>
    </Popover>
    <Popover title="提示标题" content="提示内容">
      <Button>click 激活</Button>
    </Popover>
    <Popover trigger="focus" title="提示标题" content="提示内容">
      <Button>focus 激活</Button>
    </Popover>
    <Popover trigger="focus" title="提示标题" content="提示内容">
      <Input placeholder="输入框的 focus"></Input>
    </Popover>

    <div class="top">
      <Popover title="提示标题" content="提示内容" placement="top-start">
        <Button>上左</Button>
      </Popover>
      <Popover title="提示标题" content="提示内容" placement="top">
        <Button>上边</Button>
      </Popover>
      <Popover title="提示标题" content="提示内容" placement="top-end">
        <Button>上右</Button>
      </Popover>
    </div>
    <div class="center">
      <div class="center-left">
        <Popover title="提示标题" content="提示内容" placement="left-start">
          <Button>左上</Button>
        </Popover><br><br>
        <Popover title="提示标题" content="提示内容" placement="left">
          <Button>左边</Button>
        </Popover><br><br>
        <Popover title="提示标题" content="提示内容" placement="left-end">
          <Button>左下</Button>
        </Popover>
      </div>
      <div class="center-right">
        <Popover title="提示标题" content="提示内容" placement="right-start">
          <Button>右上</Button>
        </Popover><br><br>
        <Popover title="提示标题" content="提示内容" placement="right">
          <Button>右边</Button>
        </Popover><br><br>
        <Popover title="提示标题" content="提示内容" placement="right-end">
          <Button>右下</Button>
        </Popover>
      </div>
    </div>
    <div class="bottom">
      <Popover title="提示标题" content="提示内容" placement="bottom-start">
        <Button>下左</Button>
      </Popover>
      <Popover title="提示标题" content="提示内容" placement="bottom">
        <Button>下边</Button>
      </Popover>
      <Popover title="提示标题" content="提示内容" placement="bottom-end">
        <Button>下右</Button>
      </Popover>
    </div>

    <Popover v-model="visible">
      <a>click 激活</a>
      <div slot="title"><i>自定义标题</i></div>
      <div slot="content">
        <a @click="close">关闭提示框</a>
      </div>
    </Popover>


    <Popover
      confirm
      title="您确认删除这条内容吗？"
      @ok="ok"
      @cancel="cancel">
      <Button>删除</Button>
    </Popover>
    <Popover
      confirm
      title="Are you sure delete this task?"
      @ok="ok"
      @cancel="cancel"
      ok-text="确定"
      cancel-text="取消">
      <Button>国际化</Button>
    </Popover>-->

    <!--<OnOff>
      <span slot="open">开</span>
      <span slot="close">关</span>
    </OnOff>
    <OnOff>
      <Icon icon="fa-check" slot="open"></Icon>
      <Icon icon="fa-close" slot="close"></Icon>
    </OnOff>
    <br><br>
    <OnOff size="large">
      <span slot="open">开启</span>
      <span slot="close">关闭</span>
    </OnOff>
    <OnOff size="large">
      <span slot="open">ON</span>
      <span slot="close">OFF</span>
    </OnOff>

    <OnOff size="small"></OnOff>
    <OnOff disabled></OnOff>-->

    <!--<Alert>消息提示文案</Alert>
    <Alert type="success">成功提示文案</Alert>
    <Alert type="warning">警告提示文案</Alert>
    <Alert type="error">错误提示文案</Alert>

    <Alert>
      消息提示文案
      <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
    </Alert>
    <Alert type="success">
      成功提示文案
      <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
    </Alert>
    <Alert type="warning">
      警告提示文案
      <template slot="desc">
        警告的提示描述文案警告的提示描述文案警告的提示描述文案
      </template>
    </Alert>
    <Alert type="error">
      错误提示文案
      <span slot="desc">
            自定义错误描述文案。
        </span>
    </Alert>


    <Alert icon>消息提示文案</Alert>
    <Alert type="success" icon>成功提示文案</Alert>
    <Alert type="warning" icon>警告提示文案</Alert>
    <Alert type="error" icon>错误提示文案</Alert>
    <Alert icon>
      消息提示文案
      <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
    </Alert>
    <Alert type="success" icon>
      成功提示文案
      <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
    </Alert>
    <Alert type="warning" icon>
      警告提示文案
      <template slot="desc">
        警告的提示描述文案警告的提示描述文案警告的提示描述文案
      </template>
    </Alert>
    <Alert type="error" icon>
      错误提示文案
      <span slot="desc">
            自定义错误描述文案。
        </span>
    </Alert>
    <Alert icon>
      自定义图标
      <Icon icon="fa-github" size="is-medium" slot="icon"></Icon>
      <template slot="desc">自定义图标文案自定义图标文案自定义图标文案自定义图标文案自定义图标文案</template>
    </Alert>

    <Alert closable>消息提示文案</Alert>
    <Alert type="success" icon closable>
      成功提示文案
      <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
    </Alert>
    <Alert type="warning" closable>
      自定义关闭内容
      <span slot="close">不再提示</span>
    </Alert>

    <Alert banner type="warning">通知：通知内容。。。</Alert>
    <Alert banner closable type="warning">通知：通知内容。。。</Alert>-->

    <!--<Cols>
      <Col class="is-one-quarter">
    <Card bordered>
      <p slot="headerTitle">Component</p>
      <Icon slot="headerExtra" icon="fa-angle-down"></Icon>
      <Img slot="image" size="is-4by3" src="http://bulma.io/images/placeholders/1280x960.png" alt="Image"></Img>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      </div>
      <template slot="footer">
        <a>Save</a>
        <a>Edit</a>
        <a>Delete</a>
      </template>
    </Card>
      </Col>

      <Col>
      <Card>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.
      </Card>
      </Col>

      <Col>
      <Card nohover>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.
      </Card>
      </Col>

      <Col>
      <Card noshadow>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.
      </Card>
      </Col>

      <Col>
      <Card bordered noshadow>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.
      </Card>
      </Col>
    </Cols>-->

    <!--<Button @click="openMessage">Open message</Button>
    <Button @click="closeMessages">Close messages</Button>
    <Button @click="messageHandle()">Close success message</Button>
    <Button @click="openNotify">Open notify</Button>
    <Button @click="openNotifyContent">Open notify content</Button>
    <Button @click="closeNotify">Close notify</Button>
    <Button @click="notifyHandle()">Close success notify</Button>-->

    <Button loading>加载中</Button>
    <Button class="is-primary" :loading="loading" @click="loading = !loading">
      <span v-if="!loading">Click me!</span>
      <span v-else>Loading...</span>
    </Button>
    <Button class="is-warning" :loading="loading2" icon="fa-github" @click="loading2 = !loading2">
      <span v-if="!loading2">Click me!</span>
      <span v-else>Loading...</span>
    </Button>


    <Button @click="modal1 = true">显示对话框</Button>
    <Modal
      loading
      v-model="modal1"
      title="普通的Modal对话框标题"
      @ok="okModal"
      @cancel="cancelModal">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </Modal>

    <!--<ScrollView>
      <li>hello-1</li>
      <li>hello-2</li>
      <li>hello-3</li>
    </ScrollView>-->

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
  import Textarea from './elements/form/textarea'

  import ScrollView from './elements/scrollview'

  import Input from './elements/form/input'
  import Popover from './elements/popover'

  import OnOff from './elements/form/on-off'

  import Icon from './elements/icon'
  import Alert from './elements/alert'

  import Img from './elements/image'
  import Card from './components/card'

  import Message from './components/message'
  import Notification from './components/notification'

  import Vue from 'vue'
  Vue.prototype.$Message = Message
  Vue.prototype.$Message.duration = 3
  Vue.prototype.$Notification = Notification

  import Modal from './components/modal'

  export default {
    name: 'app',

    data () {
      return {
        hello: 'hello-2',
        helloGroup: 'hello-2',
        checks: ['check-2'],
        check1: null,
        visible: false,
        messageHandle: null,
        notifyHandle: null,
        modal1: false,
        loading: false,
        loading2: false
      }
    },

    methods: {
      close () {
        this.visible = false
      },
      ok () {
        console.log('ok')
      },
      cancel () {
        console.log('cancel')
      },
      openMessage () {
        this.$Message.info({
          content: '这是一条普通的提醒',
          duration: 10,
          closable: true
        })
        this.messageHandle = this.$Message.success({
          content: '这是一条普通的提醒',
          duration: 20
        })
        this.$Message.warning('这是一条普通的提醒')
        this.$Message.error('这是一条普通的提醒')
        this.$Message.loading('这是一条普通的提醒')
      },
      closeMessages () {
        this.$Message.closeAll()
      },
      openNotify () {
        this.$Notification.info({
          title: '这是一条普通的提醒',
          duration: 2,
          closable: true
        })
        /* this.messageHandle = this.$Message.success({
          content: '这是一条普通的提醒',
          duration: 20
        })
        this.$Message.warning('这是一条普通的提醒')
        this.$Message.error('这是一条普通的提醒')
        this.$Message.loading('这是一条普通的提醒') */
      },
      openNotifyContent () {
        this.$Notification.error({
          title: '这是一条普通的提醒',
          content: '这是一条普通的提醒这是一条普通的提醒这是一条普通的提醒这是一条普通的提醒这是一条普通的提醒这是一条普通的提醒这是一条普通的提醒',
          duration: 1.5,
          closable: true
        })
        this.$Notification.open({
          title: '这是一条普通的提醒',
          content: '这是一条普通的提醒这是一条普通的提醒这是一条普通的提醒这是一条普通的提醒这是一条普通的提醒这是一条普通的提醒这是一条普通的提醒',
          duration: 3,
          closable: true
        })
        this.$Notification.open({
          title: '这是一条普通的提醒',
          duration: 2,
          closable: true
        })
      },
      closeNotify () {
        this.$Notification.closeAll()
      },
      okModal () {
        console.log('ok')
        setTimeout(() => { this.modal1 = false }, 2000)
      },
      cancelModal () {
        console.log('cancel')
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
      Textarea,
      ScrollView,
      Input,
      Popover,
      OnOff,
      Icon,
      Alert,
      Img,
      Card,
      Modal
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
