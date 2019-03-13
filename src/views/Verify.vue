<template>
  <div class="verify">
    <mt-header title="审核升级">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/verify-history" slot="right">
        <mt-button>历史记录</mt-button>
      </router-link>
    </mt-header>
    <section v-if="list.length > 0">
      <ul
          v-infinite-scroll="getList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li v-for="item in list" :key="item.id">
          <div class="first">
            <label>姓名：{{item.bereviewName}}</label>
            <label></label>
            <!--<label>当前等级：{{item.currentLevel}}</label>-->
          </div>
          <div class="last">
            <label>电话：{{item.bereviewAcc}}</label>
            <label>升级后等级：{{item.nextLevel}}</label>
          </div>
          <section>
            <mt-button size="small" type="primary" style="flex: 1;" @click="commit(item, 1)">同意</mt-button>
            <mt-button size="small" type="danger" style="flex: 1;" @click="commit(item, 0)">拒绝</mt-button>
          </section>
        </li>
      </ul>
    </section>
    <p v-else>暂时没有数据!</p>

  </div>
</template>

<script>
// @ is an alias to /src
import {TipsUtil} from "../util/TipsUtil";
import {CookieUtil} from "../util/CookieUtil";
import {requestGet} from "../http";

export default {
  name: 'verify',
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
    commit (item, status) {
      requestGet(`/membermanage/level/${item.id}/${status}`, {}).then(result => {
        if (result.data.code === '200') {
          TipsUtil.alert('操作成功');
          this.getList();
        } else {
          TipsUtil.alert(result.data.message);

        }
      });
    }
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
  .verify{
    >section{
      ul{
        margin: 0;
        padding: 0;
        border-top: 1px solid #cccc;
        >li{
          background: white;
          height: 73px;
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
