#!/usr/bin/env node
const spawn = require('child_process').spawn;
const chokidar = require('chokidar');
const kill = require('tree-kill');
const path = require('path');
const fs = require('fs');

class ElectronForgeRunner {
	constructor() {
		this.args = process.argv;
		this.command = this.args[2];
		this.cwd = process.cwd();

		this.watchPaths = [
			// watching workspace and root package chanage
			path.join(this.cwd, '/yarn.lock'),
			path.join(this.cwd, '/package.json'),
			path.join(this.cwd, '../../yarn.lock'),
			path.join(this.cwd, '../../package.json'),

			// watching my self
			path.join(this.cwd, '/scripts/start.js'),

			// wathching assets change
			path.join(this.cwd, '/assets/**/*'),
			path.join(this.cwd, '/src/**/*'),

			// watching shard project change
			path.join(this.cwd, '../shared/.dist/**/*'),
			path.join(this.cwd, '../shared/package.json'),
			path.join(this.cwd, '../shared/yarn.lock'),
		];

		// using only development e-dizzy
		if (fs.existsSync(path.join(this.cwd, '/../../../packages/types'))) {
			const eDizzyWatch = [
				path.join(this.cwd, '/../../../packages/types/.dist/**/*'),
				path.join(this.cwd, '/../../../packages/electron/.dist/**/*'),
			];
			this.watchPaths = [...this.watchPaths, ...eDizzyWatch];
		}

		this.ignoredPaths = '**/node_modules/*';
		this.startWatching();
		this.reload();
	}

	reload = () => {
		if (this.childProcess) kill(this.childProcess.pid);
		this.childProcess = spawn(
			'npx wait-on ../shared/.dist/index.d.ts && npx wait-on http://localhost:4200 && npx electron-forge start',
			[],
			{
				shell: true,
				stdio: 'inherit',
			}
		);
	};

	startWatching = () => {
		chokidar
			.watch(this.watchPaths, {
				ignored: this.ignoredPaths,
				ignoreInitial: true,
			})
			.on('all', (event, path) => {
				this.reload();
			});
	};
}

new ElectronForgeRunner();
