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
	//получение по id
	getItemById: function (id) {
		return new Promise((resolve, reject) => {
			//без интерполяции ` чтобы обезопасить от sql иньекций
			//получитьИзБд.ВыбратьИЗтаблицыАйтемс,Где id? [подставится сюда], ответ rows
			db.get('SELECT * FROM items WHERE id=?', [id], (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	},
	//добавление
	//с клиента приходит JSON
	createItem: function (item) {
		return new Promise((resolve, reject) => {
			// запрос к БД и вставка в БД
			db.run(
				'INSERT INTO items(name,description) VALUES(?,?)',
				[item.name, item.description],
				(err) => {
					if (err) {
						reject(err);
					} else {
						resolve(this.changes);
					}
				}
			);
		});
	},
	//обновить item
	//(кого обновить , на что обновить)
	updateItem: function (id, item) {
		return new Promise((resolve, reject) => {
			// запрос к БД и update
			db.run(
				'UPDATE items SET name=?, description=? WHERE id=?',
				[item, item.name, item.description, item.id],
				(err) => {
					if (err) {
						reject(err);
					} else {
						//обращение к переменной где произошли изменения
						resolve(this.changes);
					}
				}
			);
		});
	},
	deleteItem: function (id) {
		return new Promise((resolve, reject) => {
			// запрос к БД и update
			db.run('DELETE FROM items WHERE id=?', [id], (err) => {
				if (err) {
					reject(err);
				} else {
					//обращение к переменной где произошли изменения
					resolve(this.changes);
				}
			});
		});
	},
};
