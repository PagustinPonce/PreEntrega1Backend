import { Router } from "express";
import { ProductManager } from "./productManager.js";
import { isExist } from "../utils/utils";


const router = new Router();

router.get('/', async (req,res)=>{

    try {
        
        const {limit} = req.query;

        const prodMan = new ProductManager();

        let productos = await prodMan.getProducts();

        if(limit && !isNaN(limit)){

            productos = productos.slice(0,Number(limit));

            res.send({status:'success', payload: limitedProducts})

        };

        res.send({status: 'success', payload: productos});

    } catch (error) {

        console.log(error);

        res.send("Hubo un error");

    };

});

router.get('/:pid', async (req,res)=>{

    try {
        
        const {pid} = req.params;

        const prodMan = new ProductManager();

        const productFound = await prodMan.getProductById(pid);

        if(!productFound){res.status(404).send({status: 'error', error: 'Producto no encontrado'})}
        
        res.send({status: 'success', payload: productFound});

    } catch (error) {

        console.log(error);

        res.send("Hubo un error");

    };

});

router.post('/', async (req,res)=>{

    const{
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail

    } = req.body

    if(!id || !title || !description || !code || !price || !status || !stock || !category){

        return res.send({status: 'error', error: "Completar todos los campos"});

    };

    await prodMan.addProduct(req.body);

    res.send({status: 'success', payload: req.body});

});

router.put('/:pid', async(req,res)=>{

    const {pid} = req.params;

    const productExist = await isExist(pid,`/product.json`);

    if(!productExist){

        return res.send(404).send({status: 'error', error:'El producto que esta buscando no se ha encontrado'});

    };

    await prodMan.updateProduct(pid,req.body);

    res.send({status: 'success', payload: req.body});

});

router.delete('/:pid', async(req,res)=>{

    const {pid} = req.params;

    const productExist = await isExist(pid,'/product.json');

    if(!productExist){

        return res.send(404).send({status:'error', error: "El producto que esta buscando no se ha encontrado"});

    };

    await prodMan.deleteProduct(pid)

    res.send({status: 'success', payload: "El producto ha sido borrado"});

});

export default router;