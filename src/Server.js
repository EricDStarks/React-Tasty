'use strict';
import Login from "./Login";

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Login = require('./Login');
const verifyUser = require('./verifyUser');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

async function verifyUser(request, response, next) {
    let auth = request.headers.authorization
    if (auth !== undefined) {
        let token = auth.split(" ")[1]
        let headers = {
            Authorization: `Bearer ${token}`
        }
        let response = await axios.get(process.env.AUTH0_DOMAIN, { headers: headers })
        request.user = response.data
    }
    next()
}

app.use(verifyUser)

//Endpoint to initiate login process
app.get('/Login', async (request, response)=>{
    {
        const loginFeatures = {
            redirectUri: 'http://localhost:3000',
            responseType: 'token id_token',
            scope: 'openid profile',
        };
        const loginUrl = auth0Client.authorizedUrl(loginFeatures);
        response.redirect(loginUrl)
    }
});

//Endpoint to callback that Auth0 will redirect user after successful login 
app.get('/callback', (request, response)=> {
    auth0Client.parseHash((error, authResult) =>{
        if (authResult && authResult.accessToken && authResult.idToken) {
            response.redirect('/dashboard');
        }   else if (error) {
            response.redirect('/error')
        }
    });
});

//Endpoint that logs out and clears the user session
app.get('/logout', (request, response) =>{
    response.redirect('/')
});