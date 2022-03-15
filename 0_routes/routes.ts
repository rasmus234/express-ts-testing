import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { AccessToken } from '../2_sessions/AccessToken';
import { Role } from '../3_models/Role';

import { AbstractEndpoint } from '../1_endpoints/AbstractEndpoint';
import { SuccessCode } from '../3_models/SuccessCode';
import { Resource } from '../3_models/Resource';
dotenv.config({ path: 'config/middleware.env' });

const routes = express();

routes.use(cors());
routes.use(bodyParser.json());
routes.use(express.static('public'));
const urlencode = bodyParser.urlencoded({ extended: true });

/*
   The routes to using REST, just emmulating the data
*/

// #1 getAll
routes.get('/api/products', (req,res) => {
        const data=Array();
        data.push({'no':33,'name':'coffee','price':45});
        data.push({'no':45,'name':'milk','price':12});
        return res.status(200).json(data);
});
// #2 getById
routes.get('/api/products/:uid', (req,res) => {
        const data1={'no':78,'name':'sugar','price':37};
        const data2={'no':79,'name':'flour','price':31};
        if (req.params.uid==='5')
           return res.status(200).json(data1);
        else if (req.params.uid==='6')
           return res.status(200).json(data2);
        return res.status(200).json({});
});
// #3 insert record
routes.post('/api/products', (req,res) => {
        const data = req.body;
        return res.status(201).json(data);
});

/*       AUTHORIZATION DEMO     */
routes.get('/value', (req,res) => {

       // Just proving that the secret i accessable!!!
       const key = process.env.TOKEN_SECRET;
       console.log("The secret key was:" + key);

       const adminToken:string = AccessToken.generateToken(Role.admin);

       const decryptedAdminRole:Role = AccessToken.userRole(adminToken);

       const regularToken:string = AccessToken.generateToken(Role.regular);

       const decryptedRegularRole:Role = AccessToken.userRole(regularToken);
       
       return res.status(200).json({'done':'yes'});
});

routes.post('/login', (req,res) => {
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
 routes.get('/customers', (req,res) => {
   try{
      return AbstractEndpoint.produceResponse(SuccessCode.OK,Role.admin,Resource.customer, req,res);
   }catch{
      console.error('customer get');
   }
 });

// the default (all other non-existing routes)
routes.get('*', (req,res) =>{
     return res.status(404).send('no such route');
});

export {routes}

