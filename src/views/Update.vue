<template>
  <div class="update">
    <mt-header title="申请升级">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/merchant" slot="right">
        <mt-button >商家信息</mt-button>
      </router-link>
    </mt-header>
    <section>
      <div>
        <p>你当前等级：{{update.currentLevel}}</p>
        <p>你可以申请升级的等级：{{update.nextLevel}}</p>
        <p>是否提交申请？</p>
      </div>
    </section>
    <footer style="padding: 0 20px;" v-if="!isUpdated">
      <mt-button type="primary" style="margin: 15px 0;width: 100%;" @click="commit()">提交</mt-button>
    </footer>
    <footer v-if="isUpdated">
      审核中，请耐心等待。。。
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import {CookieUtil} from "../util/CookieUtil";
import {TipsUtil} from "../util/TipsUtil";
import {requestGet, requestPut} from "../http";

export default {
  name: 'update',
  data() {

    return {
      account: '',
      isUpdated: false,
      update: {
        currentLevel: '一星会员',
        nextLevel: '二星会员'
      },
      user: {},
    }
  },
  methods: {
    getParentInfo() {
      requestGet(`/membermanage/level/${this.account}`, {}).then(result => {
        if (result.data.code === '200') {
          CookieUtil.deleteCookie('parent');
          CookieUtil.deleteCookie('admin');
          CookieUtil.setCookie('parent', JSON.stringify(result.data.parentInfo));
          CookieUtil.setCookie('admin', JSON.stringify(result.data.adminInfo));
          this.update.currentLevel = result.data.info.currentLevel;
          this.update.nextLevel = result.data.info.nextLevel;
        } else if (result.data.code === '501') {
          this.isUpdated = true;
          CookieUtil.deleteCookie('parent');
          CookieUtil.deleteCookie('admin');
          CookieUtil.setCookie('parent', JSON.stringify(result.data.parentInfo));
          CookieUtil.setCookie('admin', JSON.stringify(result.data.adminInfo));
          this.update.currentLevel = result.data.info.currentLevel;
          this.update.nextLevel = result.data.info.nextLevel;
        } else {
          TipsUtil.alert(result.data.message);
        }
      });
    },
    commit () {
      const params = {
        account: this.account,
        parentAccount: this.user.parent_account,
        levelNum: this.user.level_num,
        id: this.user.id,
        weiXIn: this.user.wei_xin,
        userName: this.user.user_name,
      };
      requestPut(`/membermanage/level`, params).then(result => {
        if (result.data.code === '200') {
          TipsUtil.alert('提交成功!');
          this.goRouter('home');
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
      this.account = this.user.account;
      this.getParentInfo();
    })
  }
}
</script>
<style lang="scss" type="text/scss">
  .update{
    background: white;
    >footer{
      text-align: center;
      font-size: 16px;
      color: rgb(2s6, 196, 199);
    }
  }
</style>
