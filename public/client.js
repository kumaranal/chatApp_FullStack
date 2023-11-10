const socket=io()

let username;
do{
    username=prompt('username...')
}while(!username)

let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__area')
textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:username,
        message:message.trim()
    }
    //append
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()
    //send to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let maindiv=document.createElement('div')
    let className=type
    maindiv.classList.add(className,'message')

    let markp=`
    <h3> ${msg.user}</h3>
    <p>${msg.message}</p>
    `

    maindiv.innerHTML=markp

    messageArea.appendChild(maindiv)

}

//receive message

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})

//scroll at last

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}