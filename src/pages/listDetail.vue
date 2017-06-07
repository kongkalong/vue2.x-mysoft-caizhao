<template>
  <div class="list-detail">
    <header class="detail-header"
            :style="{backgroundImage: 'url(' + detail.ImageUrl + ')'}"></header>
    <div class="detail-cell"
         style="margin-bottom:10px;">
      <h4>{{detail.Title}}</h4>
      <span style="color:#999">截止时间：</span>
      <span style="color:#C70815">{{detail.EndDate | formatDate}}</span>
    </div>
    <div class="detail-cell">
      <div style="margin-bottom:30px;">
        <p>招标类型</p>
        <span>{{detail.Type === '集采' ? '集采' : '项目'}}招标</span>
      </div>
      <div style="margin-bottom:30px;">
        <p>招标类别</p>
        <span>{{detail.ProductTypeShortName}}</span>
      </div>
      <div style="margin-bottom:30px;">
        <p>招标所含区域/项目</p>
        <span>{{detail.RefName}}</span>
      </div>
      <div style="margin-bottom:30px;">
        <p>招标范围</p>
        <span>{{detail.TenderScope}}</span>
      </div>
      <div style="margin-bottom:30px;">
        <p>招标资格要求</p>
        <div class="html-text"
             v-html="detail.QualificationRequirements"></div>
      </div>
      <div style="margin-bottom:30px;"
           v-if="detail.DocName">
        <p>相关文档</p>
        <span>
          <router-link style="color: #029EDB" to="/doc-view">{{detail.DocName}}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'

export default {
  components: {
    dateFormat
  },
  data () {
    return {
      detail: {
        Title: '',
        EndDate: '/Date(1496678400000)/',
        Type: '',
        ProductTypeShortName: '',
        TenderScope: '',
        QualificationRequirements: '',
        RefName: '',
        DocName: '暂无文档',
        PrefixUrl: '',
        FileUrl: '',
        ImageUrl: ''
      },
      docShow: true
    }
  },
  filters: {
    formatDate (value) {
      const res = /\((.+?)\)/
      return dateFormat(parseInt(value.match(res)[1]), 'YYYY-MM-DD')
    }
  },
  methods: {
    getDetail () {
      this.$http({
        method: 'get',
        url: '/list'
      }).then((res) => {
        console.log(res)
        this.detail = res.data.data
      }).catch((res) => {
        console.log(res)
        this.$vux.toast.show({
          type: 'text',
          text: '网络异常',
          position: 'middle'
        })
      })
    }
  },
  created () {
    this.getDetail()
  }
}
</script>

<style lang="less" scoped>
.list-detail header {
  height: 200px;
  background-color: #ddd;
  background-repeat: no-repeat;
  background-origin: border-box;
  background-size: 100% 100%;
  background-position: center;
}

.detail-cell {
  padding: 15px;
  background: #fff;
  h4 {
    font-size: 17px;
    color: #222;
  }
  p {
    font-size: 15px;
    color: #222;
    padding-left: 10px;
    margin-bottom: 10px;
    border-left: 4px solid #C70815;
  }
  span {
    font-size: 14px;
    color: #222;
  }
}

.html-text {
  font-size: 14px;
}
</style>

