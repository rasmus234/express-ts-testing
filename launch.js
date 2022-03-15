"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./0_routes/routes");
const port = 3000;
const server = routes_1.routes.listen(port, () => {
    console.log('This server is listening at port:' + port);
});
