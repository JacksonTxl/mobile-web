module.exports = {
	devServer: {
		proxy: {
			'/membermanage': {
				target: 'http://u82yp5.natappfree.cc/',
				changeOrigin: true,
			}
		}
	}
}