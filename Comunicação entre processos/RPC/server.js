const rpc = require('json-rpc2');

const server = rpc.Server.$create({
	'headers': {
		'Access-Control-Allow-Origin': '*'
	}
});

function checkArgs(args, options) {
	const {min, max} = options ?? {};
	
	const buildError = (code, message) => {
		return {
			code,
			message
		};
	}
	
	
	if(!Array.isArray(args)) {
		
		return buildError(0, 'Argumentos inválidos. Os argumentos devem ser passados em um array.')
	}
	
	if(args.length === 0) {
		return buildError(1, 'Número de argumentos inválido. É necessário passar pelo menos um argumento.')
	}
	
	if(args.some(arg => typeof arg !== 'number')) {
		
		return buildError(2, 'Argumentos inválidos. Os argumentos devem ser números.')
	}
	
	
	if(min && args.length < min) {
		return buildError(3, `Número de argumentos inválido. O número mínimo de argumentos é ${min}.`)
	}
	
	if(max && args.length > max) {
		return buildError(4, `Número de argumentos inválido. O número máximo de argumentos é ${max}.`)
	}
	
	return null;
}

// Methods

function add(args, opt, callback) {
	const error = checkArgs(args)
	const result = error ? undefined : args.reduce((a, b) => a + b, 0)
	
	callback(error, result);
}
function sub(args, opt, callback) {
	const error = checkArgs(args)
	const result = error ? undefined : args.reduce((a, b) => a - b, 0)
	
	callback(error, result);
}
function multiply(args, opt, callback) {
	const error = checkArgs(args)
	const result = error ? undefined : args.reduce((a, b) => a * b, 1)
	
	callback(error, result);
}
function divide(args, opt, callback) {
	const error = checkArgs(args)
	const result = error ? undefined : args.reduce((a, b) => a / b, 1)
	
	callback(error, result);
}
function pow(args, opt, callback) {
	const error = checkArgs(args)
	const result = error ? null : args.reduce((a, b) => a ** b, 1)
	
	callback(error, result);
}
function sqrt(args, opt, callback) {
	const error = checkArgs(args)
	const result = error ? null : Math.sqrt(args[0])
	callback(error, result);
}

server.expose('add', add);
server.expose('subtract', sub);
server.expose('multiply', multiply);
server.expose('divide', divide);
server.expose('pow', pow);
server.expose('sqrt', sqrt);

console.log('Servidor RPC iniciado em http://localhost:8000');
server.listen(8000, 'localhost');
