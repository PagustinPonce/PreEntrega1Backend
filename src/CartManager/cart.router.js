import { Router } from "express";
import CartManager from "./cartManager.js";
import { isExist } from "../utils/utils.js";

const router = new Router();

router.get('/:cid', async (req,res)=>{

    try {
        
        const {cid} = req.params;

        const cartManager = new CartManager();

        let productosByCartId = await cartManager.getProductsByCartId(cid);

        if(!productosByCartId){res.getProductsByCartId(404).send({status: 'error', error: "El carrito no ha sido encontrado"})};

        res.send({status:'success', payload : productosByCartId});

    } catch (error) {
        
        console.log(error);

        res.send("Hubo un error");

    };

});

router.post('/', async (req,res)=>{

    await cartManager.addCart();

    res.send({status: 'success', payload: "El carrito ha sido creado"});

});

router.post('/:cid/products/:pid', async(req,res)=>{

    const {cid} = req.params;

    const {pid} = req.params;

    const cartExist = await isExist(cid, '/cart.json');

    const productExist = await isExist(pid, '/cart.json');

    if(!cartExist){

        return res.status(404).send({status: 'error', error:"Este carrito no existe"});

    }

    const {quantity} = req.body;

    await cartManager.addProductCart(cid,quantity,pid);

    res.send({status: 'success', payload: 'Los productos han sigo agregados al carrito'});

});

export default router;


