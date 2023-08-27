

const socket = io()
const form = document.getElementById('idForm')

form.addEventListener('submit', (e)=>{
    
    e.preventDefault()
    //console.log(e.target)
    const datForm = new FormData(e.target) //genera un objeto iterador

    const prod = Object.fromEntries(datForm)//devuelve objeto simple clave valor de un objeto iterable

    //console.log(prod)
    socket.emit('nuevoProducto', prod)
    e.target.reset()
})