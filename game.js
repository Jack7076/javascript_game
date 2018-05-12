var Cube;
//var Nemisis;
var Spageht1;
var Spageht2;
var Spageht3;
var gmB1 = false;
var gmB2 = false;
var gravityEnabled = true;
var fall = 0;
var deaths = 0;
var tagged = 0;
var jumping = false;
var text;
var points = 0;
var movSpeed = points;
//var jumpingNemisis = false;
var noGravHeight = 232;
var maxDistLeft = 450;
var gameWidth = 600;
var gameHeight = 500;
var platforms = [];

function startGame() {
    gameArea.start();
    $('#play').css('display', 'none');
    Cube = new component(30,30, '#3498db', 10, 120);
    text = new component(30,30, 'black', 10, 120);
    Spageht1 = new component(10,10, 'yellow', 130, 30); 
    Spageht2 = new component(10,10, 'yellow', 270, 70); 
    Spageht3 = new component(10,10, 'yellow', 90, 140); 
    //Nemisis = new component(30,30, '#e74c3c', 380, 120);
    wallLeft = new component(10,280, 'black', 480, 0);
    groundLevel1 = new component(480, 10, 'black', 0, 270);
    platform1 = new component(200, 10, 'orange', 50, 200);
    platforms.push(platform1);
}

// This function here can be used to create a Rectangle on the canvas element usage: var_name = new component(width, height, color, x, y);

