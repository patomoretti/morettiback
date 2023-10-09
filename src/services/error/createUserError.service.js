export const createUserErrorMsg = (user)=>{
    return `
        Uno o mas campos son invalidos,
        Listado de campos requeridos:
        name: Este campo es obligatorio. El dato recibido fue ${user.first_name},
        lastname: Este campo es obligatorio. El dato recibido fue ${user.last_name},
        email: Este campo es obligatorio. El dato recibido fue ${user.email},
    `
};  