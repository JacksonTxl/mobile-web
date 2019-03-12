<template>
  <div class="service">
    <mt-header title="客服信息">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section>
      <mt-cell title="客服姓名" value="张三"></mt-cell>
      <mt-cell title="客服QQ" value="173002342(更改账号与咨询)"></mt-cell>
      <mt-cell title="投诉QQ" value="173002342(投诉咨询专用)"></mt-cell>
    </section>

  </div>
</template>

<script>
// @ is an alias to /src
import { Cell } from 'mint-ui';
import { Header } from 'mint-ui';


export default {
  name: 'setting-pwd-info',
  data() {
    return {
      username: '张三',
      wechat: '123',
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
    Cell,
  }
}
</script>
<style lang="scss" type="text/scss">
  .service{
    >section{
      text-align: left;
    }
  }
</style>
