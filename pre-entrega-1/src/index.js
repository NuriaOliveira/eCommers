import express from 'express'
import prodsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import { __dirname } from './path.js'
import path from 'path'
import multer from 'multer'

const pathDatos = './productos.json'
const PORT = 8080


//config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img') //null no envia error
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}${file.originalname}`) //concateno nombre original desde mi archivo con milisegundos
    }
})


const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const upload = multer({storage: storage})

//Routes
app.use('/api/products', prodsRouter)

app.post('/api/products', prodsRouter)

app.put('/api/products', prodsRouter)

app.delete('/api/products', prodsRouter)


app.use('/api/carts', cartsRouter)

app.post('/api/carts', cartsRouter)

app.put('/api/carts', cartsRouter)

app.delete('/api/carts', cartsRouter)


app.use('/static', express.static(path.join(__dirname,'/public')))

/*
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen cargada")
})
*/
app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
})




//PRUEBA
//console.log(operacion.products)
//operacion.addProduct("Porter Cole - Let's fall in love", "Vinilo", 5841,null,"0840705107495",5)
//operacion.addProduct("Charles Mingus - Jazz Masters", "Vinilo", 5841,null,"0840705107556",5)
//operacion.addProduct("Nat King Cole - Unforgettablee", "Vinilo", 5841,null,"0840705103565",3)
//operacion.getProducts()
//console.log(await operacion.getProductById(2))
/*
let prod = await operacion.getProductById(1)

prod.title = "que onda?"


operacion.updateProduct(2,prod)
*/

//operacion.deleteProduct(2)

