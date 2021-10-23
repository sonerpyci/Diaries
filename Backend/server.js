const CONFIG = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const models = require('./Models');
const swaggerOpts = require('./Utils/Swagger/swaggerUtils').getOptions(__dirname);

const app = express();
const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(swaggerOpts);

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    } else {
        next();
    }
});

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : __dirname + '/uploads/',
    debug:true,
    createParentPath : true
}));


app.use("/v1/hello", require('./Routes/hello'));
app.use("/v1/auth", require('./Routes/auth'));

const server =  require('http').Server(app);


models.sequelize.authenticate()
    .then(() => {
        console.log("DB Connected.");
        models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then((results) => {
            models.sequelize.sync({force:false, alter:true}).then(() => {
                models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', {raw: true}).then((results) => {
                    server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
                        console.log(`Running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
                    });
                });
            }).catch((err) => {
                console.error('Unable to connect to the database: ', err);
            });
        });
    })
    .catch(err => {
        console.error('Error: ', err);
    });