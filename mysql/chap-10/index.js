var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'tuto_mean',
    password: 'tuto_mean',
    database: 'tuto_mean',
    connectionLimit: 20,
    queueLimit: 100,
    waitForConnections: true
});

pool.getConnection(function(error, connection) {
    if (error) {
        return console.error(error.message);
    }

    var createTableSql = 'CREATE TABLE IF NOT EXISTS Presidents (' +
        'Id INT UNSIGNED NOT NULL AUTO_INCREMENT,' +
        'Name VARCHAR(100) NOT NULL,' +
        'Terms INT UNSIGNED NOT NULL,' +
        'PRIMARY KEY(Id))';
    connection.query(createTableSql, function(error, results) {
        if (error) {
            return console.error(error.message);
        }
        console.log('successfully created table!');
    });

    var insertSql = 'INSERT INTO Presidents (Name, Terms) VALUES' +
        '(\'Bill Clinton\', 2),' +
        '(\'George W Bush\', 2)';
    connection.query(insertSql, function(error, results) {
        if (error) {
            connection.release();
            return console.error(error.message);
        }
        var selectSql = 'SELECT * FROM Presidents';
        connection.query(selectSql, function(error, results) {
            if (error) {
                connection.release();
                return console.error(error.message);
            }
            console.log('results of SELECT:');
            console.log(JSON.stringify(results, null, 2));
            var dropSql = 'DROP TABLE IF EXISTS Presidents';
            connection.query(dropSql, function(error, results) {
                connection.release();
                if (error) {
                    return console.error(error.message)
                }
                console.log('table dropped!');
            });
        });
    });
});