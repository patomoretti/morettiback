const socketClient = io();

socketClient.emit("mensaje", "Esta en Productos");

const products=document.getElementById("products");
const title=document.getElementById("title");
const id=document.getElementById("id");
const description=document.getElementById("description");
const price=document.getElementById("price");
const code=document.getElementById("code");
const stock=document.getElementById("stock");
const category=document.getElementById("category");

//botones
const addCart=document.getElementById("addCart");

addCart.addEventListener('click', ()=>{
    event.preventDefault()
    socketClient.emit("producto", {title:title.value,id:id.value,description:description.value,price:price.value,code:code.value,stock:stock.value,category:category.value})
    products.innerHTML='Lista de productos: '
});

socketClient.on("ListaProductos", (ProductList)=>{
    let elementContainer="products";
    ProductList.forEach(({title,id,description,price,code,stock,category,addCart}) => {
        elementContainer=elementContainer+
        `<ol>
        <li>Nombre: ${title} </li>
        <li>ID: ${id} </li>
        <li>Descripcion: ${description} </li>
        <li>Precio: ${price} </li>
        <li>Stock: ${stock} </li>
        <li>Codigo: ${code} </li>
        <li>Categoria: ${category} </li>
        <button>${addCart}</button>
        </ol>`
    });
});

