const socketClient = io();

const chatbox = document.getElementById("chatbox");
const chat = document.getElementById("messageLogs");
let user;

//Usuario identificandose
Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingrese su email",
    inputValidator: (value) => {
        if (!value) {
            return "El email es obligatorio"
        }
    },
    allowOutsideClick: false

}).then((result) => {
    user = result.value;
    socketClient.emit("authenticated", `Usuario ${user} ha iniciado sesion`);
})


chatbox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (chatbox.value.trim().length > 0) {
            socketClient.emit("message", {user:user, message:chatbox.value});
            chatbox.value = "";
        }
    }
});

socketClient.on("messageHistory", (dataServer) => {
    let messageElmts = "";
    dataServer.forEach(item => {
        messageElmts = messageElmts + `${item.user}: ${item.message} <br/>`
    });
    chat.innerHTML = messageElmts;
});

