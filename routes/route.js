'use strict';

const request = require('request');

const cfg = require('./config')

class routes {
    constructor(app) {
        this._app = app;
    }

    setup() {
        this._app.get(/(\/)/, async function (req, res) {
            let route = await findPath(req.originalUrl);
            console.log(route);
            let response = await sendRequest("GET", route.redirect, req.body);
            if (response.type === 1) {
                res.send(response.data || 200);
            } else if (response.type === 2) {
                await sendRequest(response.method || "GET", response.url, response.data);
            } else {
                res.send(200)
            }
            console.log(response);

        });
        this._app.post(/(\/)/, async function (req, res) {
            console.log(req.body);
            let route = await findPath(req.originalUrl);
            console.log(route);
            let response = await sendRequest("POST", route.redirect, req.body);
            console.log(response);
            if (response.type === 1) {
                res.send(response.data || 200);
            } else if (response.type === 2) {
                await sendRequest(response.method || "POST", response.url, response.data);
            } else {
                res.send(200)
            }
            console.log(response);
        })
    }
}


async function findPath(path, method) {
    let routes = cfg.routes;
    let res = "";
    routes.forEach((el) => {
        if (el.path) {
            if (el.path === path) {
                res = el;
            }
        }
    });
    return res || "";
}

async function sendRequest(method, url, data) {
    if (url) {
        return await new Promise((resolve, reject) => {
            request({
                method: method || "POST",
                uri: url,
                json: data
            }, function (err, res, body) {
                if (err) {
                    return console.error('Ошибка:', err);
                }
                resolve(body)
            })
        })
    }
}

module.exports = routes;