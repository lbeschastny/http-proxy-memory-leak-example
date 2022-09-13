const { memoryUsage } = require('process');
const bytes = require('bytes');

exports.printMemoryUsage = () => {
	const { rss, heapUsed, arrayBuffers } = memoryUsage();

	console.log(
		'Memory usage: %s (%s heap, %s buffers)',
		bytes(rss),
		bytes(heapUsed),
		bytes(arrayBuffers)
	);
};
