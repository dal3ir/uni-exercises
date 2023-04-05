"use strict";

const fs = require("fs");
const nj = require("nunjucks");

function req_quitter(req, res, query) {
    let page;
    let marqueurs;

    page = fs.readFileSync("./src/modele_fin.html", "utf-8");
    page = nj.renderString(page, marqueurs);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(page);
    res.end();
}

module.exports = req_quitter;
