import sqlite3 from 'sqlite3';

//вызвать метод
sqlite3.verbose();

// Аргуметы:
// 1) название БД ':memory:' если так то она будет в памяти
//будет вечно удаляться и очищаться  (для тествов например)
// 2) функция колбек
export const db = new sqlite3.Database('memory', (err) => {
	if (err) {
		console.log(err.message);
	}
	console.log('Connected to sqlite3 database');
});

db.serialize(() => {
	//и создаём таблицу тут
	//таблица items и в скобках столбцы
	//id INTEGER-число PRIMARY KEY-первичный ключ AUTOINCREMENT-авто увелечение
	db.run(`CREATE TABLE IF NOT EXIST items (id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL, description TEXT)`);
});
