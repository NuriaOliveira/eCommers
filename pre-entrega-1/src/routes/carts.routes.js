import { Router } from 'express'
import CartManager from '../controllers/carts.controller.js'


const cartsRouter = Router()
const cartManager = new CartManager()

cartsRouter.get('/', async(req, res) => {
    const {limit} = req.query

    const carts = await cartManager.getCarts()

    const products = carts.slice(0,limit)

    res.status(200).send(carts)
})

cartsRouter.get('/:id', async(req, res) => {
    const {id} = req.params

    const cart = await cartManager.getCartById(parseInt(id))

    if(cart)
        res.status(200).send(cart)
    else
        res.status(404).send("Carrito  no encontrado")
})

cartsRouter.post('/', async(req, res) => {

    const carts = await cartManager.addCart(req.body)

    res.status(200).send(carts)
})

cartsRouter.put('/:id', async(req, res) => {
    const {id} = req.params

    const cart = await cartManager.updateCart(parseInt(id),req.body)

    if(cart)
        res.status(200).send(cart)
    else
        res.status(404).send("Carrito  no encontrado")
})

cartsRouter.delete('/:id', async(req, res) => {
    const {id} = req.params

    const cart = await cartManager.deleteCart(parseInt(id))

    if(cart)
        res.status(200).send(cart)
    else
        res.status(404).send("Producto  no encontrado")
})

export default cartsRouter