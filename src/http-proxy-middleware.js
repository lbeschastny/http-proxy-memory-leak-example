const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const onProxyRes = require('./on-proxy-res');

exports.createServer = (target, port) => {
	console.log('using http-proxy-middleware');

	const server = express()
		.use(createProxyMiddleware({ target, onProxyRes }))
		.listen(port);

	server.once('listening', () => {
		console.log('server is listenning on port', port);
	});
}
