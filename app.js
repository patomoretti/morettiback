import express from "express";
import require from "fs";

const port = 8080;
const app = express();
app.listen(port,()=>console.log(`Servidor activo ${port}`));


//leyendo productos JSON
const fs = require;
const productos = fs.readFileSync('./products.json', 'utf-8');
const productosParse = JSON.parse(productos);


//Diferentes rutas
app.get("/home",(request,response)=>{
    response.send("Pagina principal de la pagina");
});

app.get("/products",(req,res)=>{
    res.send(productos);
});

//Producto por ID
app.get("/products/:pId",(req,res)=>{
    const pId = parseInt(req.params.pId);
    const prodFind = productosParse.find(elm=>elm.id === pId);

    if (!productosParse) {
        res.send("El producto no existe");
    } else {
        res.send(prodFind);
    }
});

//Filtro por precio
app.get("/consulta/precio",(req,res)=>{
    const price = req.query.price;
    const productosFilter = productosParse.filter(producto=>producto.price === price);
    res.send(productosFilter);
});
