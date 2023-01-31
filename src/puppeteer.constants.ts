import type { BrowserConnectOptions, BrowserLaunchArgumentOptions, LaunchOptions } from 'puppeteer';

export const PUPPETEER_INSTANCE_NAME = 'PuppeteerInstanceName';
export const PUPPETEER_MODULE_OPTIONS = 'PuppeteerModuleOptions';

export const DEFAULT_PUPPETEER_INSTANCE_NAME = 'DefaultPuppeteer';

type NestLaunchOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions

const args: NestLaunchOptions['args'] = [
  '--allow-insecure-localhost', // Enables TLS/SSL errors on localhost to be ignored (no interstitial, no blocking of requests).
  '--allow-http-screen-capture', // Allow non-secure origins to use the screen capture API and the desktopCapture extension API.
  '--no-zygote', // https://codereview.chromium.org/2384163002
];
// add --no-sandbox when running on Linux, required with --no-zygote
if (typeof process.getuid === 'function') {
  args.push('--no-sandbox');
}

export const DEFAULT_CHROME_LAUNCH_OPTIONS: NestLaunchOptions = {
  headless: true,
  pipe: process.platform !== 'win32',
  args,
};
