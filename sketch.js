var GAMESIZE_X = 700;
var GAMESIZE_Y = 700;
var BLOCKSIZE = Math.min(GAMESIZE_X, GAMESIZE_Y) / 80;

var Snake = function () {
    this.head = {x:0,y:0};
    this.body = [this.head];
    
    this.moveToDir = "RIGHT";
    
    this.genLocation = function () {
        let randomNumber = Math.random()*BLOCKSIZE;
        randomNumber = randomNumber - randomNumber % BLOCKSIZE;
        console.log("random number generated : ", randomNumber);
        return randomNumber;
    }
    
    this.foodx = this.genLocation();
    this.foody = this.genLocation();
    
    

    
    this.keepMoving = function () {
        if (this.moveToDir === "UP"){
            this.head.y -= BLOCKSIZE;
        }
        else if (this.moveToDir === "DOWN"){
            this.head.y += BLOCKSIZE;
        }
        else if (this.moveToDir === "RIGHT"){
            this.head.x += BLOCKSIZE;
        }   
        else if(this.moveToDir === "LEFT") {
            this.head.x -= BLOCKSIZE;
        }            
    }
}

var snake = new Snake();

function keyPressed() {
    if (keyCode === UP_ARROW && snake.moveToDir !== "DOWN") {
        snake.moveToDir = "UP";    
    }
    else if (keyCode === DOWN_ARROW && snake.moveToDir !== "UP"){
        snake.moveToDir = "DOWN"
    }
    else if (keyCode === RIGHT_ARROW && snake.moveToDir !== "LEFT"){
        snake.moveToDir = "RIGHT";
    }
    else if (keyCode === LEFT_ARROW && snake.moveToDir !== "RIGHT"){
        snake.moveToDir = "LEFT";
    }
}
    
    /*
    else if (keyCode == 80 || keyCode == 120){
        if (keepPlaying === true) {
            keepPlaying = false;
        }else {
            keepPlaying = true;
        }
    }else if (keyCode == 82 || keyCode == 114){ // r or R is pressed.
        restartGame();
    }
    */
    
function setup(){
    
    createCanvas(GAMESIZE_X, GAMESIZE_Y);
    frameRate(10);
    
}

function draw(){
    background(0);
    
    snake.keepMoving();
    
    fill(255);
    stroke(255);
    for (var i = 0 ; i < snake.body.length; i++){
        rect(snake.body[i].x ,snake.body[i].y , BLOCKSIZE, BLOCKSIZE);    
    }
    
    if (snake.head.x === snake.foodx && snake.head.y === snake.foody){
        snake.genLocation();
    }
    
}