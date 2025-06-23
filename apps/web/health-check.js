fetch("http://localhost:" + process.env.WEB_PORT + "/favicon.ico")
	.then(res => {
		process.exit(res.ok ? 0 : 1);
	})
	.catch(() => {
		process.exit(1);
	});
