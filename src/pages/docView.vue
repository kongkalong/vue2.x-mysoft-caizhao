<template>
  <div class="doc-view">
    <iframe :src="url"
            frameborder="0"
            width="100%"
            height="100%"></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'docUrl'
    ]),
    url () {
      return 'http://view.mysoft.com.cn/redirect/embed.aspx?src=' + this.docUrl
      // return 'http://view.mysoft.com.cn/redirect/embed.aspx?src=http://zyx.mingyuanyun.com/ui/ppt.pptx'
    }
  }
}
</script>

<style>
.doc-view {
  height: 100%;
}
</style>

