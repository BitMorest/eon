const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const rules = require('../../webpack.config');
rules.push({
	test: /\.css$/,
	use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
});

module.exports = {
	module: {
		rules,
	},
	plugins: [new ForkTsCheckerWebpackPlugin()],
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
		modules: [path.resolve(__dirname, '..', '..', 'node_modules')],
	},
};
