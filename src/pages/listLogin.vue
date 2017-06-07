<template>
  <div class="list-login">
    <sticky scroll-box="vux_view_box_body">
      <tab :line-width="2">
        <tab-item selected
                  @on-item-click="tabClick('全部')">全部</tab-item>
        <tab-item @on-item-click="tabClick('已围标')">已围标</tab-item>
        <tab-item @on-item-click="tabClick('已发标')">已发标</tab-item>
        <tab-item @on-item-click="tabClick('已回标')">已回标</tab-item>
        <tab-item @on-item-click="tabClick('已中标')">已中标</tab-item>
      </tab>
    </sticky>
    <search v-model="searchValue"
            position="absolute"
            auto-scroll-to-top
            :autoFixed="false"
            @on-submit="searchSub()">
    </search>
    <group gutter="0">
      <cell v-for="(item, index) in dataList"
            :key="index">
        <span style="font-size:15px;"
              slot="title">{{item.CgPlanName}}</span>
        <div class="title-icon"
             slot="icon"
             :style="{backgroundImage: 'url(' + item.ImageUrl + ')'}"></div>
        <span class="title-2nd"
              slot="after-title">招标负责人：{{item.ManagerName}}</span>
        <span class="title-2nd"
              slot="inline-desc">当前状态：{{item.BidState}}</span>
      </cell>
    </group>
    <div class="empty"
         v-if="dataList.length === 0">
      <div style="width:100%;height:30%;">
        <!--<img src="../assets/images/empty.png">-->
        <div class="empty-pic"></div>
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { LoadMore, Sticky, Tab, TabItem, Search, Group, Cell } from 'vux'

export default {
  name: 'list-login',
  components: {
    LoadMore,
    Sticky,
    Tab,
    TabItem,
    Search,
    Group,
    Cell
  },
  data () {
    return {
      dataLoad: false,
      dataList: [],
      searchValue: '',
      listPage: 1,
      bidState: '全部',
      guid: ''
    }
  },
  methods: {
    getList () {
      this.$http({
        method: 'get',
        url: 'http://10.5.102.157:14509/home/getUserCenter',
        params: {
          searchWord: this.searchValue,
          page: this.listPage,
          ProviderGUID: this.guid,
          type: this.bidState
        }
      }).then((res) => {
        this.dataLoad = true
        this.dataList = this.dataList.concat(res.data.data)
        if (res.data.data.length < 8) {
          this.dataLoad = false
        }
      }).catch((res) => {
        console.log(res)
        this.$vux.toast.show({
          type: 'text',
          text: '网络异常',
          position: 'middle'
        })
      })
    },
    searchSub () {
      this.dataList = []
      this.listPage = 1
      this.getList()
    },
    tabClick (tab) {
      this.dataList = []
      this.listPage = 1
      this.bidState = tab
      this.getList()
    },
    scrollLoad () {
      if (this.$scrollB()) {
        this.listPage++
        this.getList()
      }
    }
  },
  created () {
    const now = Date.parse(new Date())
    const last = localStorage.lastLoginTime || 0
    if (!localStorage.GUID || now - last >= 2579000000) {
      this.$router.replace({ path: '/login' })
    } else {
      this.guid = localStorage.GUID
    }
  },
  mounted () {
    this.getList()
    document.querySelector('#vux_view_box_body').removeEventListener('scroll', () => this.scrollLoad(), false)
    document.querySelector('#vux_view_box_body').addEventListener('scroll', () => this.scrollLoad(), false)
  },
  beforeDestroy () {
    document.querySelector('#vux_view_box_body').removeEventListener('scroll', () => this.scrollLoad(), false)
  }
}
</script>

<style scoped lang="less">
.title-icon {
  height: 90px;
  width: 120px;
  margin-right: 12px;
  background-color: #eee;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-origin: border-box;
  background-size: 100% 100%;
  background-position: center;
}

.title-2nd {
  display: inline-block;
  color: #A7A7A7;
  font-size: 13px;
  padding-right: 5px;
  font-weight: 300;
}

.empty {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 88px;
  display: flex;
  align-items: center;
  .empty-pic {
    // width: 30%;
    height: 60%;
    margin: 0 auto;
    background: center center no-repeat;
    background-size:auto 100%;
    background-image: url(../assets/images/empty.png);
  }
  p{
    font-size: 13px;
    margin-top: 20px;
    color: #999;
    text-align: center;
  }
}
</style>
