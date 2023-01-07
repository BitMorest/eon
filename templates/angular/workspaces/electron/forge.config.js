const appIcon = '../angular/src/assets/icons/icon';

module.exports = {
	packagerConfig: {
		icon: appIcon,
	},
	rebuildConfig: {},
	makers: [
		{
			name: '@electron-forge/maker-dmg',
			config: {
				options: {
					icon: `${appIcon}.icns`,
				},
			},
		},
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				setupIcon: `${appIcon}.ico`,
			},
		},
	],
	publishers: [],
	plugins: [
		{
			name: '@electron-forge/plugin-webpack',
			config: {
				mainConfig: './webpack.config.js',
				renderer: {
					config: '../angular/webpack.config.js',
					entryPoints: [
						{
							name: 'main_window',
							html: '../../node_modules/@e-dizzy/electron/renderer/index.html',
							js: '../../node_modules/@e-dizzy/electron/renderer/index.ts',
							preload: {
								js: '../../node_modules/@e-dizzy/electron/renderer/preload.ts',
							},
						},
					],
				},
			},
		},
	],
	hooks: {},
	buildIdentifier: 'production',
};
