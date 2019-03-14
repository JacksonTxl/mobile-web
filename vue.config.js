module.exports = {
	devServer: {
		proxy: {
			'/membermanage': {
				target: 'http://hx2mi2.natappfree.cc/',
				changeOrigin: true,
			}
		}
	}
}