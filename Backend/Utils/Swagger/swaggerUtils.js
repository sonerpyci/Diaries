module.exports = {
    getOptions : (baseDir) => {
        return {
            swaggerDefinition: {
                info: {
                    description: 'This is a sample server',
                    title: 'Swagger',
                    version: '1.0.0',
                },
                host: `${process.env.APP_HOST === '0.0.0.0' ? 'localhost' : process.env.APP_HOST}:${process.env.APP_PORT}`,
                basePath: '/v1',
                produces: [
                    "application/json",
                    "application/xml"
                ],
                schemes: ['http', 'https'],
                securityDefinitions: {
                    JWT: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'Authorization',
                        description: "",
                    }
                }
            },
            basedir: baseDir, //app absolute path
            files: ['./Routes/**/*.js'] //Path to the API handle folder
        };
    }
};