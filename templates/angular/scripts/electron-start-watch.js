#!/usr/bin/env node
const spawn = require('child_process').spawn;
const chokidar = require('chokidar');
const kill = require('tree-kill');
const path = require('path');

class ElectronForgeRunner {
	constructor() {
		this.__init__();
	}

	__init__ = () => {
		this.args = process.argv;
		this.command = this.args[2];
		this.cwd = process.cwd();
		this.watchPaths = [
			path.join(this.cwd, '/package.json'),
			path.join(this.cwd, '/scripts/electron-start-watch.js'),
			path.join(this.cwd, '/workspaces/electron/**/*'),
			path.join(this.cwd, '/workspaces/shared/.dist/**/*'),

			path.join(this.cwd, '/../../packages/common/.dist/**/*'),
			path.join(this.cwd, '/../../packages/core/.dist/**/*'),
		];
		this.ignoredPaths = '**/node_modules/*';
		this.startWatching();
		this.reload();
	};

	reload = () => {
		if (this.childProcess) kill(this.childProcess.pid);
		this.childProcess = spawn(
			'npx wait-on http://localhost:4200 && npx electron-forge start',
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
