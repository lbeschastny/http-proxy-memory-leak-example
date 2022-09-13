const { printMemoryUsage } = require('./memory-usage');
const { createServer } = process.env.MODE === 'http-proxy-middleware'
	? require('./http-proxy-middleware')
	: require('./node-http-server');

const target = process.env.TARGET || 'http://127.0.0.1:5000';
const port = process.env.PORT || 7000
const memoryUsageInterval = process.env.MEMORY_USAGE_INTERVAL || 10000;

createServer(target, port);

if (memoryUsageInterval > 0) {
	setInterval(printMemoryUsage, memoryUsageInterval)
}
