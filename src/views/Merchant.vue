<template>
  <div class="merchant">
    <mt-header title="商家信息">
      <router-link to="/update" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section v-if="admin && admin.id">
      <label>管理员信息</label>
      <mt-cell title="姓名" :value="admin.user_name"></mt-cell>
      <mt-cell title="手机号" :value="admin.account"></mt-cell>
      <mt-cell title="微信号" :value="admin.wei_xin"></mt-cell>
    </section>
    <section v-if="parent && parent.id">
      <label>上级商家信息</label>
      <mt-cell title="姓名" :value="parent.user_name"></mt-cell>
      <mt-cell title="手机号" :value="parent.account"></mt-cell>
      <mt-cell title="微信号" :value="parent.wei_xin"></mt-cell>
    </section>

  </div>
</template>

<script>
// @ is an alias to /src
import {CookieUtil} from "../util/CookieUtil";

export default {
  name: 'merchant',
  data() {

    return {
      parent: {},
      admin: {}
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
  },
  mounted () {
      this.$nextTick(() => {
          this.parent = JSON.parse(sessionStorage.getItem('parent'));
          this.admin = JSON.parse(sessionStorage.getItem('admin'));
      })
  }
}
</script>
<style lang="scss" type="text/scss">
  .merchant{
    text-align: left;

  }
</style>
