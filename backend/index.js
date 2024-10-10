const ws = require('ws');
const wss = new WebSocket.server({
    port : 8080
})
// when new client come that is previous but disconnect close so called new Client 
wss.on('connected' , (wsc) => {
    console.log('New client added');
    // broadCat to all cilent to see this client msg  -- name only message as set token
    wsc.on('message' , (message) => {
        console.log('${message');
        // broatCast msg to all cilent
         // every client have a object where obj look as {readyState : "OPEN" || "CLOSE"}
        wss.clients.forEach((client) => {
            if(client !== ws && client.readyState == WebSocket.OPEN){  // client : {readyState : "OPEN" || "CLOSE"} // and open && close keyword is WEBSOCKET
                // message as same as token
                client.send("message",message);
            }
        })
    })
    //close server socket
    wsc.on('close',()=>{
        console.log('disconnected');
    })
} )


