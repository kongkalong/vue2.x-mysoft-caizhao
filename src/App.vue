<template>
  <div id="app">
    <view-box ref="viewBox"
              body-padding-bottom="0">
      <router-view></router-view>
    </view-box>
  </div>
</template>

<script>
import { ViewBox } from 'vux'

export default {
  name: 'app',
  components: {
    ViewBox
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './assets/less/iconfont.less';

body {
  background-color: #fbf9fe;
  user-select: none;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

#app {
  height: 100%;
}

.weui-search-bar:after,
.weui-search-bar:before {
  border-top: 0 !important;
  border-bottom: 0 !important;
}
</style>
