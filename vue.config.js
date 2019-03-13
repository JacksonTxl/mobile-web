module.exports = {
	devServer: {
		proxy: {
			'/membermanage': {
				target: 'http://6c84n7.natappfree.cc/',
				changeOrigin: true,
			}
		}
	}
}