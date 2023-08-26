import { Router } from 'express'
import ProductManager from '../controllers/produc.controller.js'


const prodsRouter = Router()
const productManager = new ProductManager()

prodsRouter.get('/', async(req, res) => {
    const {limit} = req.query

    const prods = await productManager.getProducts()

    const products = prods.slice(0,limit)

    res.status(200).send(prods)
})

prodsRouter.get('/:id', async(req, res) => {
    const {id} = req.params

    const prod = await productManager.getProductById(parseInt(id))

    if(prod)
        res.status(200).send(prod)
    else
        res.status(404).send("Producto  no encontrado")
})

prodsRouter.post('/', async(req, res) => {

    const prods = await productManager.addProduct(req.body)

    res.status(200).send(prods)
})

prodsRouter.put('/:id', async(req, res) => {
    const {id} = req.params

    const prod = await productManager.updateProduct(parseInt(id),req.body)

    if(prod)
        res.status(200).send(prod)
    else
        res.status(404).send("Producto  no encontrado")
})

prodsRouter.delete('/:id', async(req, res) => {
    const {id} = req.params

    const prod = await productManager.deleteProduct(parseInt(id))

    if(prod)
        res.status(200).send(prod)
    else
        res.status(404).send("Producto  no encontrado")
})

export default prodsRouter