import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next) => {
    switch (error.code) {
        case EError.AUTH_ERROR:
            res.json({ status: "error", error: "Error en autenticacion" });
        case EError.INVALID_JSON:
            res.json({ status: "error", error: error.message });
        case EError.DATABASE_ERROR:
            res.json({ status: "error", error: "Error al conectar la base de datos" });
        case EError.INVALID_PARAM:
            res.json({ status: "error", error: error.message });
        default:
            res.json({ status: "error", error: "Error desconocido" });
    }
}      