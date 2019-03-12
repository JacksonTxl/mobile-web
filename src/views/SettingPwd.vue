<template>
  <div class="setting-pwd-info">
    <mt-header title="修改密码">
      <router-link to="/setting" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="user.account" readonly></mt-field>
      <mt-field label="验证码" v-model="user.msg">
        <mt-button @click="sendCode()" :disabled="isSend">{{label}}</mt-button>
      </mt-field>
      <mt-field label="新密码" placeholder="请输入新密码" v-model="user.password" type="password"></mt-field>
      <mt-field label="确认密码" placeholder="请输入确认密码" v-model="user.confirmPassword" type="password"></mt-field>
    </section>
    <footer style="padding: 0 20px;">
      <mt-button type="primary" style="margin: 15px 0;width: 100%;" @click="commit()">提交</mt-button>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { Field } from 'mint-ui';
import { Header } from 'mint-ui';
import {CookieUtil} from "../util/CookieUtil";
import {TipsUtil} from "../util/TipsUtil";
import {requestGet, requestPut} from "../http";

export default {
  name: 'setting-pwd',
  data() {
    return {
    	isSend: false,
    	timer: '',
    	label: '发送验证码',
	    user: {
		    account: '',
            password: '',
            confirmPassword: '',
            msg: '',
	    }
    }
  },
  methods: {
  	sendCode () {
      requestGet(`/membermanage/users/msg/${this.user.account}`, {}).then(result => {
          if (result.data.code === '200') {
          	  this.isSend = true;
	          let times = 60;
	          this.timer = setInterval(() => {
          	  	if (times > 0) {
          	  		this.label = times + 's重新发送';
          	  		times--;
                } else {
          	  		clearInterval(this.timer);
                    this.label = times + '发送验证码';
                    this.isSend = false;
                }

              }, 1000);
              TipsUtil.alert('发送成功!');

          } else {
              TipsUtil.alert(result.data.message);
          }
      });
    },
    commit() {
      if (!this.user.password || !this.user.confirmPassword || !this.user.msg) {
          TipsUtil.alert('请填写正确信息!');
          return;
      }
      if (this.user.password !== this.user.confirmPassword) {
	      TipsUtil.alert('两次输入密码不一致!');
	      return;
      }
      requestPut(`/membermanage/users/info`, this.user).then(result => {
          if (result.data.code === '200') {
              TipsUtil.alert('修改成功!', this.goRouter('setting'));
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
    Header,
    Field,
  },
  mounted () {
    this.$nextTick(() => {
        const user = JSON.parse(CookieUtil.getCookie('user'));
        this.user.account = user.account;
    })
  }
}
</script>
<style lang="scss" type="text/css">
</style>
