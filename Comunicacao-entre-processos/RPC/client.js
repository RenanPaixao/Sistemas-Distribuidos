const rpc = require('json-rpc2');

const client = rpc.Client.$create(8000, 'localhost');


client.call('add', [1, 2, 3, 4], function(err, result) {
	console.log('1 + 2 + 3 + 4 = ' + result);
});

client.call('sqrt', [4], function(err, result) {
	console.log('srqt 4 = ' + result);
});
