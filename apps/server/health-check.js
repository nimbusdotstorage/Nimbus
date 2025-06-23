/* eslint-disable no-undef */
fetch("http://localhost:" + process.env.SERVER_PORT + "/kamehame")
	.then(res => {
		process.exit(res.ok ? 0 : 1);
	})
	.catch(() => {
		process.exit(1);
	});
