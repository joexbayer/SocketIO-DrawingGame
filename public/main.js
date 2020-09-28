var canvas = document.getElementById("drawCanvas");
var ctx = canvas.getContext("2d");
var socket = io.connect('http://' + document.domain + ':' + location.port);

var block = [];
var line = [];
var isDrawing = false;
var userid;
var color = 'black';
var brushsize = 5;
var imDrawing = false;
var drawer = null;
var roomid = null;

canvas.width = screen.width*0.5;
canvas.height = screen.height*0.6;

function setColor(newcolor){
	color = newcolor;
}
function setBrushSize(x){
	brushsize = x;
}

function startDraw(){
	isDrawing = true;
}

function newUser(name, id){
	if(name != null){
		var ul = document.getElementById("userlist");
		var tr = document.createElement('tr');
	    var td = document.createElement('td');
	    var td1 = document.createElement('td');
	    td.id = id;
	    td.appendChild(document.createTextNode(name));
	    td1.id = id+'score';
	    td1.appendChild(document.createTextNode(0));
	    tr.appendChild(td);
	    tr.appendChild(td1);
	    ul.appendChild(tr);
	}
}

function drawCircle(x, y, color_style, br){
	if(line.length > 1){
		if(line[0][0] == 0 || line[0][0] == 0){
			line = [];
			return;
		}
		ctx.beginPath();
		ctx.strokeStyle = color_style;
		ctx.lineWidth = br;
		ctx.moveTo(line[0][0], line[0][1]);
		ctx.lineTo(line[1][0], line[1][1]);
		ctx.stroke();
		line.shift();
		line.push([x,y]);
	} else {
		line.push([x,y]);
	}
}