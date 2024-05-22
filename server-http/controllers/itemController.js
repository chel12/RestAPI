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
