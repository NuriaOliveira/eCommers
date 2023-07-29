
let mensaje = "";
class ProductManager{
    constructor(){
        this.products = []
    }

    addProduct (titulo, desc, precio, img, cod, cant) {
        //no invento de codigo, sino lo ingresan no agrega el producto
        if(!products.some((p)=> p.code == cod) || cod.trim().length > 0) {
            producto = new Product();
            producto.id = products.length == 0 ? 1 : this.newId(products);
            producto.title = titulo ?? "Sin definir"
            producto.description = desc ?? "Sin definir"
            producto.price =  precio ?? 0
            producto.thumbnail = img ?? "Sin definir"
            producto.code = cod
            producto.stock = cant

            products.push(producto)
        }
        //en caso de que exista el codido tendría que avisar y no dejar que se agregue
    }

    getProducts(){
        return products;
    }

    getProductById(){
        let resultado = this.products.find;
        return resultado.length == 0? console.error("Not Found"): resultado
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


