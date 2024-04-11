import fs, { readFile, writeFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

export default class CartManager{

    #carts;

    constructor(){

        this.#carts = [];

        this.path = "./carrito.json";

    }

    readFile = async()=>{

        try {
            
            if(this.path){

                const carts = await fs.promises.readFile(`${this.path}`, 'utf-8');

                return JSON.parse(carts);

            };

        } catch (error) {
            
            throw new Error('No se puede leer el archivo');

        };

    };

addCart= async()=>{

    try {

        this.#carts = await this.readFile();

        const cart = {

            id: uuidv4(),

            products: []

        }

        this.#carts.push(cart);

        await fs.promises.writeFile(`${this.path}`,JSON.stringify(this.#carts,null,'\t'),'utf-8');

        console.log("Se agrego al carrito");

        return cart;
        
    } catch (error) {
        
    }

    getProductsByCartId = async(id) =>{

        try {
            
            const cart = await fs.readFile(this.path, 'utf-8');

            const cartFound = cart.find((cart)=>cart.id ===id);

            return cartFound.products;

        } catch (error) {
            
        }
    }


    addProductCart = async (cid,quantity,pid)=>{

        try {
            
            const carts = await fs.readFile(this.path);

            const cartIndex = carts.findIndex(cart => cart.id === cartIndex);

            const productIndex = carts[cartIndex].products.findIndex(p => p.productId === pid);

            if(productIndex < 0){

                const productAdd = {productId : pid , quantity :quantity};

                carts [cartIndex].products.push(productAdd);

                await fs.writeFile(carts,this.path);

            }

            carts[cartIndex].products[productIndex].quantity +=quantity;

            await fs.writeFile(carts,this.path);

        } catch (error) {
            console("Hubo un error")
        }
    }
}

};