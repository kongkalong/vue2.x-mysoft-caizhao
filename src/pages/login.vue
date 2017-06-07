<template>
  <div class="login">
    <div class="login-flex">
      <div class="login-logo">
        <img src="../assets/images/logo.png"
             alt=""
             height="40px">
      </div>
      <div class="login-form">
        <div class="login-input vux-1px-b">
          <label for="user"
                 class="icon iconfont icon-people"></label>
          <input id="user"
                 v-model="user"
                 placeholder="账号"></input>
        </div>
  
        <div class="login-input vux-1px-b">
          <label for="pass"
                 class="icon iconfont icon-lock"></label>
          <input id="pass"
                 v-model="pass"
                 type="password"
                 placeholder="密码"></input>
        </div>
  
        <div class="login-submit">
          <x-button type="primary"
                    @click.native="loginSubmit">登录</x-button>
        </div>
      </div>
      <footer class="login-footer">
        <p>
          说明：
          <br> 登陆账号为您在我司的外网注册的账号和密码； 我司的外网地址：http://sys.rxgcn.com:8200/； 如遗忘账号和密码，请及时***，电话：**********
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
import { Loading, Toast, XButton, md5 } from 'vux'

export default {
  name: 'Login',
  components: {
    Loading,
    Toast,
    XButton,
    md5
  },
  data () {
    return {
      msg: 'Hello World!',
      user: '',
      pass: '',
      LoginData: {}
    }
  },
  methods: {
    loginSubmit () {
      this.$vux.loading.show({
        text: '登录中...'
      })
      this.$http({
        method: 'post',
        url: 'http://10.5.102.157:14509/home/login',
        params: {
          loginCode: this.user,
          passWord: md5(this.pass)
        }
      }).then((res) => {
        this.$vux.loading.hide()
        if (res.data.state === '0') {
          this.$vux.toast.show({
            text: res.data.data,
            type: 'cancel',
            width: '180px'
          })
        } else {
          const _this = this
          this.$vux.toast.show({
            text: '登录成功！',
            onHide () {
              _this.$router.push({ path: '/' })
              localStorage.GUID = res.data.data.ProviderGUID
              localStorage.lastLoginTime = Date.parse(new Date())
            }
          })
        }
      }).catch((res) => {
        console.log(res)
        this.$vux.toast.show({
          type: 'text',
          text: '网络异常',
          position: 'middle'
        })
      })
    }
  }
}
</script>

<style scoped>
.login {
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.login-flex {
  width: 100%;
}

.login-logo {
  text-align: center;
  margin-bottom: 60px;
  font-size: 16px;
}

.login-form {
  padding: 0 50px;
}

.login-input {
  box-sizing: border-box;
  margin: 25px auto 0;
  padding: 5px 10px;
}

.login-input input {
  background-color: inherit;
  border: 0;
  font-size: 14px;
  vertical-align: top;
  line-height: 24px;
}

.login-input .icon {
  display: inline-block;
  min-width: 17px;
  font-size: 20px;
  line-height: 24px;
  margin-right: 18px;
  color: #B2B2B2;
}

.login-submit {
  margin-top: 30px;
  text-align: center;
}

.login-submit button {
  border: 0;
  border-radius: 44px;
  margin-bottom: 40px;
}

.login-footer {
  position: absolute;
  width: 100%;
  bottom: 30px;
  box-sizing: border-box;
  padding: 0 50px;
  color: #999;
  font-size: 12px;
}
</style>
