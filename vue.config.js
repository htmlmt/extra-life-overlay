module.exports = {
    devServer: {
        port: 8081,
    },
	css: {
		extract: true,
	},
	filenameHashing: false,
	configureWebpack: {
		optimization: {
			splitChunks: false,
		},
		devtool: 'source-map',
	},
}
