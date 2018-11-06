import * as Hapi from "hapi";
const Bcrypt = require('bcrypt');
import { Routes } from './routes/routes';
const config = require('./config/config');

const server = new Hapi.Server({
    host: config.application.host,
    port: config.application.port,
    routes: {
        cors: true,
        json: {
            space: 4
        }
    }
});

const validate = async (request, username, password) => {
    return new Promise(
        (resolve, reject) => {
            if (username === 'jgichuhi' && password === 'jecihjoy2018')
                resolve({ isValid: true, credentials: {} })
            else resolve({ isValid: false, credentials: {} })
        });
};

const init = async function () {

    await server.register([
        require("inert"),
        require("vision"),
        require('hapi-auth-basic'),
        {
            plugin: require("hapi-swagger"),
            options: {
                info: {
                    title: "Customer Order Api",
                    description: "Customer Api Documentation",
                    version: "1.0"
                },
                tags: [
                    {
                        name: "tasks",
                        description: "Api tasks interface."
                    },
                    {
                        name: "users",
                        description: "Api users interface."
                    }
                ],
                sortEndpoints: 'path',
                swaggerUI: true,
                documentationPage: true,
                documentationPath: "/docs"
            }
        },
        {
            plugin: require("good"),
            options: {
                ops: {
                    interval: 1000
                },
                reporters: {
                    consoleReporter: [
                        {
                            module: "good-squeeze",
                            name: "Squeeze",
                            args: [
                                {
                                    error: "*",
                                    log: "*",
                                    response: "*",
                                    request: "*"
                                }
                            ]
                        },
                        {
                            module: "good-console"
                        },
                        "stdout"
                    ]
                }
            }
        }
    ]);

    server.auth.strategy('simple', 'basic', { validate });

    for (var route in Routes) {
        server.route(Routes[route]);
    }
    // causes all routes to require authentication
    server.auth.default('simple');

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});





