export const sleep = (ms)=>new Promise((r)=>setTimeout(r, ms));

export const SecretWin = async(url, options = {})=>{
	const awin = await chrome.windows.create({
		focused: true,
		type: 'popup',
		width: 1280,
		height: 720,
		top: 100,
		left: 500,
		url,
	}).catch((e)=>{
		console.error('[SecretWin] winCreate err:', e.message, url);
		throw new Error('No window created, due to: ' + e.message);
	});

	const atab = awin.tabs[0];

	const winId = awin.id;
	const tabId = atab.id;

	const world = options?.world !== 'MAIN' ? 'ISOLATED' : 'MAIN';

	//

	const waitUntilLoaded = async()=>{
		return await sleep(3000);
	};

	const execFile = (files, rest)=>{
		return chrome.scripting.executeScript({injectImmediately: true, world, target: {tabId}, files, ...rest});
	};

	const execFunc = (func, args = [], rest)=>{
		return chrome.scripting.executeScript({injectImmediately: true, world, target: {tabId}, func, args, ...rest}).then((r)=>r?.[0]?.result);
	};

	//

	if(options.waitUntilLoaded)await sleep(3000);

	return {
		awin,
		atab,
		winId,
		tabId,

		waitUntilLoaded,
		execFile,
		execFunc,
	};
};
