/*
const socket = io()

socket.emit('mensajeConexion', {user: "Nuri", rol: "Admin"})

socket.on('credencialesConexion', (info)=>{
    console.log(info)
})
*/

const socket = io()

const botonChat = document.getElementById('botonChat')
const parrafosMensajes = document.getElementById('parrafosMensajes')
const valInput = document.getElementById('chatBox')
const fila = document.getElementById('tbody')

let user
/*
Swal.fire({
    title: "Identificacion de usuario",
    text: "Por favor ingrese su nombre de usuario",
    input: "text",
    inputValidator: (valor) => {
        return !valor && "Ingrese un nombre de usaurio valido"
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
})
*/

botonChat.addEventListener('click', () => {
    let fechaActual = new Date().toLocaleString()

    if(valInput.value.trim().length > 0){
        socket.emit('mensaje', {fecha: fechaActual, user: user, mensaje: valInput.value})
        valInput = ""
    }
})

socket.on('mensajes',(arrayMeansajes)=>{
    parrafosMensajes.innerHTML = ""
    arrayMeansajes.forEach(mensaje => {
        parrafosMensajes.innerHTML += `<p>${mensaje.fecha}: ${mensaje.user} escribio ${mensaje.mensaje} </p>`
    });
})

socket.on('prods', (productos)=>{
    productos.forEach(producto => {
        fila.innerHTML += `
            <tr>
                <th scope="row">${producto.id}</th>
                <td>${producto.title}</td>
                <td>${producto.desciption}</td>
                <td>${producto.price}</td>
                <td>${producto.code}</td>
                <td>${producto.stock}</td>
                <td>${producto.category}</td>
            </tr>
        
        `
    });
})