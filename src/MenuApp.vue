<template>
  <div id="app">
    <Cols>
      <Col class="is-half">
      <Menu mode="horizontal">
        <MenuItem name="1">
          <Icon icon="fa-book"></Icon>
          内容管理
        </MenuItem>
        <MenuItem name="2">
          <Icon icon="fa-user"></Icon>
          用户管理
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon icon="fa-bar-chart"></Icon>
            统计分析
          </template>
          <MenuItemGroup title="使用">
            <MenuItem name="3-1">新增和启动</MenuItem>
            <MenuItem name="3-2">活跃分析</MenuItem>
            <MenuItem name="3-3">时段分析</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup title="留存">
            <MenuItem name="3-4">用户留存</MenuItem>
            <MenuItem name="3-5">流失用户</MenuItem>
          </MenuItemGroup>
        </Submenu>
        <MenuItem name="4">
          <Icon icon="fa-cog"></Icon>
          综合设置
        </MenuItem>
      </Menu>

      </Col>
      <Menu style="width: 240px">
        <Submenu name="1">
          <template slot="title">
            <Icon icon="fa-book"></Icon>
            内容管理
          </template>
          <MenuItem name="1-1">文章管理</MenuItem>
          <MenuItem name="1-2">评论管理</MenuItem>
          <MenuItem name="1-3">举报管理</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon icon="fa-user"></Icon>
            用户管理
          </template>
          <MenuItem name="2-1">新增用户</MenuItem>
          <MenuItem name="2-2">活跃用户</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon icon="fa-bar-chart"></Icon>
            统计分析
          </template>
          <MenuItemGroup title="使用">
            <MenuItem name="3-1">新增和启动</MenuItem>
            <MenuItem name="3-2">活跃分析</MenuItem>
            <MenuItem name="3-3">时段分析</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup title="留存">
            <MenuItem name="3-4">用户留存</MenuItem>
            <MenuItem name="3-5">流失用户</MenuItem>

            <Submenu name="31">
              <template slot="title">
                <Icon icon="fa-bar-chart"></Icon>
                统计分析
              </template>
              <MenuItemGroup title="使用">
                <MenuItem name="31-1">新增和启动</MenuItem>
                <MenuItem name="31-2">活跃分析</MenuItem>
                <MenuItem name="31-3">时段分析</MenuItem>
              </MenuItemGroup>
              <MenuItemGroup title="留存">
                <MenuItem name="31-4">用户留存</MenuItem>
                <MenuItem name="31-5">流失用户</MenuItem>
              </MenuItemGroup>
            </Submenu>

          </MenuItemGroup>
        </Submenu>
      </Menu>
      <Col>

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
  import { Menu, Submenu, MenuItemGroup, MenuItem } from './components/menu'
  import Icon from './elements/icon'

  export default {
    name: 'app',

    data () {
      return {
      }
    },

    methods: {
    },

    components: {
      Cols,
      Col,
      Menu,
      Submenu,
      MenuItemGroup,
      MenuItem,
      Icon
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
