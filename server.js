const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require("./router/api"));

app.listen(8015, ()=>{
    console.log('listening on port 8015');
});