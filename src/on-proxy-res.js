module.exports = (proxyRes, req, res) => {
	// cleanup code to prevent memory leaks
	const cleanup = (err) => {
		// cleanup event listeners to allow clean garbage collection
		proxyRes.removeListener('error', cleanup);
		proxyRes.removeListener('close', cleanup);
		res.removeListener('error', cleanup);
		res.removeListener('close', cleanup);

		// destroy all source streams to propagate the caught event backward
		req.destroy(err);
		proxyRes.destroy(err);
	};

	proxyRes.once('error', cleanup);
	proxyRes.once('close', cleanup);
	res.once('error', cleanup);
	res.once('close', cleanup);
};
