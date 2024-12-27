const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // или ваш хост
    user: 'root', // ваш MySQL пользователь
    password: 'root', // ваш MySQL пароль
    database: 'shopdb.products' // имя вашей базы данных
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к MySQL:', err);
        return;
    }
    console.log('Подключение к MySQL установлено успешно!');
});

module.exports = db;
