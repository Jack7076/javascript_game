var Cube;
var Nemisis;

function startGame() {
    gameArea.start();
    $('button').css('display', 'none');
    Cube = new component(30,30, '#3498db', 10, 120);
    Nemisis = new component(30,30, '#e74c3c', 380, 120);
}

// This function here can be used to create a Rectangle on the canvas element usage: var_name = new component(width, height, color, x, y);

function component(width, height, color, x, y){
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;

  // Frame Updater: this function will clear the existing element and then will create a new Object allowing for the ilusion of a moving object.
  this.update = function(){
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        // This line here is where the canvas element is inserted at it takes these inputs (what to insert, Where to insert). childNodes is what childNode the element will be placed at.
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //This sets the update timer for frame updates.
        this.interval = setInterval(updateFrame, 20);
    },
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function(){
    	$('canvas').remove();
    	$('button').css('display', 'block');
    	return;
    }
}

function updateFrame(){

  gameArea.clear();
  check_location();
  Cube.update();
  Nemisis.update();
  check_colide();

}

// Nemesis Ai. This AI will move towards the player object Cube.

function Nemesis_Ai(){

	//Get Cube and Nemesis Locations on the canvas.

	cubePosX = Cube.x;
	cubePosY = Cube.y;

    nemesisPosX = Nemisis.x;
    nemesisPosY = Nemisis.y;

}

function check_colide(){

	//Get objects location and then their width and height to check if the objects are inside each other.

	cubePosX = Cube.x;
	cubePosY = Cube.y;

    nemesisPosX = Nemisis.x;
    nemesisPosY = Nemisis.y;

    if (cubePosX < nemesisPosX + Nemisis.width  && cubePosX + Cube.width  > nemesisPosX &&
		cubePosY < nemesisPosY + Nemisis.height && cubePosY + Cube.height > nemesisPosY) {

    	console.log("Colision!");
    	Cube.x = 10;
    	Cube.y = 120;
    	gameArea.stop();
	}

}


//Edge detection and Anti Cube Vanish.

function check_location(){
	//This gets the position of the cube.
	var posX = Cube.x;
	var posY = Cube.y;
	// These check if the cube is at the edge or past it and will push the cube back if they are on it or go past it.
	if(posY <= 0){
		Cube.y += 2;
	}
	if(posY >= 240){
		Cube.y += -2;
	}
	if(posX <= 0){
		Cube.x += 2;
	}
	if(posX >= 450){
		Cube.x += -2;
	}

}

// Controls

$(document).keypress(function(e){

	//This here will check if the keypressed is W, A, S or D. Or any other control which is added later.

	console.log("Key " + e.which + " Was Pressed.");

	// w: 119
	// a: 97
	// s: 115
	// d: 100

	if(e.which == 119){
		//If W is pressed.

		Cube.y += -2;

	}

	if(e.which == 97){
		//If A is pressed.

		Cube.x += -2;

	}

	if(e.which == 115){
		//If S is pressed.

		Cube.y += 2;

	}

	if(e.which == 100){
		//If D is pressed.

		Cube.x += 2;

	}

	if(e.which == 176){
		//If Media FF is pressed.

		Cube.x += 20;

	}

});