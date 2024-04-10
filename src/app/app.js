import productsRouter from '../ProductManager/products.router.js'
import cartRouter from '../CartManager/cart.router.js.'

import express from 'express';

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter);

app.listen(8080, error =>{

    console.log("Escuchando del puerto 8080");

});