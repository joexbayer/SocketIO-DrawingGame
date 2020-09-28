socket.on('draw', function(data){
	if(!isDrawing){
		for (var i = 0; i < data.length; i++) {
			if(data[i][0] != null && data[i][1] != null){
				let x = data[i][0]* canvas.width;
    			let y = data[i][1]* canvas.height;
    			drawCircle(x, y, data[i][2], data[i][3]);
			} else {
				line = [];
			}
		}
	}
});

socket.on('guesser', function(data){
	imDrawing = false;
	document.getElementById("join-cont").style.height = '12vh';
	document.getElementById("guess-word").innerHTML = data[0];
	drawer = data[1];
	document.getElementById("game-button").style.visibility = 'hidden';
});

socket.on('drawer', function(data){
	imDrawing = true;
	document.getElementById("guess-word").innerHTML = data;
});

socket.on('guessed', function(data){
	if(data[1] == userid){
		var winner = document.getElementById('username').value;
	} else {
		var winner = document.getElementById(data[1]).innerHTML;
	}
	var div = document.getElementById("chat-log");
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(winner + " : "+data[0]));
    div.appendChild(p);
});

socket.on('won', function(data){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if(data == userid){
		document.getElementById("game-button").style.visibility = 'visible';
		var winner = document.getElementById('username').value;
		document.getElementById('ownscore').innerHTML = parseInt(document.getElementById('ownscore').innerHTML) + 100;
	} else {
		var winner = document.getElementById(data).innerHTML;
		document.getElementById(data+'score').innerHTML = parseInt(document.getElementById(data+'score').innerHTML)+100;
	}
	if(drawer == userid){
		document.getElementById('ownscore').innerHTML = parseInt(document.getElementById('ownscore').innerHTML )+70;
	} else {
		document.getElementById(drawer+'score').innerHTML = parseInt(document.getElementById(drawer+'score').innerHTML)+70;
	}
	document.getElementById("info").innerHTML = winner + ' guessed the word!';
	document.getElementById("join-cont").style.height = '90vh';
	imDrawing = false;
});

socket.on('left-room', function(data){
	document.getElementById(data).remove();
	document.getElementById(data+"score").remove();
});

socket.on('full', function(data){
	document.getElementById("info").innerHTML = "This room is full!";
});
socket.on('in-progress', function(data){
	document.getElementById("info").innerHTML = "This room is currently drawing!";
});

socket.on('update-name', function(data){
	var nameli = document.getElementById(data[1]);
	if(nameli != null){
		nameli.innerHTML = data[0];	
	}
});

socket.on('user-joined', function(data){
	newUser(data[0], data[1]);
});

socket.on('join-room', function(data){
	roomid = document.getElementById("roomname-input").value;
	document.getElementById("roomname").innerHTML = data[0][0];
	document.getElementById("room-info").removeAttribute("hidden");
	document.getElementById("room-input").remove();
	document.getElementById("info").innerHTML = "Select a username!";
	userid = data[1];
	if(userid == 0){
		document.getElementById("game-button").style.visibility = 'visible';
	}
	for(var i = 0; i < data[0][1].length; i++){
		if(data[1] != i){
			newUser(data[0][1][i], i);
		}
	}

});