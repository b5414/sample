import {sleep} from './rendered/assets/basic.js';
import {start} from './rendered/assets/background_modules.js';

//
//
//

(async()=>{
	await sleep(100);

	await start('https://google.com/').then(console.warn);
})();
