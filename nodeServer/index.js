//Node Server which will handle socket io connection

const io = require('socket.io')(8000);//last one is port

const users = {};               //Socket io listen The incoming event like Particular event listen krbe
//io.on sob lestin krbe


//jokhon ei connection asbe arrow function run hobe
//connection/event listen krbe 
io.on('connection',socket =>{

    socket.on('new-user-joined',name=>{
        //If any new user Joins,Let Other  User Connected to the server know!
       
        //user k ekta id dibe and id is name
        users[socket.id] = name //user a append krbe
        socket.broadcast.emit('user-joined',name); // the person who join exept him The other persons when join it will notify



    }); //jokhon ei user join krbe  //name vitore nia jaw and run koro//particular connection

    //wheb a person message it will notify

    //If someone  sends a message, boardcast it to other people
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });



    //if Some leave the chat let other people know!
    socket.on('disconnect', name=> {//disconneced build in function

        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
  
    });

    
    
})