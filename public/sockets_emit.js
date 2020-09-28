var socket = io.connect('http://' + document.domain + ':' + location.port);
//EMIT
function startGame(){
	drawer = userid;
	socket.emit('start-game', [roomid, document.getElementById("guess-input").value, userid]);
	document.getElementById("join-cont").style.height = '12vh';
	document.getElementById("game-button").style.visibility = 'hidden';
}

function sendGuess(){
	if(!imDrawing){
		socket.emit('guess', [roomid, document.getElementById("guess-input").value, userid]);
		document.getElementById("guess-input").value = "";
	}
}

function changeUsername(){
	document.getElementById("username").style.animation = "none";
	if(userid != null){
		socket.emit('update-username', [roomid, document.getElementById("username").value, userid]);
	}
}

window.onbeforeunload = function(){
    //disconnect user
   socket.emit('leave-room', [userid, roomid]);
}

function joinRoom(){
	if(document.getElementById("roomname-input").value == ""){
		alert("Roomname cannot be empty!");
		return;
	}
	socket.emit('join-room', [document.getElementById("roomname-input").value, document.getElementById("username").value]);
}

function stopDraw(){
	block = [];
	block.push([null, null]);

	socket.emit('updateboard', [block, roomid, userid]);
	isDrawing = false;
	block = [];
	line = [];
}

function draw(evt) {
	if(isDrawing && imDrawing){
		let rect = canvas.getBoundingClientRect();
   		let x = (evt.clientX - rect.left) / (rect.right - rect.left);
    	let y = (evt.clientY - rect.top) / (rect.bottom - rect.top);

    	if(block.length > 2){
    		socket.emit('updateboard', [block, roomid, userid]);
    		block = [];
    	} else {
    		block.push([x, y, color, brushsize]);
    	}
    	drawCircle(x * canvas.width, y * canvas.height, color, brushsize);
	}
}