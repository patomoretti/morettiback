export class BusinessController{
    static getAllBusiness = async(req,res)=>{
        res.json({status:"sucess", message:"get all business"});
    };

    static getBusinessById = async(req,res)=>{
        const businessId = req.params.bid;
        res.json({status:"sucess", message:"get buisness by id"});
    };

    static createBusiness = async(req,res)=>{
        const newBusiness = req.body;
        res.json({status:"sucess", message:"save business"});
    };

    static addProduct = async(req,res)=>{
        const businessId = req.params.bid;
        const newProduct = req.body;
        res.json({status:"sucess", message:"add product"});
    };
}; 