import {promises as fs} from 'fs'

import { __dirname } from '../path.js'
import path from  'path'


const pathDatos = path.join(__dirname,'../carritos.json') 
let mensaje = "";

class CartManager{
   

    constructor(){
        this.carts = []
    }

    async addCart (cart) {
        try {
            //verifico que el archivo  no este vacio
            let data = await fs.readFile(pathDatos, 'utf-8')
            if(data == 0 )
                await fs.writeFile(pathDatos, JSON.stringify(this.carts))
        
            //no invento de codigo, sino lo ingresan no agrega el producto
            this.carts = JSON.parse(await fs.readFile(pathDatos, 'utf-8'))
            
                const carrito = new Cart();
                carrito.id = this.newId(this.carts);
                carrito.product = cart.product
                carrito.quantity = cart.quantity

                this.carts.push(carrito)
                await fs.writeFile(pathDatos, JSON.stringify(this.carts))

                return mensaje = "Producto cargado a carrito"
            
           
        } catch (error) {
            
        }
        
    }

    async getCarts () {
        const carts = JSON.parse(await fs.readFile(pathDatos, 'utf-8'))
        return carts;
        //console.log(carts)
    }

    async getCartById(id){
        const carts = JSON.parse(await fs.readFile(pathDatos, 'utf-8'))
        const cart = carts.find(p => p.id === id);
        //console.log(cart)
        return cart ?? false
    }

    async updateCart(id, cart){
        const carts = JSON.parse(await fs.readFile(pathDatos, 'utf-8'))
        const indice = carts.findIndex(c => c.id === id && c.product == cart.product);
        if(indice != -1)
        {
            carts[indice].quantity ++
     
            await fs.writeFile(pathDatos, JSON.stringify(carts))
        } else{
            cart.id = id
            carts.push(cart)
            await fs.writeFile(pathDatos, JSON.stringify(carts))
        }
    }


    async deleteProduct(id){
        const carts = JSON.parse(await fs.readFile(pathDatos, 'utf-8'))
        const cart = carts.find(c => c.product === id);

        if(cart)
            await fs.writeFile(pathDatos, JSON.stringify(carts.filter(c => c.product != id)))
        else
            console.error("Not Found")

            return cart
    }

    newId(carts){
        let max = 0;
        /*carts.foreach((p) => {
            max = p.id > max? p.id :  max;
        }) */
        for(let p of carts){
            max = p.id > max? p.id :  max;
        }
        return max + 1;
    }
}

class Cart{
    constructor (){
        this.id;
        this.product;
        this.quantity ;
    }
}


export default CartManager