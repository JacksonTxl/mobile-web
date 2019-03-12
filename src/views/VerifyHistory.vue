<template>
  <div class="verify-history">
    <mt-header title="审核升级">
      <router-link to="/verify" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section v-if="list.length > 0">
      <ul
          v-infinite-scroll="getList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li v-for="item in list" v-bind:key="item.id">
          <div class="first">
            <label>姓名：{{item.bereviewName}}</label>
            <label>当前等级：1</label>
          </div>
          <div class="last">
            <label>电话：{{item.bereviewAcc}}</label>
            <label>升级后等级：2</label>
          </div>

        </li>
      </ul>
    </section>
    <p v-else>暂时没有数据!</p>
  </div>
</template>

<script>
// @ is an alias to /src
import {requestGet} from "../http";
import {TipsUtil} from "../util/TipsUtil";
import {CookieUtil} from "../util/CookieUtil";

export default {
  name: 'verify-history',
  data() {

    return {
      user: {},
      loading: false,
      list: []
    }
  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    },
    getList() {
      requestGet(`/membermanage/level/list/${this.user.account}`, {}).then(result => {
        if (result.data.code === '200') {
          this.list = result.data.handle;
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
  .verify-history{
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
          >section{
            display: flex;
          }
        }
      }
    }
  }
</style>
