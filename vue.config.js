module.exports = {
	devServer: {
		proxy: {
			'/membermanage': {
				target: 'http://www.youchu.vip/',
				changeOrigin: true,
			}
		}
	}
}