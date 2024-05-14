import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import {crx} from '@crxjs/vite-plugin';
import svgr from 'vite-plugin-svgr';
import path, {resolve} from 'path';

import manifest from './src/manifest.json';

//

const isProd = false;

const rootDir = resolve(__dirname);
const buildDir = resolve(rootDir, 'dist');

//

const config = defineConfig({
	root: resolve(rootDir, 'src'),
	cacheDir: resolve(rootDir, '../', 'temp', 'vite_cache'),
	publicDir: resolve(rootDir, 'src', 'public'),
	plugins: [svgr(), react(), crx({manifest})],

	build: {
		outDir: buildDir,
		minify: isProd,
		sourcemap: !isProd,
		emptyOutDir: true,
		modulePreload: false,

		rollupOptions: {
			input: resolve(rootDir, 'src', 'index.html'),
			output: {
				dir: buildDir,

				entryFileNames: 'assets/[name].js',
				chunkFileNames: !isProd ? 'assets/js/[name].js' : 'assets/js/[name]_[hash].js',
				assetFileNames: (assetInfo)=>{
					const {name} = path.parse(assetInfo.name);
					const assetFileName = name === 'contentStyle' ? `${name}${getCacheInvalidationKey()}` : name;
					return `assets/[ext]/${assetFileName}_chunk.[ext]`;
				},
			},
		},
	},
	server: {
		strictPort: true,
		port: 3000,
		hmr: {
			clientPort: 3000,
		},
	},
});

//

export default config;
