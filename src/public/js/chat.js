console.log('Este es el chat de Agustin');

const socket = io();

socket.emit('message')

socket.emit('evento_para_todos', 'Este es un mensaje que pueden ver todos')