function component(width, height, color, x, y, xv = 0, yv = 0){
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
  this.xv = xv;
  this.yv = yv;
  this.show = true;

  // Frame Updater: this function will clear the existing element and then will create a new Object allowing for the ilusion of a moving object.
  this.update = function(){
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.updateTxt = function(){

    	if(this.show){
    		ctx = gameArea.context;
	        ctx.font = "30px Arial";
			ctx.fillText("Score: " + points,10,50);
    	}
    }
  this.updateImg = function(){
  	if(this.show){
	  	ctx = gameArea.context;
	  	var img = document.getElementById("spaz");
	  	var pat = ctx.createPattern(img,"no-repeat");
	  	ctx.fillStyle = pat;
	  	ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}

}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = gameWidth;
        this.canvas.height = gameHeight;
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

function check_spageht3(spageht){

	if(checkColide(spageht, Cube)){

		points++;
		Spageht3 = null;

	}


}
function check_spageht2(spageht){

	if(checkColide(spageht, Cube)){

		points++;
		Spageht2 = null;

	}


}
function check_spageht1(spageht){

	if(checkColide(spageht, Cube)){

		points++;
		Spageht1 = null;

	}


}

function updateMov(){
	movSpeed = points;
	movSpeed++;
}

function movSpageht(spageht){

	if(Spageht3 !== null){
		Spageht3.xv = movSpeed;
		Spageht3.yv = movSpeed;
	}
	if(Spageht2 !== null){
		Spageht2.xv = movSpeed;
		Spageht2.yv = movSpeed;
	}
	if(Spageht1 !== null){
		Spageht1.xv = movSpeed;
		Spageht1.yv = movSpeed;
	}


}


function all_spaghet(){

	if(points >= 3 && gmB1 == false){
		
		Spageht1 = new component(10,10, 'yellow', 130, 30); 
    	Spageht2 = new component(10,10, 'yellow', 270, 70); 
    	Spageht3 = new component(10,10, 'yellow', 90, 140); 
    	gmB1 = true;
	}
	if(points >= 6 && gmB2 == false){
		
		Spageht1 = new component(10,10, 'yellow', 130, 30); 
    	Spageht2 = new component(10,10, 'yellow', 270, 70); 
    	Spageht3 = new component(10,10, 'yellow', 90, 140);
    	gmB2 = true;

	}


	if(points >= 9){
		$(".spaz").css("display", "inline-block");
	}

}

function timer(){

	if(points < 9){
		var computerScore = document.getElementById('timer');
	    var number = computerScore.innerHTML;
	    number++;
	    computerScore.innerHTML = number;
	}

}

function disappear(){
	timer();
	if(points >= 3){
		
	

	var rnd = Math.floor(Math.random() * 100) + 1;  
	console.log(rnd);
	if(rnd <= 33){
		console.log("Under 33");
		if(Spageht3 !== null){
			if(Spageht3.show){
				Spageht3.show = false;
			} else {
				Spageht3.show = true;
			}
}
		return;
	} 
	if(rnd <= 66){
		console.log("Under 66");
if(Spageht2 !== null){
		if(Spageht2.show){
			Spageht2.show = false;
		} else {
			Spageht2.show = true;
		}}

		return;
	} 
	if(rnd <= 100){
		console.log("Under 100");
if(Spageht1 !== null){

		if(Spageht1.show){

			Spageht1.show = false;
		} else {
			Spageht1.show = true;
		}}

		return;
	}
}
}

function movSpagSpeedSet(){

	var randTrueFalse = Math.floor(Math.random() * 2) + 1 ;

	if(randTrueFalse == 1){
		//Go up to Left

		movSpeed = points;
		movSpeed++;

	} else {
		//Go down to Right
		movSpeed = points;
		movSpeed++;

		movSpeed = -Math.abs(movSpeed);

	}

}

setInterval(disappear, 1000);

function updateFrame(){
  //Clear Game Area
  gameArea.clear();
  movSpageht();
  movSpagSpeedSet();
  //Game Objects
  Cube.update();
  text.updateTxt();
  //Nemisis.update();
  wallLeft.update();
  groundLevel1.update();
  platform1.update();

  //Spagehts
  if(Spageht3 !== null && Spageht3.show){
  	Spageht3.update();
  	check_spageht3(Spageht3);
  	check_location(Spageht3);
  	updatePhysics(Spageht3);
  }
  if(Spageht2 !== null && Spageht2.show){
  	Spageht2.update();
  	check_spageht2(Spageht2);
  	check_location(Spageht2);
  	updatePhysics(Spageht2);
  }
  if(Spageht1 !== null && Spageht1.show){
  	Spageht1.update();
  	check_spageht1(Spageht1);
  	check_location(Spageht1);
  	updatePhysics(Spageht1);
  }
  all_spaghet();
  //Physics Operations
  check_location(Cube);
 // check_colide();
  gravity();
  updatePhysics(Cube);



  checkInput();
 // gravity_e(Nemisis);

}

// Nemesis Ai. This AI will move towards the player object Cube.

function Nemesis_Ai(){

	//Get Cube and Nemesis Locations on the canvas.

	cubePosX = Cube.x;
	cubePosY = Cube.y;

    //nemesisPosX = Nemisis.x;
    //nemesisPosY = Nemisis.y;

}

function gravity(){


	if(gravityEnabled){
	
		if(Cube.y <= noGravHeight){

			if(!onPlatform(Cube)){
				Cube.yv += 1;
			}else{
				if(!keymap[87]){
					Cube.yv += -Cube.yv;
					jumping = false;
				}
			}

		} else{
			jumping = false;
		}
	}else{
		jumping = false;
	}

}

function gravity_e(applied_obj){
	if(gravityEnabled){
	
		if(applied_obj.y <= noGravHeight){

			if(!onPlatform(applied_obj)){
				applied_obj.yv += 1;
			}else{
				if(!keymap[38]){
					applied_obj.yv += -applied_obj.yv;
					//jumpingNemisis = false;
				}
			}

		} else{
			//jumpingNemisis = false;
		}
	}else{
		//jumpingNemisis = false;
	}
}

function grounded(applied_obj){
	if(applied_obj.y >= noGravHeight){
		return true;
	}
	return false;
}

function onPlatform(check){
	//Platform 1
	if(check.y <= 180 && check.y >= 165){

		if(check.x > 50 && check.x < 220){

			if(checkColide(check, platform1)){
				check.y += -1;
			}

			//jumpingNemisis = false;
			jumping = false;
			return true;
		}

	}


	return false;
}

function checkColide(gm1, gm2){

	gm1PosX = gm1.x;
	gm1PosY = gm1.y;

	gm2PosX = gm2.x;
	gm2PosY = gm2.y;

	if(gm1PosX < gm2PosX + gm2.width && gm1PosX + gm1.width > gm2PosX &&
	   gm1PosY < gm2PosY + gm2.height && gm1PosY + gm1.height > gm2PosY) {

		return true;

	}

	return false;

}

function displayAnger(ms){

    	$("#spaz").css("display", "inline-block");

    	sleep(ms);

    	$('#spaz').css("display", "none");

}

/*function check_colide(){

	//Get objects location and then their width and height to check if the objects are inside each other.

	cubePosX = Cube.x;
	cubePosY = Cube.y;

    nemesisPosX = Nemisis.x;
    nemesisPosY = Nemisis.y;

    if (cubePosX < nemesisPosX + Nemisis.width  && cubePosX + Cube.width  > nemesisPosX &&
		cubePosY < nemesisPosY + Nemisis.height && cubePosY + Cube.height > nemesisPosY) {

    	var colidev = Cube.xv + Nemisis.xv;

    	console.log("Colision! Force of: " + colidev);

    	displayAnger(700);

    	if(tagged == 0){
    		tagged += 1;
    	}
    	else {
    		tagged += -1;
    	}
	}

}*/

//Edge detection and Anti Cube Vanish.

function check_location(phy){
	//This gets the position of the Cube.
	var posX = phy.x;
	var posY = phy.y;
	// These check if the cube is at the edge or past it and will push the cube back if they are on it or go past it.
	if(posY <= 0){
		phy.y += 3;
		phy.yv = 0;
	}
	if(posY >= 240){
		phy.y += -3;
		phy.yv = 0;
	}
	if(posX <= 0){
		phy.x += 3;
		phy.xv = 0;
	}
	if(posX >= maxDistLeft){
		phy.x += -3;
		phy.xv = 0;
	}

	//This gets the position of the obj.
	/*var posX = Nemisis.x;
	var posY = Nemisis.y;
	// These check if the cube is at the edge or past it and will push the cube back if they are on it or go past it.
	if(posY <= 0){
		Nemisis.y += 3;
		Nemisis.yv = 0;
	}
	if(posY >= 240){
		Nemisis.y += -3;
		Nemisis.yv = 0;
	}
	if(posX <= 0){
		Nemisis.x += 3;
		Nemisis.xv = 0;
	}
	if(posX >= maxDistLeft){
		Nemisis.x += -3;
		Nemisis.xv = 0;
	}*/

}

// Update Physics
function updatePhysics(phy){
	// Player

	if(grounded(phy)){
		phy.yv*=0.90;
		phy.xv*=0.90;
	}else{
		phy.yv*=0.95;
		phy.xv*=0.95;
	}

	phy.x+=phy.xv;
	phy.y+=phy.yv;

	/*//Nemisis
	Nemisis.yv*=0.90;
	Nemisis.xv*=0.90;

	Nemisis.x+=Nemisis.xv;
	Nemisis.y+=Nemisis.yv;*/

}

// Controls

var keymap = {};
window.addEventListener("keyup", function(e){
if(e){
	keymap[e.keyCode]=false;
}});
window.addEventListener("keydown", function(e){
if(e){
	keymap[e.keyCode]=true;
}});

function checkInput(){

	// Up Arrow: 38
	// Down Arrow: 40
	// Left Arrow: 37
	// Right Arrow: 39

	/*if(keymap[38]){
		// Up Arrow
		if(!jumpingNemisis){
			Nemisis.yv += -10;
			jumpingNemisis = true;
		}
	}

	if(keymap[40]){
		// Down Arrow
		Nemisis.yv += 2;
	}

	if(keymap[37]){
		// Left Arrow
		if(Nemisis.xv > -3){
			Nemisis.xv += -2;
		}
	}

	if(keymap[39]){
		// Right Arrow
		if(Nemisis.xv < 3){
			Nemisis.xv += 2;
		}
	}*/


	if(keymap[87]){
		//If W is pressed.
		if(!jumping){
			Cube.yv += -10;
			jumping = true;
		}

	}
	if(keymap[65]){
		//If A is pressed.

		if(Cube.xv > -3){
			Cube.xv += -2;
		}

	}

	if(keymap[83]){
		//If S is pressed.

		Cube.yv += 2;

	}

	if(keymap[68]){
		//If D is pressed.
		if(Cube.xv < 3){
			Cube.xv += 2;
		}

	}

	if(keymap[176]){
		//If Media FF is pressed.

		//Cube.xv += 20;
	}
	if(keymap[177]){
		//If Media RW is pressed.

		//Cube.xv += -20;
	}
	if(keymap[27]){
		gravityEnabled = !gravityEnabled;
		sleep(300);
	}

}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

/*function setNewArea(){
	maxDistLeft = $('#new-area').val();
}*/

/*$(document).keypress(function(e){

	//This here will check if the keypressed is W, A, S or D. Or any other control which is added later.

	console.log("Key " + e.which + " Was Pressed.");

	// w: 119
	// a: 97
	// s: 115
	// d: 100

	if(e.which == 119){
		//If W is pressed.
		if(!jumping){
			Cube.yv += -10;
			jumping = true;
		}

	}

	if(e.which == 97){
		//If A is pressed.

	if(Cube.xv > -3){
		Cube.xv += -2;
	}

	}

	if(e.which == 115){
		//If S is pressed.

		Cube.yv += 2;

	}

	if(e.which == 100){
		//If D is pressed.
		if(Cube.xv < 3){
			Cube.xv += 2;
		}

	}

	if(e.which == 176){
		//If Media FF is pressed.

		Cube.xv += 20;

	}

});*/