<template>
  <div class="merchant">
    <mt-header title="商家信息">
      <router-link to="/update" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section>
      <div>
        <p>姓名：{{parent.user_name}}</p>
        <p>手机号：{{parent.account}}</p>
        <p>微信号：{{parent.wei_xin}}</p>
      </div>
    </section>

  </div>
</template>

<script>
// @ is an alias to /src
import { Header } from 'mint-ui';
import { Field } from 'mint-ui';
import { Button } from 'mint-ui';
import {CookieUtil} from "../util/CookieUtil";

export default {
  name: 'merchant',
  data() {

    return {
      parent: {}
    }
  },
  methods: {
    showQrcodeFun(show) {
      this.showQrcode = show;
    },
    goRouter (router) {
      this.$router.push(router);
    }
  },
  components: {
    Header,
    Field,
    Button,
  },
  mounted () {
      this.$nextTick(() => {
          this.parent = JSON.parse(CookieUtil.getCookie('parent'));
      })
  }
}
</script>
<style lang="scss" type="text/scss">
  .merchant{
    background: white;

  }
</style>
