import http from 'http';

const server = http.createServer((req, res) => {
	//хост достать
	const url = new URL(req.url, `http://${req.headers.host}`);
});
const port = 3000;
server.listen(port, () => {
	console.log(`Server run at http://localhost:${port}`);
});
