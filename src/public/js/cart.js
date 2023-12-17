const socketClient = io();

socketClient.emit("mensaje", "Esta en Carts");

const title=document.getElementById('title');
const id=document.getElementById('id');
const description=document.getElementById('description');
const code=document.getElementById('code');
const price=document.getElementById('price');
const stock=document.getElementById('stock');

 
const productsadd=document.getElementById('productsadd');
const idDelete=document.getElementById('idDelete');

//Boton Agregar Producto
btn.addEventListener('click', ()=>{
    event.preventDefault()
    if(title.value && description.value && code.value && stock.value && price.value){
        socketClient.emit("producto", {title:title.value,description:description.value,code:code.value,stock:stock.value,price:price.value})
        productsadd.innerHTML='Lista de productos: '
    }
})

//Eliminar producto
btnDel.addEventListener('click',()=>{
    event.preventDefault()
    socketClient.emit("productDelete", idDelete.value);
});