import {promises as fs} from 'fs'

const path = './productos.json'

let mensaje = "";
class ProductManager{
    constructor(){
        this.products = []
    }

    async addProduct (titulo, desc, precio, img, cod, cant) {
        //no invento de codigo, sino lo ingresan no agrega el producto
        const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
        if(!prods.find(p => p.code === cod) || cod.trim().length > 0) {
            producto = new Product();
            producto.id = products.length == 0 ? 1 : this.newId(products);
            producto.title = titulo ?? "Sin definir"
            producto.description = desc ?? "Sin definir"
            producto.price =  precio ?? 0
            producto.thumbnail = img ?? "Sin definir"
            producto.code = cod
            producto.stock = cant

            prods.push(producto)
            await fs.writeFile(path, JSON.stringify(prods))
        }
        //en caso de que exista el codido tendría que avisar y no dejar que se agregue
        console.log("Producto")
    }

    async getProducts () {
        const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
        //return products;
        console.log(prods)
    }

    async getProductById(id){
        const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
        const prod = prods.find(p => p.id === id);
        return prod? console.error("Not Found"): prod
    }

    async updateProduct(id, product){
        const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
        const indice = prods.findIndex(p => p.id === id);
        if(indice != -1)
        {
            prods[indice].title = product.title
            prods[indice].description = product.description
            prods[indice].price =  product.price
            prods[indice].thumbnail = product.thumbnail
            prods[indice].code = product.code
            prods[indice].stock = product.stock
            await fs.writeFile(path, JSON.stringify(prods))
        } else{
            console.error("Not Found")
        }
    }

    async deleteProduct(id){
        const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
        const prod = prods.find(p => p.id === id);

        if(prod)
            await fs.writeFile(path, JSON.stringify(prods.filter(p => p.id != id)))
        else
            console.error("Not Found")
    }

    newId(products){
        let max = 0;
        products.foreach((p) => {
            max = p.id > max? p.id :  max;
        })

        return max + 1;
    }
}

class Product{
    constructor (){
        this.id;
        this.title = "";
        this.description="";
        this.price;
        this.thumbnail;
        this.code;
        this.stock;
    }
}


