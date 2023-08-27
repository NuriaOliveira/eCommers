import express from 'express'
import prodsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import { __dirname } from './path.js'
import path from 'path'
import multer from 'multer'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io' 
import ProductManager from './controllers/produc.controller.js'

const pathDatos = './productos.json'
const PORT = 8080
const app = express()

//config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img') //null no envia error
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}${file.originalname}`) //concateno nombre original desde mi archivo con milisegundos
    }
})

const server = app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
})



//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const upload = multer({storage: storage})

app.engine('handlebars', engine())//defino motor de plantillas y config
app.set('view engine', 'handlebars')//setting de mi app de hbs
app.set('views', path.resolve(__dirname, './views'))//resolver rutas absolutas a partir de rutas relativas
app.use('/static', express.static(path.join(__dirname,'/public')))//unir rutas en una sola concatenacion

//Server Socket io
const io = new Server(server)
let mensajes = []
const products = new ProductManager()

io.on('connection', (socket) => {

    console.log("Servidor Socket.io conectado")
    
    socket.on('mensajeConexion', (user) => {
        if(user.rol === "Admin"){
            socket.emit('credencialesConexion', "Usuario valido")
        }else{
            socket.emit('credencialesConexion', "Usuario no valido")
        }
    })

    socket.on('mensaje', (infoMensaje) => {
        console.log(infoMensaje)
        mensajes.push(infoMensaje)
        socket.emit('mensajes', mensajes)
    })

    socket.on('nuevoProducto', (nuevoProd) => {
        //prods.push(nuevoProd)
        products.addProduct(nuevoProd)
        socket.emit('prods', products.getProducts())
    })
})


//Routes
app.use('/api/products', prodsRouter)

app.use('/api/carts', cartsRouter)

app.get('/static', (req, res) => {
    
    res.render('home', {

        css: "style.css",
        title: "Home",
        js: "script.js"
       
    })
})

app.get('/realtimeproducts', (req, res) => {
    
    res.render('realTimeProducts', {

        css: "style.css",
        title: "Alta Productos",
        js: "realTimeProducts.js"
       
    })
})









