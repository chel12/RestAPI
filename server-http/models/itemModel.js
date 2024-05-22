//откуда
import { db } from '../database.js';
//обьект
export const itemModel = {
	//методы добавления и удаления
	getAllItems: function () {
		//работа с бд это асинхрон, поэтому делаем промис
		return new Promise((resolve, reject) => {
			//обращение к базе данных
			//sql запрос (1 всё 2 массив 3 функция(ошибка и rows то что нашли))
			db.all('SELECT * FROM items', [], (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
		//далее потребуется контроллеры
	},
};
