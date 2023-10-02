export class OrdersController{
    static getAllOrders = async(req,res)=>{
        res.json({status:"sucess", message:"Has obtenido todos los pedidos"});
    };

    static getOrderById = async(req,res)=>{
        const orderId = req.params.oid;
        res.json({status:"sucess", message:"ID del pedido:"});
    };

    static createOrder = async(req,res)=>{
        const newOrder = req.body;
        res.json({status:"sucess", message:"Creando el pedido"});
    };

    static resolveOrder = async(req,res)=>{
        const orderId = req.params.oid;
        res.json({status:"sucess", message:"Completar/Cancelar pedido"});
    };
}; 