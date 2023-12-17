import { UsersService } from "../services/user.service.js";
import { gmailTransporter } from "../config/gmail.config.js";
import dotenv from "dotenv";
dotenv.config();

export class UsersController {
    static modifyRole = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            const userRole = user.role;

            if (user.documents.length >= 3 && user.status === "completo") {
                if (userRole === "user") {
                    user.role = "premium";
                } else if (userRole === "premium") {
                    user.role = "user"
                } else {
                    res.json({ status: "error", message: "No se puede cambiar el rol de este usuario" });
                };
                await UsersService.updateUser(user._id, user);
                res.json({ status: "success", message: `El nuevo rol del usuario es ${user.role}` });
            } else {
                res.json({ status: "error", message: "El usuario no ha cargado todos los documentos" });
            }

        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    };

    static uploadDocuments = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            const identificacion = req.files?.identificacion?.[0] || null;
            const domicilio = req.files?.domicilio?.[0] || null;
            const estadoDeCuenta = req.files?.estadoDeCuenta?.[0] || null;
            const docs = [];
            if (identificacion) {
                docs.push({ name: identificacion, reference: identificacion.filename });
            };
            if (domicilio) {
                docs.push({ name: domicilio, reference: domicilio.filename });
            };
            if (estadoDeCuenta) {
                docs.push({ name: estadoDeCuenta, reference: estadoDeCuenta.filename });
            };
            user.documents = docs;
            if (docs.length === 3) {
                user.status = "completo"
            } else {
                user.status = "incompleto"
            };
            // console.log(user);
            const result = await UsersService.updateUser(user._id, user);
            res.json({ status: "success", data: result });

        } catch (error) {
            console.log(error.message);
            res.json({ status: "error", message: "No se pudo cargar el documento" });
        }
    };

    static getAllUsers = async (req, res) => {
        const user = await UsersService.getAllUsers();
        res.json({ status: "success", data: user, message: "Todos los usuarios han sido obtenidos correctamente" });
    };


    //elimina a un usuario en un tiempo determinado de no conexion
    static deleteUser = async (req, res) => {
        try {
            const user = await UsersService.getUserByEmail();
            const lastConnect = user.last_connection;
            const minute = new Date(undefined,undefined,undefined,undefined,5000);
            if (!lastConnect === minute) {
                const emailTemplate =
                    `<div>
                        <h1>Usuario eliminado</h1>
                        <p>Su usuario ha sido eliminado por inactividad. Puede volver a crear una cuenta haciendo click en el siguiente enlace de abajo </p>
                        <a href="http://localhost:8080/signup">Crear cuenta</a>
                    </div>`
                ;

                const info = await gmailTransporter.sendMail({
                    from: "Ecommerce Moretti",
                    to: user.email,
                    subject: "Eliminado por inactividad",
                    html: emailTemplate
                });
                res.json({ status: "success", data: info, message: `Correo enviado a ${user.email} exitosamente` });
                await UsersService.deleteUser();
            }

        } catch (error) {
            res.json({ status: "error", message: "El correo no se pudo enviar" });
        }

    };

};


setInterval(function () {
    const user = UsersService.getUserByEmail();
    const lastConnect = user.last_connection;
    const minute = 1 * 60 * 1000;
    if (lastConnect + minute) {
        const emailTemplate =
            `<div>
            <h1>Usuario eliminado</h1>
            <p>Su usuario ha sido eliminado por inactividad. Puede volver a crear una cuenta haciendo click en el siguiente enlace de abajo </p>
            <a href="http://localhost:8080/signup">Crear cuenta</a>
        </div>`
            ;

        const info = gmailTransporter.sendMail({
            from: "Ecommerce Moretti",
            to: user.email,
            subject: "Eliminado por inactividad",
            html: emailTemplate
        });
        res.json({ status: "success", data: info, message: `Correo enviado a ${user.email} exitosamente` });
        UsersService.deleteUser();
    }

}, 5000);