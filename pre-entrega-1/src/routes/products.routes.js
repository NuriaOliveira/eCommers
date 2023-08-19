import { Router } from 'express'
//import { ProductManager } from '../index.js'


const prodsRouter = Router()

prodsRouter.get('/', async(req, res) => {
    const {limit} = req.query

    const prods = await ProductManager.getProducts()

    const products = prods.slice(0,limit)

    res.status(200).send(prods)
})

prodsRouter.get('/:id', async(req, res) => {
    const {id} = req.query

    const prod = await productManager.getProductsById(parseInt(id))

    if(prod)
        res.status(200).send(products)
    else
        res.status(404).send("Producto  no encontrado")
})

export default prodsRouter