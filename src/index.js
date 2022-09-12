const { createServer } = process.env.MODE === 'http-proxy-middleware'
	? require('./http-proxy-middleware')
	: require('./node-http-server');

const target = process.env.TARGET || 'http://127.0.0.1:5000';
const port = process.env.PORT || 7000

createServer(target, port);
