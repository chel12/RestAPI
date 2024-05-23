//импорт айтем модели
import { itemModel } from '../models/itemModel.js';

//асинк из-за того что внутри обращение к модели которая обращается к БД асинхрон
export const getItems = async (req, res) => {
	//req и res будем передавать из index.js
	try {
		//в айтемс все что придет из БД
		const items = await itemModel.getAllItems();
		//то есть вызываем функцию которая запрос к БД делает
		//выставляем хедер, нужно обязательно
		res.setHeader('Content-type', 'application/json');
		//ответ в формате JSON, а имеено items - который обращается
		//к itemModel методу getAllItems
		res.end(JSON.stringify(items));
	} catch (err) {
		res.statusCode = 500;
		res.end(`Error: ${err.message}`);
	}
};
//взять по id
export const getItemById = async (req, res, id) => {
	//req и res, id будем передавать из index.js
	try {
		const item = await itemModel.getItemById(id);
		if (!item) {
			res.statusCode = 404;
			res.end(`Item with ID: ${id} not found`);
		} else {
			res.setHeader('Content-type', 'application/json');
			res.end(JSON.stringify(item));
		}
	} catch (err) {
		res.statusCode = 500;
		res.end(`Error: ${err.message}`);
	}
};
//создать
export const createItem = async (req, res) => {
	//req и res, id будем передавать из index.js
	try {
		//body где пакеты соед
		let body = '';
		//когда дата идёт, записывать чанк в боди
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		//когда пакеты кончились парсим боди
		req.on('end', async () => {
			const item = JSON.parse(body);
			await itemModel.createItem(item);
			res.statusCode = 201;
			res.setHeader('Content-type', 'application/json');
			res.end(JSON.stringify('Добавлен'));
		});
	} catch (err) {
		res.statusCode = 500;
		res.end(`Error: ${err.message}`);
	}
};

export const updateItem = async (req, res, id) => {
	try {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', async () => {
			const item = JSON.parse(body);
			await itemModel.updateItem(id, item);
			res.statusCode = 200;
			res.setHeader('Content-type', 'application/json');
			res.end(JSON.stringify('Обновлено'));
		});
	} catch (err) {
		res.statusCode = 500;
		res.end(`Error: ${err.message}`);
	}
};

export const deleteItem = async (req, res, id) => {
	try {
		await itemModel.deleteItem(id);
		res.statusCode = 200;
		res.setHeader('Content-type', 'application/json');
		res.end(JSON.stringify('Удалено'));
	} catch (err) {
		res.statusCode = 500;
		res.end(`Error: ${err.message}`);
	}
};
