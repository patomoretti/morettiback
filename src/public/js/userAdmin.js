const socketClient = io();

const userDelete = document.getElementById('userDelete');
const userModify = document.getElementById('userModify');



userDelete.addEventListener('click', ()=>{
    socketClient.emit("userDelete");
})
 