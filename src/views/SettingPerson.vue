<template>
  <div class="setting-person-info">
    <mt-header title="我的资料">
      <router-link to="/setting" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section>
      <mt-field label="姓名" placeholder="请输入姓名" v-model="user.userName"></mt-field>
      <mt-field label="微信号" placeholder="请输入微信号" v-model="user.weiXin"></mt-field>
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
import {TipsUtil} from "../util/TipsUtil";
import {requestGet, requestPut} from "../http";
import {CookieUtil} from "../util/CookieUtil";


export default {
  name: 'home',
  data() {
    return {
      user: {
	      account: '',
	      weiXin: '',
	      userName: '',
      }

    }
  },
  methods: {
    commit() {
      if (!this.user.userName || !this.user.weiXin) {
          TipsUtil.alert('请正确信息!');
          return;
      }
      requestPut(`/membermanage/users/info`, this.user).then(result => {
          if (result.data.code === '200') {
            CookieUtil.deleteCookie('user');
            CookieUtil.setCookie('user', JSON.stringify(result.data.info), 24*60*60*1000);
            TipsUtil.alert('修改成功!', () => {
              this.goRouter('setting');
            });
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
      this.user.userName = user.user_name;
      this.user.weiXin = user.id;
    })
  }
}
</script>
<style lang="scss" type="text/css">
</style>
