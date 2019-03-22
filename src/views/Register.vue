<template>
  <div class="register">
    <mt-header title="帮助注册">
      <router-link to="/login" slot="left" v-if="flag">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/home" slot="left" v-else>
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
import wx from 'weixin-js-sdk';

export default {
  name: 'register',
  data() {

    return {
      flag: false,
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
      url: {
        href: ''
      }
    }
  },
  methods: {
    commit() {
      if (!this.register.userPassword || this.register.userPassword !== this.register.confirmPassword) {
        TipsUtil.alert( '请正确密码信息!' );
        return;
      }
      if (!this.flag) {
        this.register.parentAccount = this.user.account;
      }
      requestPut( `/membermanage/users/help`, this.register ).then( result => {
        if (result.data.code === '200') {
          TipsUtil.alert( '注册成功!', () => {
            if (this.flag) {
              location.href = location.origin + '/#/login';
            }
          } );
        } else {
          TipsUtil.alert( result.data.message );
        }
      } );
    },
    goRouter(router) {
      this.$router.push( router );
    },
    getWxAccess() {
      requestPut( `/membermanage/wx/access`, this.url ).then( result => {
        wx.config( {
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: result.data.appId, // 必填，公众号的唯一标识
          timestamp: result.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
          signature: result.data.signature,// 必填，签名
          jsApiList: result.data.jsApiList // 必填，需要使用的JS接口列表
        } );

        wx.ready( () => {  //需在用户可能点击分享按钮前就先调用
          // wx.updateAppMessageShareData({
          //   title: '靓大夫会员管理', // 分享标题
          //   link: 'http://www.youchu.vip/#/register/' + this.register.parentAccount, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          //   desc: '靓大夫会员帮助注册', // 分享描述
          //   imgUrl: '', // 分享图标
          //   success: () => {
          //     // 用户点击了分享后执行的回调函数
          //     location.href = 'http://www.youchu.vip/#/register/' + this.register.parentAccount;
          //   }
          //
          // });
          //
          // wx.updateTimelineShareData({
          //   title: '靓大夫会员管理', // 分享标题
          //   desc: '靓大夫会员帮助注册', // 分享描述
          //   link: 'http://www.youchu.vip/#/register/' + this.register.parentAccount, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          //   imgUrl: '', // 分享图标
          //   success: () => {
          //     // 用户点击了分享后执行的回调函数
          //     location.href = 'http://www.youchu.vip/#/register/' + this.register.parentAccount;
          //   }
          // });
          wx.onMenuShareTimeline( {
            title: '靓大夫会员管理', // 分享标题
            link: 'http://www.youchu.vip/#/register/' + this.register.parentAccount, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
              // 用户点击了分享后执行的回调函数
            },
          } );
          wx.onMenuShareAppMessage( {
            title: '靓大夫会员管理', // 分享标题
            desc: '帮助注册', // 分享描述
            link: 'http://www.youchu.vip/#/register/' + this.register.parentAccount, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
            }
          } );
        } )
      } )
    },

  },
  components: {},
  mounted() {
    this.$nextTick( () => {
      this.url.href = location.href.split( "#" )[ 0 ];
      this.user = JSON.parse( sessionStorage.getItem( 'user' ) );
      if (this.user && this.user.id) {
        this.register.parentId = this.user.id;
        this.register.parentAccount = this.user.account;
        this.flag = false;
      } else {
        this.register.parentAccount = this.$route.params.id;
        this.flag = true;
      }

      this.getWxAccess();
    } )


  }
}
</script>
<style lang="scss" type="text/css">
</style>
