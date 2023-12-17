const socketClient = io();


//enviar un evento hacia el servidor
socketClient.emit("mensaje", "Esta en RealTimeProducts");

const title=document.getElementById('title');
const description=document.getElementById('description');
const code=document.getElementById('code');
const price=document.getElementById('price');
const stock=document.getElementById('stock');
const idDelete=document.getElementById('idDelete');

//botones
const btn=document.getElementById('btn');
const btnDel=document.getElementById('btnDel');
//Inicio lista
const productsadd=document.getElementById('productsadd');

//Agregando producto
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

socketClient.on("arrayProductos", (arrayProd)=>{
    let elementContainer="productsadd";
    arrayProd.forEach(({title,description,code,price,stock}) => {
        elementContainer=elementContainer+
        `<ol>
        <li>Nombre: ${title} </li>
        <li>ID: ${id} </li>
        <li>Descripcion: ${description} </li>
        <li>Precio: ${price} </li>
        <li>Codigo: ${code} </li>
        <li>Stock: ${stock} </li>
        <li>Categoria: ${category} </li>
        </ol>`
    });
});