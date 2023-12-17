import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { UsersController } from "../controllers/users.controller.js";
import { uploaderDocuments } from "../utils.js";


const router = Router();

// localhost:8080/api/users  (obteniendo todos los usuarios y eliminando los usuarios acorde a lo pedido del proyecto final)
router.get("/", UsersController.getAllUsers);
router.delete("/", UsersController.deleteUser);  

// localhost:8080/api/users/user-deleted
router.delete("/user-deleted", checkRole(["admin"], UsersController.deleteUser));
// localhost:8080/api/users/modify-role
router.put("/modify-role", UsersController.modifyRole)



// localhost:8080/premium/:uid  (pongo id enlace para que se modifique)
router.post("/premium/:uid",checkRole(["admin"]), UsersController.modifyRole);
router.put("/:uid/documents", uploaderDocuments.fields([
    {name:"identificacion", maxCount:1},
    {name:"domicilio", maxCount:1},
    {name:"estadDeCuenta", maxCount:1},
]), UsersController.uploadDocuments );


export {router as usersRouter};