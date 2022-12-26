import {
	BrowserContext,
	ElectronApplication,
	Page,
	_electron as electron,
} from 'playwright';
import {test, expect} from '@playwright/test';
import {findLatestBuild, parseElectronApp} from 'electron-playwright-helpers';
import path from 'node:path';

test.describe('Check Home Page', async () => {
	let app: ElectronApplication;
	let firstWindow: Page;
	let context: BrowserContext;

	test.beforeAll(async () => {
		// find the latest build in the out directory
		const latestBuild = findLatestBuild();
		// parse the directory and find paths and other info
		const appInfo = parseElectronApp(latestBuild);
		// set the CI environment variable to true
		process.env.X_NODE_ENV = 'e2e-test';
		app = await electron.launch({
			args: [appInfo.main],
			executablePath: appInfo.executable,
		});

		// app = await electron.launch({ args: [PATH.join(__dirname, '../app/main.js'), PATH.join(__dirname, '../app/package.json')] });
		context = app.context();
		await context.tracing.start({screenshots: true, snapshots: true});
		firstWindow = await app.firstWindow();
		await firstWindow.waitForLoadState('domcontentloaded');
	});

	test('Launch electron app', async () => {
		const windowState: {
			isVisible: boolean;
			isDevToolsOpened: boolean;
			isCrashed: boolean;
		} = await app.evaluate(async (process) => {
			const mainWindow = process.BrowserWindow.getAllWindows()[0];

			const getState = () => ({
				isVisible: mainWindow.isVisible(),
				isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
				isCrashed: mainWindow.webContents.isCrashed(),
			});

			return new Promise((resolve) => {
				if (mainWindow.isVisible()) {
					resolve(getState());
				} else {
					mainWindow.once('ready-to-show', () =>
						setTimeout(() => resolve(getState()), 0)
					);
				}
			});
		});

		expect(windowState.isVisible).toBeTruthy();
		expect(windowState.isDevToolsOpened).toBeFalsy();
		expect(windowState.isCrashed).toBeFalsy();
	});

	test('Check title', async () => {
		const title = await firstWindow.title();
		expect(title).toBe('');
	});

	test.afterAll(async () => {
		await context.tracing.stop({
			path: path.join(__dirname, 'tracing/main-spec.zip'),
		});
		await app.close();
	});
});
