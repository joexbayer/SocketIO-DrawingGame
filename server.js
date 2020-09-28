var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var wordslist = require('words.js');


words = wordslist.words;
//[room_name, [user1, user2, user3], word, drawer, won]
var logs = [];
//var words = ['Bunny', 'Castle', 'Monkey', 'Penguin', 'Car', 'House', 'Guitar', 'Dog'];

app.use(express.static(__dirname+'/public'));

console.log('[SERVER] - Started');
app.get('/', function(req, res) {
	console.log('General Kenobi!');
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    socket.on('updateboard', function(data){
		socket.to(data[1]).emit('draw', data[0]);
	});
	socket.on('update-username', function(data){
		var log = findRoom(data[0]);
		logs[log][1][data[2]] = data[1];
		socket.broadcast.emit('update-name', [data[1], data[2]]);
	});
	socket.on('updateboard', function(data){
		socket.to(data[1]).emit('draw', data[0]);
	});
	socket.on('join-room', function(data){
		let log = findRoom(data[0]);
		if(log == null){
			logs.push([data[0], [data[1], null, null, null], null, null, 0]);
			log = logs.length-1;
			var userid = 0;
		} else {
			var total_users = getTotalUsers(logs[log]);
			if(total_users == 4){
				socket.emit('full');
				return;
			}
			if(logs[log][2] != null){
				socket.emit('in-progress');
				return;
			}
			var userid = findNextID(logs[log]);
			logs[log][1][userid] = data[1];
			socket.to(data[0]).emit('user-joined', [data[1], userid]);
		}
		socket.join(data[0]);
		socket.emit('join-room', [logs[log], userid]);
	});
	socket.on('leave-room', function(data){
		try {
			socket.leave(data[1]);
			var id = findRoom(data[1]);
			logs[id][1][data[0]] = null;
			socket.broadcast.emit('left-room', data[0]);
		} catch {
			;
		}
	});

	socket.on('start-game', function(data){
		var log = findRoom(data[0]);
		if(logs[log][4] && logs[log][4] != data[2]){
			return;
		}
		logs[log][2] = words[Math.floor(Math.random() * words.length)];
		logs[log][3] = data[2];
		var hidden_word = "";
		for(var i = 0; i < logs[log][2].length; i++){
			hidden_word += "_ ";
		}
		socket.to(data[0]).emit('guesser', [hidden_word, data[2]]);
		socket.emit('drawer', logs[log][2]);
	});

	socket.on('guess', function(data){
		try{
			var log = findRoom(data[0]);
			if(logs[log][2].toLowerCase() == data[1].toLowerCase()){
				logs[log][4] = data[2];
				io.in(data[0]).emit('won', data[2]);
				logs[log][2] = null;
			}
			io.in(data[0]).emit('guessed', [data[1], data[2]]);
		} catch {
			;
		}
	});
});

function findNextID(room){
	for(var i = 0; i < room[1].length; i++){
		if(room[1][i] == null){
			return i;
		}
	}
}

function getTotalUsers(room){
	var sum = 0;
	for(var i = 0; i < 4; i++){
		if(room[1][i] != null){
			sum += 1;
		}
	}
	return sum;
}


function findRoom(roomname){
	for (var i = 0; i < logs.length; i++) {
		if(logs[i][0] == roomname){
			return i;
		}
	}
	return null;
}



server.listen(5000, '127.0.0.1');