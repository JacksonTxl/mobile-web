<template>
  <div class="setting">
    <mt-header title="修改信息">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section>
      <mt-cell title="修改个人资料" is-link to="/setting-person" ></mt-cell>
      <mt-cell title="修改密码" is-link to="/setting-pwd" ></mt-cell>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { Cell } from 'mint-ui';
import { Header } from 'mint-ui';


export default {
  name: 'home',
  data() {

  return {
    showQrcode: false
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
  .setting{
    >section{
      text-align: left;
    }
  }
</style>
