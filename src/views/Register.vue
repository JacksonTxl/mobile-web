<template>
  <div class="register">
    <mt-header title="帮助注册">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section>
      <mt-field placeholder="18916752085" readonly :value="'推荐码：' + register.parentAccount"></mt-field>
    </section>
    <section>
      <mt-field placeholder="请输入商家手机号码" v-model="register.account"></mt-field>
      <mt-field placeholder="请输入商家微信号" v-model="register.weiXin"></mt-field>
      <mt-field placeholder="请输入商家姓名" v-model="register.userName"></mt-field>
      <mt-field type="password" placeholder="请输入商家初始登录密码" v-model="register.userPassword"></mt-field>
      <mt-field type="password" placeholder="请确认密码" v-model="register.confirmPassword"></mt-field>
    </section>

    <footer style="padding: 0 20px;">
      <mt-button type="primary" style="margin: 15px 0;width: 100%;" @click="commit()">提交</mt-button>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src

import { CookieUtil } from '../util/CookieUtil';
import {TipsUtil} from "../util/TipsUtil";
import {requestPut} from "../http";

export default {
  name: 'register',
  data() {

    return {
      user: {},
      register: {
        parentId: '',
        parentAccount: '',
        account: '',
        weiXin: '',
        userName: '',
        userPassword: '',
        confirmPassword: '',

      },
    }
  },
  methods: {
    commit() {
      if (!this.register.userPassword || this.register.userPassword !== this.register.confirmPassword) {
      	TipsUtil.alert('请正确密码信息!');
      	return;
      }
      this.register.parentAccount = this.user.account;
      requestPut(`/membermanage/users/help`, this.register).then(result => {
        if (result.data.code === '200') {
          TipsUtil.alert('注册成功!');
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
  },
  mounted () {
    this.$nextTick(() => {
      this.user = JSON.parse(CookieUtil.getCookie('user'));
      this.register.parentId = this.user.id;
      this.register.parentAccount = this.user.account;
    })
  }
}
</script>
<style lang="scss" type="text/css">
</style>
