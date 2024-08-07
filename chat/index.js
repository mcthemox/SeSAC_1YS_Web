const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// {소켓아이디:닉네임}
let list = {}

io.on('connection', (socket) => {
  console.log('Server Socket Connected');

  socket.emit('info', socket.id);

//   io.emit('notice',socket.id + '님이 입장하셨습니다.')

  socket.on('username', (name) => {
    list[socket.id] = name;

    io.emit('list',list);

    io.emit('notice', name + '님이 입장하셨습니다.')
  })

  socket.on('send', (json) => {
    json['from'] = socket.id;
    // json {msg : ~~~, from : ~~~ , to : ~~~~}
    json['username'] = list[socket.id]
    // json {msg : ~~~, from : ~~~, username : ~~~, to : ~~~~}

    json['is_dm']=false

    if(json.to === '전체') {
        io.emit('newMSG', json)}
    else  {
        json['is_dm'] = true
        const socketID = Object.keys(list).find(key => list[key] == json.to)
        io.to(socketID).emit('newMSG',json)
        socket.emit('newMSG',json)
    }
  })

  socket.on('disconnect', () => {
    io.emit('notice', list[socket.id] + '님이 퇴장하셨습니다.');
    delete list[socket.id]
    io.emit('list', list)
})
});



http.listen(8000, () => {
  console.log('서버포트 : ', 8000);
});


// socket.emit('이벤트명', data) 메세지 보낼때
// socket.on('이벤트명', (data)=> {}) 메세지 받을때