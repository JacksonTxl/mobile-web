<template>
  <div class="home">
    <header>
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <img src="../assets/images/lunbo/1.jpeg" style="height: 140px;width: 100%">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/images/lunbo/2.jpeg" style="height: 140px;width: 100%">
        </mt-swipe-item>
      </mt-swipe>
    </header>
    <section>
      <label>个人信息</label>
      <mt-cell title="ID" :value="user.id"></mt-cell>
      <mt-cell title="等级" :value="user.level_name"></mt-cell>
      <mt-cell title="姓名" :value="user.user_name"></mt-cell>
      <mt-cell title="账户名" :value="user.account"></mt-cell>
    </section>
    <section>
      <label>设置</label>
      <mt-cell title="帮助注册" is-link to="/register/null" ></mt-cell>
      <mt-cell title="申请升级" is-link to="/update" v-if="user.role_id != 2"></mt-cell>
      <mt-cell title="申请升级" v-else></mt-cell>
      <mt-cell title="审核升级" is-link to="/verify" ></mt-cell>
      <mt-cell title="我的团队" is-link to="/team" ></mt-cell>
    </section>
    <section>
      <label>帮助</label>
      <mt-cell title="修改信息" is-link to="/setting" ></mt-cell>
      <mt-cell title="联系客服" is-link to="/service" ></mt-cell>
    </section>
    <footer style="padding: 0 20px;">
      <mt-button type="danger" style="margin: 15px 0;width: 100%;" @click="logOut()">退出登录</mt-button>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { CookieUtil } from '../util/CookieUtil';
import {TipsUtil} from "../util/TipsUtil";

export default {
  name: 'home',
  data() {
    return {
      user: {},
      showQrcode: false
    }
  },
  methods: {
    logOut() {
      this.user = {};
      CookieUtil.deleteCookie('user');
      CookieUtil.deleteCookie('parent');
      this.goRouter('login');
    },
    goRouter (router) {
      this.$router.push(router);
    }
  },
  components: {

  },
  mounted () {
  	this.$nextTick(() => {
       this.user = JSON.parse(CookieUtil.getCookie('user'));
       if (!this.user) {
       	  TipsUtil.alert('请先登录', () => {
       	  	this.goRouter('login');
          })
       }
    })
  }
}
</script>
<style lang="scss" type="text/css">
</style>
