import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {AccessToken} from '../2_sessions/AccessToken';
import {Role} from '../3_models/Role';
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static('public'));
const urlencode = bodyParser.urlencoded({extended: true});

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

/*       AUTHORIZATION DEMO     */
app.get('/value', (req, res) => {

    // Just proving that the secret i accessable!!!
    const key = process.env.TOKEN_SECRET;
    console.log("The secret key was:" + key);

    const adminToken: string = AccessToken.generateToken(Role.admin);

    const decryptedAdminRole: Role = AccessToken.userRole(adminToken);

    const regularToken: string = AccessToken.generateToken(Role.regular);

    const decryptedRegularRole: Role = AccessToken.userRole(regularToken);

    return res.status(200).json({'done': 'yes'});
});

app.post('/login', (req, res) => {

    // (1) CHECKING THE userName + password ....
    // IF okay then the token is generated according to the role
    // always okay in this demo
    const roleFromBody: number = req.body.role;
    const role: Role = roleFromBody as Role
    const adminToken: string = AccessToken.generateToken(role);
    res.cookie("jwt", adminToken)
    return res.status(200).json({'token': 'delivered'});

});

app.get("/role", (req, res) => {
    const token = req.cookies.jwt
    const role = AccessToken.userRole(token)
    console.log("role", role)
    return res.status(200).json({role});
});

// route just for admins
app.get('/admin', (req, res) => {

    const roleRequired = Role.admin
    const token = req.cookies.jwt
    const role = AccessToken.userRole(token)
    console.log(token, role)
    if (role >= roleRequired) {
        return res.status(200).json({admin: "admin"})
    }
    return res.status(403).json({})
});

app.get("/regular", (req, res) => {
    const roleRequired = Role.regular
    const token = req.cookies.jwt
    const role = AccessToken.userRole(token)
    if (role >= roleRequired) {
        return res.status(200).json({regular: "regular"})
    }
    return res.status(403).json({})
})

app.get("/anonymous", (req, res) => {
    const roleRequired = Role.anonymous
    const token = req.cookies.jwt
    const role = AccessToken.userRole(token)
    if (role >= roleRequired) {
        return res.status(200).json({anonymous: "anon"})
    }
    return res.status(403).json({})
})

// the default (all other non-existing routes)
app.get('*', (req, res) => {
    return res.status(404).send('no such route');
});

export {app}

