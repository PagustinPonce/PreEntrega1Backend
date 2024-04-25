import productsRouter from '../ProductManager/products.router.js'
import cartRouter from '../CartManager/cart.router.js'
import viewsRouter from './view.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from '../utils/utils.js';

import express from 'express';

const app = express();

const httpServer = app.listen(8080, error =>{

    console.log("Escuchando del puerto 8080");

});

const io = new Server(httpServer);

app.use(express.static('src/public'))

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/api/products', productsRouter)

app.use('/api/cart', cartRouter);

app.engine('handlebars',handlebars.engine({extname: 'handlebars'}));

app.set('views','src/views');

app.set('view engine', 'handlebars');

app.use('/',viewsRouter);

let messages = [];

io.on('connection',socket=>{

    console.log('cliente conectado');

    socket.on('message', data=>{

        messages.push(data);

        io.emit('messagesLogs',messages);

    });

});