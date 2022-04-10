import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {AccessToken} from '../2_sessions/AccessToken';
import {Role} from '../3_models/Role';
import cookieParser from "cookie-parser";
import {AbstractEndpoint} from "../1_endpoints/AbstractEndpoint";
import {Resource} from "../3_models/Resource";
import {DB} from "../2_sessions/DB";
import {Api} from "../2_sessions/Api";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static('public'));
bodyParser.urlencoded({extended: true});

DB.connect().then(() => {
    console.log('Connected to DB');
});
Api.getAllProducts().then(value => {
    console.log(value);
});
/*
   The routes to using REST, just emmulating the data
*/

// #1 getAll
app.get('/api/products', (req, res) => {
    const data = Array();
    data.push({'no': 33, 'name': 'coffee', 'price': 45});
    data.push({'no': 45, 'name': 'milk', 'price': 12});
    return res.status(200).json(data);
});
// #2 getById
app.get('/api/products/:uid', (req, res) => {
    const data1 = {'no': 78, 'name': 'sugar', 'price': 37};
    const data2 = {'no': 79, 'name': 'flour', 'price': 31};
    if (req.params.uid === '5')
        return res.status(200).json(data1);
    else if (req.params.uid === '6')
        return res.status(200).json(data2);
    return res.status(200).json({});
});
// #3 insert record
app.post('/api/products', (req, res) => {
    const data = req.body;
    return res.status(201).json(data);
});

//generates a cookie with a jwt with the role coming from the request's body
app.post('/login', (req, res) => {
    const roleFromBody: number = req.body.role;
    const role: Role = roleFromBody as Role
    const token: string = AccessToken.generateToken(role);
    res.cookie("jwt", token)
    return res.status(200).json({'token': 'delivered'});

});

//gets the current role
app.get("/role", (req, res) => {
    const token = req.cookies.jwt
    const role = AccessToken.userRole(token)
    console.log("role", role)
    return res.status(200).json({role});
});

// route just for admins
app.get('/admin', (req, res) => {
    return AbstractEndpoint.produceResponse(200,Role.admin, Resource.customer, req,res).json({})
});
// route just for regular users
app.get("/regular", (req, res) => {
    return AbstractEndpoint.produceResponse(200,Role.regular, Resource.products, req,res).json({})
})

// route just for anonymous users
app.get("/anonymous", (req, res) => {
    return AbstractEndpoint.produceResponse(200,Role.anonymous, Resource.products, req,res).json({})
})

// the default (all other non-existing routes)
app.get('*', (req, res) => {
    return res.status(404).send('no such route');
});

export {app}

