const socketClient = io();

socketClient.emit("mensaje", "Esta en Home");
