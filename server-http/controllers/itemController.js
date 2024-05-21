//импорт айтем модели
import { itemModel } from '../models/itemsModel.js';

//асинк из-за того что внутри обращение к модели которая обращается к БД асинхрон
export const getItems = async (req, res) => {
	//req и res будем передавать из index.js
	try {
		//в айтемс все что придет из БД
		const items = await itemModel.getAllItems();
		//то есть вызываем функцию которая запрос к БД делает
		//выставляем хедер, нужно обязательно
	} catch (error) {}
};
