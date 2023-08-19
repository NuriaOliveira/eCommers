const pathDatos = '../product.js'
class ProductManager{


    constructor(){
        this.products = []
    }

    async addProduct (titulo, desc, precio, img, cod, cant, cat, st) {
        //verifico que el archivo  no este vacio
        let data = await fs.readFile(pathDatos, 'utf-8')
        if(data == 0 )
            await fs.writeFile(pathDatos, JSON.stringify(this.products))
       
        //no invento de codigo, sino lo ingresan no agrega el producto
        this.products = JSON.parse(await fs.readFile(pathDatos, 'utf-8'))
        if(!this.products.find(p => p.code === cod) && cod.trim().length > 0) {
            const producto = new Product();
            producto.id = this.newId(this.products);
            producto.title = titulo ?? "Sin definir"
            producto.description = desc ?? "Sin definir"
            producto.price =  precio ?? 0
            producto.thumbnail = img ?? "Sin definir"
            producto.code = cod
            producto.stock = cant
            producto.category = cat
            producto.status = st

            this.products.push(producto)
            await fs.writeFile(pathDatos, JSON.stringify(this.products))
        }
        //en caso de que exista el codido tendría que avisar y no dejar que se agregue
        console.log(this.products)
    }

    async getProducts () {
        const prods = JSON.parse(await fs.readFile(pathDatos, 'utf-8'))
        return prods;
        //console.log(prods)
    }

    async getProductById(id){
        const prods = JSON.parse(await fs.readFile(pathDatos, 'utf-8'))
        const prod = prods.find(p => p.id === id);
        //console.log(prod)
        return prod ?? console.error("Not Found")
    }

    async updateProduct(id, product){
        const prods = JSON.parse(await fs.readFile(pathDatos, 'utf-8'))
        const indice = prods.findIndex(p => p.id === id);
        if(indice != -1)
        {
            prods[indice].title = product.title
            prods[indice].description = product.description
            prods[indice].price =  product.price
            prods[indice].thumbnail = product.thumbnail
            prods[indice].code = product.code
            prods[indice].stock = product.stock
            prods[indice].category = product.category
            prods[indice].status = product.status
            await fs.writeFile(pathDatos, JSON.stringify(prods))
        } else{
            console.error("Not Found")
        }
    }

    async deleteProduct(id){
        const prods = JSON.parse(await fs.readFile(pathDatos, 'utf-8'))
        const prod = prods.find(p => p.id === id);

        /*if(prod)
            await fs.writeFile(pathDatos, JSON.stringify(prods.filter(p => p.id != id)))
        else
            console.error("Not Found")*/

            return prod
    }

    newId(prods){
        let max = 0;
        /*prods.foreach((p) => {
            max = p.id > max? p.id :  max;
        }) */
        for(let p of prods){
            max = p.id > max? p.id :  max;
        }
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
        this.category;
        this.status;
    }
}