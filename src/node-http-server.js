const http = require('http');
const { createProxyServer } = require('http-proxy');

exports.createServer = (target, port) => {
	const proxy = createProxyServer({ target });

	http
		.createServer((req, res) => {
			proxy.web(req, res);
		})
		.listen(port)
		.once('listening', () => {
			console.log('server is listenning on port', port);
		});
}
