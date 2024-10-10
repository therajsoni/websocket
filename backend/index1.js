const ws = require('ws');
const wss =  new ws.Server('');

// when new client ok that is previous but disconnect close so called new Client 
wss.on('connection',(wsCilent)=>{
wsCilent.on('message',(message)=>{
    // broudcas all cilents
    wss.clients.forEach((client)=>{
        if(client.readyState === ws.OPEN && client !== wsCilent){
            client.send(message);
        }
    })
})

wsCilent.close('disconnected',()=>{
    console.log('client close');
})
})