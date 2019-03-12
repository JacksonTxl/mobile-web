<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'

	import { requestPost } from './http';

		export default {
		name: 'app',
		data() {

			return {
				showQrcode: false,
                carouselList: [],
			}
		},
		methods: {
			showQrcodeFun(show) {
				this.showQrcode = show;
			},
			goRouter (router) {
				this.$router.push(router);
			},
            getCarouselList () {
                requestPost('/bonuoni/getCarouselList', {}).then(result => {
                    this.carouselList = result.data.data;
                });
            }
		},
		components: {

		},
        mounted () {
			this.$nextTick(() => {
				// this.getCarouselList();
            })
        }
	}
</script>

<style lang="scss">
  @import "./style/home.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
