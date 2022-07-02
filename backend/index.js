import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import * as UserController from './controllers/UserController.js'

import checkAuth from './utils/checkAuth.js'


mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.sfmzs.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error ' , err));

    
const app = express();
app.use(express.json())

app.post('/auth/login', UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)


app.listen(7777, (err) => {
    if(err) {
        return console.log(err)
    }
    console.log('server OK')
})