const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const db        = {};
let model;

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_CONNECTION,
    port: process.env.DB_PORT,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    ssl: process.env.SSL_CONN === "REQUIRED",
    dialectOptions: process.env.SSL_CONN === "REQUIRED" ? {
        supportBigNumbers: true,
        ssl: {
            rejectUnauthorized: true,
            key: process.env.DB_CLIENT_KEY || fs.readFileSync(__dirname+ '/../db_certs/' + 'client-key.pem'),
            cert: process.env.DB_CLIENT_CERT || fs.readFileSync(__dirname+ '/../db_certs/' + 'client-cert.pem'),
            ca: process.env.DB_CA ||  fs.readFileSync(__dirname+ '/../db_certs/' + 'ca.pem'),
        }
    } : {supportBigNumbers: true},
    logging: true,
    pool: {
        max: 30,
        min: 0,
        acquire: 60000,
        idle: 5000
    }
});

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'); // Gather all files that ends with .js
    })
    .forEach(file => {
        model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        //model = sequelize['import'](path.join(__dirname, file)); // import files one by one as sequelize model.
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;