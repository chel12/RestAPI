import http from 'http';

const server = http.createServer((req, res) => {
	//хост достать
	const url = new URL(req.url, `http://${req.headers.host}`);
	//взять путь
	const { pathname } = url;

	//логика
	if (req.method === 'GET' && pathname === '/hello-world') {
		//если метод из запроса = GET и путь '//hello-world'
		//тогда отправь строку....
		res.end('<h1>Hello world </h1>');
	} else {
		res.statusCode = 404;
		res.end('Not found');
	}
});
const port = 3000;
server.listen(port, () => {
	console.log(`Server run at http://localhost:${port}`);
});
