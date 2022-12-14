const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

exports.createServer = (target, port) => {
	console.log('using http-proxy-middleware');

	const server = express()
		.use(createProxyMiddleware({ target }))
		.listen(port);

	server.once('listening', () => {
		console.log('server is listenning on port', port);
	});
}
