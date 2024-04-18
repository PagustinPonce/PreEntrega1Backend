import productsRouter from '../ProductManager/products.router.js'
import cartRouter from '../CartManager/cart.router.js'
import viewsRouter from './view.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import express from 'express';

const app = express();

const httpServer = app.listen(8080, error =>{

    console.log("Escuchando del puerto 8080");

});

const io = new Server(httpServer);

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/api/products', productsRouter)

app.use('/api/cart', cartRouter);

app.engine('handlebars',handlebars.engine({extname: 'handlebars'}));

app.set('views',__dirname+'/views');

app.set('view engine', 'handlebars');


app.use('/upload-file',uploader.single('myFile'),(req,res)=>{

    if(!req.file){

        return res.send('No se pudo subir el archivo');

    };

    res.status(200).send('El archivo se ha subido con exito');

});

app.use('/',viewsRouter);

let messages = [];

io.on('connection',socket=>{

    console.log('cliente conectado');

    socket.on('message', data=>{

        messages.push(data);

        io.emit('messagesLogs',messages);

    });

});