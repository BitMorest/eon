const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: './src/index.ts',
	// Put your normal webpack config below here
	module: {
		rules: require('../../webpack.config'),
	},
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
		modules: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(__dirname, '..', '..', 'node_modules'),
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				// copy assets
				{from: 'assets'},
				// copy angular builded source
				{
					from: '../angular/.dist',
					to: '../renderer/angular_window',
					noErrorOnMissing: true, // don't throw error on serve mode
				},
			],
		}),
	],
};
