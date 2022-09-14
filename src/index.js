const { printMemoryUsage } = require('./memory-usage');
const { createServer } = process.env.MODE === 'http-proxy-middleware'
	? require('./http-proxy-middleware')
	: require('./node-http-server');

const httpServerPort = process.env.HTTP_SERVER_PORT || 5000
const httpProxyPort = process.env.HTTP_PROXY_PORT || 7000
const target = process.env.HTTP_PROXY_TARGET || `http://127.0.0.1:${httpServerPort}`;

createServer(target, httpProxyPort);

const memoryUsageInterval = process.env.MEMORY_USAGE_INTERVAL || 10000;

if (memoryUsageInterval > 0) {
	setInterval(printMemoryUsage, memoryUsageInterval)
}
