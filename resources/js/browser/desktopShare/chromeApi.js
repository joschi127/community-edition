console.log('=== browser/desktopShare/chromeApi.js 111');

const { selectSource } = require('./captureSelector');

window.chrome = {
	'runtime': {
		'sendMessage': function (extensionId, messageName, callback) {
			console.log('=== browser/desktopShare/chromeApi.js 222 - sendMessage');

			if (messageName == 'version') {
				console.log('version');
				callback({ version: '1.1.0' });
			} else if (messageName == 'get-sourceId') {
				console.log('get-sourceId');
				selectSource(sourceId => {
					callback({
						type: 'success',
						streamId: sourceId
					});
				});
			} else {
				callback({
					type: 'error',
					message: 'unknown event'
				});
			}
		},
		'send': function (extensionId, messageName, callback) {
			console.log('=== browser/desktopShare/chromeApi.js 222 - send');
		}
	}
};


// auto show selector after 5 seconds for testing
// setTimeout(() => {
// 	console.log('=== browser/desktopShare/chromeApi.js TTT');
//
// 	selectSource(sourceId => {
// 		console.log('srcId', sourceId);
// 	});
// }, 5000);
