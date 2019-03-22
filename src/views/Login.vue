<template>
  <div class="login">
    <header>
      <img src="../assets/images/1.png" style="width: 100%">
    </header>
    <section>
      <p>靓大夫会员管理系统</p>
      <mt-field label="登录名" placeholder="请输入登录账号" v-model="account"></mt-field>
      <mt-field label="登录密码" placeholder="请输入密码" v-model="password" type="password"></mt-field>
    </section>
    <footer style="padding: 0 20px;">
      <p style="text-align: right;margin: 10px;color: #f50035;" @click="goRouter('setting-pwd')">忘记密码?</p>
      <mt-button type="primary" style="margin: 15px 0;width: 100%;" @click="login()">登录</mt-button>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { requestGet } from '../http';
import { CookieUtil } from '../util/CookieUtil';
import { TipsUtil } from '../util/TipsUtil';


export default {
  name: 'login',
  data() {
    return {
      account: '',
      password: '',
    }
  },
  methods: {
    login() {
      if (!this.account || !this.password) {
      	TipsUtil.alert('请输入正确的登录信息！');
      	return;
      }
      requestGet(`/membermanage/users/${this.account}/${this.password}`, {}).then(result => {
      	if (result.data.code === '200') {
          this.goRouter('home');
          CookieUtil.deleteCookie('user');
          CookieUtil.setCookie('user', JSON.stringify(result.data.info), 24*60*60*1000*365);
          sessionStorage.removeItem('user');
          sessionStorage.setItem('user', JSON.stringify(result.data.info));
        } else {
          TipsUtil.alert(result.data.message);
        }
      });
    },
    goRouter (router) {
      this.$router.push(router);
    }
  },
  components: {
  }
}
</script>
<style lang="scss" type="text/scss">
  .login{
    section{
      text-align: left;
      >p{
        font-size: 20px;
        text-align: center;
        font-weight: 600;
        color: #00a3ff;
      }
    }
  }
</style>
