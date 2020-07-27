
//Get Dom Elements in respective variables
const socket = io('http://localhost:8000');
const form = document.getElementById('sent-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container")  //problem //message will go inside container
//Audio that will play on reciving messages
var audio = new Audio('messenger.mp3');

//ekhane message append hobe

//Function Whice will Append Event info The Container

const append = (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left'){
        audio.play();
    }
    



}



//Ask new user For his/her name let the sever know

const name = prompt("Enter Your Name To Join");   //problem event
//then socket a emit krbo event
socket.emit('new-user-joined',name);  //then the function eun line-12 When new user will join lesten krbe on dara

//lesten krbe
//If New USer JOins,Receive the event From The Server
socket.on('user-joined',name=>{//user join name dicche

    append(`${name} Joined The Chat`, 'right' );

})


//if server sends the message server receive it
socket.on('receive',data=>{//user join name dicche

    append(`${data.name}: ${data.message}`, 'left' );

})


//if user leaves the chat append the info to the container
socket.on('left', name=>{//user join name dicche

    append(`${name}  left the Chat`, 'Right' );

})


//if the form submitted , Send server the messages

form.addEventListener('submit',(e)=>{

    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send',message);
    messageInput.value = '';
   
  
  })



