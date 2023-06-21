'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Login = require('./Login');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

