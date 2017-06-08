<template>
  <div class="list-no-login"
       id="list_no_login">
    <swiper :list="swiperList"
            auto
            dots-position="center">
    </swiper>
    <search v-model="searchValue"
            position="absolute"
            placeholder="可通过公司/项目/招标公告进行搜索"
            auto-scroll-to-top
            :autoFixed="false"
            @on-submit="searchSub()">
    </search>
    <group gutter="0">
      <cell v-for="(item, index) in dataList"
            :key="index"
            @click.native="$router.push({ path: '/list-detail/' + item.TenderNoticeGUID })">
        <span style="font-size:15px;"
              slot="title">{{item.Title}}</span>
        <div class="title-icon"
             slot="icon"
             :style="{backgroundImage: 'url(' + item.ImageUrl + ')'}"></div>
        <div slot="after-title">
          <p class="title-2nd">{{item.TenderScope}}
            <i class="vux-1px-r"></i>{{item.Type === '集采' ? '集采' : '项目'}}招标
            <i class="vux-1px-r"></i>{{item.ProductTypeShortName}}</p>
        </div>
        <span class="title-2nd"
              slot="inline-desc">截止时间：{{item.EndDate | formatDate}}</span>
      </cell>
    </group>
    <load-more v-if="dataLoad"
               tip="正在加载"></load-more>
  </div>
</template>

<script>
import { LoadMore, Swiper, Search, Group, Cell, dateFormat } from 'vux'

export default {
  name: 'list-no-login',
  components: {
    LoadMore,
    Swiper,
    Search,
    Group,
    Cell,
    dateFormat
  },
  data () {
    return {
      swiperList: [],
      dataLoad: false,
      dataList: [],
      searchValue: '',
      listPage: 1
    }
  },
  filters: {
    formatDate (value) {
      const res = /\((.+?)\)/
      return dateFormat(parseInt(value.match(res)[1]), 'YYYY-MM-DD')
    }
  },
  methods: {
    getList () {
      setTimeout(() => {
        this.$http({
          method: 'get',
          url: '/list',
          params: {
            searchWord: this.searchValue,
            page: this.listPage
          }
        }).then((res) => {
          this.dataLoad = true
          if (this.listPage === 8) {
            this.dataLoad = false
          }
          for (let i = 1; i < 9; i++) {
            const data = JSON.parse(JSON.stringify(res.data.data))
            data.ImageUrl = '/images/pic' + parseInt(i) + '.jpg'
            this.dataList.push(data)
          }
        }).catch((res) => {
          console.log(res)
          this.$vux.toast.show({
            type: 'text',
            text: '网络异常',
            position: 'middle'
          })
        })
      }, 300)
    },
    getSwiper () {
      this.$http({
        method: 'get',
        url: '/banner'
      }).then((res) => {
        res.data.data.map((item) => {
          const swiper = {
            url: 'javascript:',
            img: item
          }
          this.swiperList.push(swiper)
        })
      }).catch((res) => {
        console.log(res)
        this.$vux.toast.show({
          type: 'text',
          text: '获取轮播数据失败',
          position: 'middle'
        })
      })
    },
    searchSub () {
      this.dataList = []
      this.listPage = 1
      this.getList()
    },
    scrollLoad () {
      if (this.$scrollB() && this.listPage < 9) {
        this.listPage++
        this.getList()
      }
    }
  },
  mounted () {
    this.getList()
    this.getSwiper()
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
  border-radius: 4px;
  background-color: #eee;
  background-repeat: no-repeat;
  background-origin: border-box;
  background-size: 100% 100%;
  background-position: center;
}

.title-2nd {
  color: #A7A7A7;
  font-size: 13px;
  font-weight: 300;
  .vux-1px-r {
    color: #A7A7A7;
    margin-left: 2px;
    margin-right: 5px;
  }
}
</style>

