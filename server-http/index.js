import http from 'http';
import {
	createItem,
	deleteItem,
	getItemById,
	getItems,
	updateItem,
} from './controllers/itemController.js';

const server = http.createServer(async (req, res) => {
	//сделать урлу и хост достать
	const url = new URL(req.url, `http://${req.headers.host}`);
	//взять путь
	const { pathname } = url;
	//логика
	// if (req.method === 'GET' && pathname === '/hello-world') {
	// 	//если метод из запроса = GET и путь '//hello-world'
	// 	//тогда отправь строку....
	// 	res.end('<h1>Hello world </h1>');
	// } else {
	// 	res.statusCode = 404;
	// 	res.end('Not found');
	// }
	if (req.method === 'GET' && pathname === '/items') {
		await getItems(req, res);
	} else if (req.method === 'GET' && pathname.startsWith('/items/')) {
		const id = pathname.split('/')[2];
		await getItemById(req, res, id);
	} else if (req.method === 'POST' && pathname === '/items') {
		await createItem(req, res);
	} else if (req.method === 'PUT' && pathname.startsWith('/items/')) {
		const id = pathname.split('/')[2];
		await updateItem(req, res, id);
	} else if (req.method === 'DELETE' && pathname.startsWith('/items/')) {
		//split разбивает строку в массив и берём 2 индекс массива это id
		const id = pathname.split('/')[2];
		await deleteItem(req, res, id);
	} else {
		res.statusCode = 404;
		res.end('Not Found');
	}
});

const port = 3000;

server.listen(port, () => {
	console.log(`Server run at http://localhost:${port}`);
});
