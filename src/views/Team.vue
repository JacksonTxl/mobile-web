<template>
  <div class="team">
    <mt-header :title="`我的团队（${team.allMember}人）`">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section>
      <mt-cell title="成员信息" :value="`一星及以上人数：${team.oneLevelMember}人`" style="text-align: left"></mt-cell>
      <ul
          v-infinite-scroll="getList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          v-if="team.list.length > 0"
      >
        <li v-for="item in team.list" :key="item.id">
          <div class="first">
            <label>昵称：{{item.user_name}}</label>
            <label>等级：{{item.level_num}}</label>
          </div>
          <div class="last">
            <label>手机号：{{item.account}}</label>
            <label>微信号：{{item.wei_xin}}</label>
          </div>
        </li>
      </ul>
      <p v-else>暂时没有信息!</p>
    </section>

  </div>
</template>

<script>
// @ is an alias to /src
import {requestGet} from "../http";
import {TipsUtil} from "../util/TipsUtil";
import {CookieUtil} from "../util/CookieUtil";

export default {
  name: 'team',
  data() {

    return {
      user: '',
      loading: false,
      team: {
      	list: []
      }
    }
  },
  methods: {
    loadMore() {
        this.loading = true;
        setTimeout(() => {
            let last = this.list[this.list.length - 1];
            for (let i = 1; i <= 10; i++) {
                this.team.list.push(last + i);
            }
            this.loading = false;
        }, 2500);
    },
    getList() {
      requestGet(`/membermanage/users/team/${this.user.id}/${this.user.parent_account}`, {}).then(result => {
        if (result.data.code === '200') {
          this.team.list = result.data.info;
          this.team.allMember = result.data.allMember;
          this.team.oneLevelMember = result.data.oneLevelMember;
        } else {
          TipsUtil.alert(result.data.message);
        }
      });
    },
  },
  components: {
  },
  mounted () {
    this.$nextTick(() => {
      this.user = JSON.parse(CookieUtil.getCookie('user'));
      this.getList();

    })
  }
}
</script>
<style lang="scss" type="text/scss">
  .team{
    >section{
      ul{
        margin: 0;
        padding: 0;
        border-top: 1px solid #cccc;
        >li{
          background: white;
          height: 40px;
          border-bottom: 1px solid #cccc;
          padding: 15px;
          >div{
            display: flex;
            >label{
              flex: 1;
              &:first-child{
                text-align: left;
              }
              &:last-child{
                text-align: right;
              }
            }
            &:last-child{
              font-size: 12px;
              color: #989898;
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
</style>
