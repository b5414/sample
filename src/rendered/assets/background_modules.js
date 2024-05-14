import {sleep, SecretWin} from './basic.js';

//
//
//

export const start = async(once_url)=>{
	const {execFile, execFunc} = await SecretWin(once_url, {waitUntilLoaded: true, world: 'ISOLATED'});

	//

	const basic_file_dir = chrome.runtime.getURL('/rendered/assets/basic.js');

	await sleep(2000);

	const func_super_for_inject = async({basic_file_dir})=>{
		console.log('test init', basic_file_dir);

		try{
			/* @vite-ignore */
			const test = /* @vite-ignore */ await /* @vite-ignore */ import(/* @vite-ignore */ basic_file_dir /* @vite-ignore */);
			/* @vite-ignore */

			console.log('test info', test);
		}catch(e){
			console.log('test err', e);
		}
	};

	const result1 = await execFile(['./rendered/assets/basic.js'], {world: 'MAIN'});
	console.log('[start] result1:', result1);

	const result2 = await execFunc(func_super_for_inject, [{basic_file_dir}], {world: 'MAIN'});
	console.log('[start] result2:', result2);

	const result3 = await execFunc(func_super_for_inject, [{basic_file_dir}], {world: 'ISOLATED'});
	console.log('[start] result3:', result3);

	return 'done';
};
