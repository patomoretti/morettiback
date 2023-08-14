const socketClient = io();

socketClient.emit("mensaje", "Esta en Productos");

const products=document.getElementById('products');
const title=document.getElementById('title');
const description=document.getElementById('description');
const code=document.getElementById('code');
const price=document.getElementById('price');
const stock=document.getElementById('stock');

//botones
const addCart=document.getElementById('addCart');

addCart.addEventListener('click', ()=>{
    event.preventDefault()
    socketClient.emit("producto", {title:title.value,description:description.value,code:code.value,stock:stock.value,price:price.value})
    products.innerHTML='Lista de productos: '
});

socketClient.on("ListaProductos", (ProductList)=>{
    let elementContainer="products";
    ProductList.forEach(({title,description,code,price,stock,addCart}) => {
        elementContainer=elementContainer+
        `<ol>
        <li>Nombre: ${title} </li>
        <li>Descripcion: ${description} </li>
        <li>Stock: ${stock} </li>
        <li>Codigo: ${code} </li>
        <li>Precio: ${price} </li>
        <button>${addCart}</button>
        </ol>`
    });
});

