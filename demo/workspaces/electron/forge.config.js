const appIcon = '../angular/src/assets/icons/icon';

module.exports = {
	buildIdentifier: 'production',
	packagerConfig: {
		asar: true, // or an object containing your asar options
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
		{
			name: '@electron-forge/maker-wix',
			config: {
				language: 1033,
				manufacturer: 'My Awesome Company',
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
};
