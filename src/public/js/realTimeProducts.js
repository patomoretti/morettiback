const socketClient = io();


//enviar un evento hacia el servidor
socketClient.emit("mensaje", "Esta en RealTimeProducts");


