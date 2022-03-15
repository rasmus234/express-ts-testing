"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const AccessToken_1 = require("../2_sessions/AccessToken");
const Role_1 = require("../3_models/Role");
const AbstractEndpoint_1 = require("../1_endpoints/AbstractEndpoint");
const SuccessCode_1 = require("../3_models/SuccessCode");
const Resource_1 = require("../3_models/Resource");
dotenv.config({ path: 'config/middleware.env' });
const routes = (0, express_1.default)();
exports.routes = routes;
routes.use((0, cors_1.default)());
routes.use(bodyParser.json());
routes.use(express_1.default.static('public'));
const urlencode = bodyParser.urlencoded({ extended: true });
/*
   The routes to using REST, just emmulating the data
*/
// #1 getAll
routes.get('/api/products', (req, res) => {
    const data = Array();
    data.push({ 'no': 33, 'name': 'coffee', 'price': 45 });
    data.push({ 'no': 45, 'name': 'milk', 'price': 12 });
    return res.status(200).json(data);
});
// #2 getById
routes.get('/api/products/:uid', (req, res) => {
    const data1 = { 'no': 78, 'name': 'sugar', 'price': 37 };
    const data2 = { 'no': 79, 'name': 'flour', 'price': 31 };
    if (req.params.uid === '5')
        return res.status(200).json(data1);
    else if (req.params.uid === '6')
        return res.status(200).json(data2);
    return res.status(200).json({});
});
// #3 insert record
routes.post('/api/products', (req, res) => {
    const data = req.body;
    return res.status(201).json(data);
});
/*       AUTHORIZATION DEMO     */
routes.get('/value', (req, res) => {
    // Just proving that the secret i accessable!!!
    const key = process.env.TOKEN_SECRET;
    console.log("The secret key was:" + key);
    const adminToken = AccessToken_1.AccessToken.generateToken(Role_1.Role.admin);
    const decryptedAdminRole = AccessToken_1.AccessToken.userRole(adminToken);
    const regularToken = AccessToken_1.AccessToken.generateToken(Role_1.Role.regular);
    const decryptedRegularRole = AccessToken_1.AccessToken.userRole(regularToken);
    return res.status(200).json({ 'done': 'yes' });
});
routes.post('/login', (req, res) => {
    /*
       // (1) CHECKING THE userName + password ....
       // IF okay then the token is generated according to the role
       // always okay in this demo
       const adminToken:string = AccessToken.generateToken('admin');
       res.setHeader('x-access-token',adminToken);
       return res.status(200).json({'token':'delivered'});
       */
});
// route just for admins
routes.get('/customers', (req, res) => {
    try {
        return AbstractEndpoint_1.AbstractEndpoint.produceResponse(SuccessCode_1.SuccessCode.OK, Role_1.Role.admin, Resource_1.Resource.customer, req, res);
    }
    catch (_a) {
        console.error('customer get');
    }
});
// the default (all other non-existing routes)
routes.get('*', (req, res) => {
    return res.status(404).send('no such route');
});
