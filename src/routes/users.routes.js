import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { UsersController } from "../controllers/users.controller.js";
import { uploaderDocuments } from "../utils.js";


const router = Router();

// localhost:8080/premium/:uid  (pongo id enlace para que se modifique)
router.post("/premium/:uid",checkRole(["admin"]), UsersController.modifyRole);
router.put("/:uid/documents", uploaderDocuments.fields([
    {name:"identificacion", maxCount:1},
    {name:"domicilio", maxCount:1},
    {name:"estadDeCuenta", maxCount:1},
]), UsersController.uploadDocuments );


export {router as usersRouter};