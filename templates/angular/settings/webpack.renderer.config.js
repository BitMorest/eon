const path = require('path');
const rules = require('./webpack.rules');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const { TranslocoExtractKeysWebpackPlugin } = require('@ngneat/transloco-keys-manager');
const { join } = require('path');

rules.push({
	test: /\.css$/,
	use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
});

module.exports = {
	module: {
		rules,
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(), 
		// new TranslocoExtractKeysWebpackPlugin({
		// 	config: join(__dirname, '../workspaces/angular/angular.json')
		// }),
	],
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
		modules: [path.resolve(__dirname, '..', 'node_modules')],
	},
};
