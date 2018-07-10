var GAMESIZE_X = 700;
var GAMESIZE_Y = 700;
var BLOCKSIZE = Math.min(GAMESIZE_X, GAMESIZE_Y) / 80;

var Snake = function () {
    this.head = {x:0,y:0};
    this.body = [this.head];
    
    this.moveToDir = "RIGHT";
    
    this.foodx = this.genLocation();
    this.foody = this.genLocation();
    
    
    this.genLocation = function () {
        let randomNumber = Math.random()*BLOCKSIZE;
        randomNumber = randomNumber - randomNumber % BLOCKSIZE;
        console.log("random number generated : ", randomNumber);
        return randomNumber;
    }
    
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
    



function setup() {
    keepPlaying = true;
    btnPP = createButton('Play/Pause');
    btnRestart = createButton('Restart');
    
    htmlScore = document.getElementById("score");
    htmlScore.textContent = "SCORE: 0";
    
    btnRestart.position(0,0);
    btnRestart.mousePressed(restartGame);
    
    btnPP.position(80,0);
    btnPP.mousePressed(requestPP)
    
    canvasHeight = 750;
    createCanvas(canvasHeight, canvasHeight); //square canvas shape
    snake = new Snake();
    globalSpeed = 20;
    //snake.generateFood();
    frameRate(10);
    getRandomLocation();
    
    eatSound = loadSound('asserts/sound/ateFood.mp3');
    gameOverSound = loadSound('asserts/sound/game_over.ogg');
    
    //creating wall


}

function requestPP() {
    if (keepPlaying === true){
        keepPlaying = false;
    } else {
        keepPlaying = true;
    }
}



function draw() {
    
    if (keepPlaying){
        
    fill(0,255,0);
    background(0);
    snake.update();
    snake.show();
    
    if (snake.died()){
        
       /*             
        console.log("Tail begin................");
        for (var i = 0; i < snake.total; i++){
            console.log(snake.tail[i].x,snake.tail[i].y);
        }
            
        console.log("Tail end................");
        console.log("food location ", foodX, foodY);    
        
        
        
        console.log("################ game over #################");
        
        */
        restartGame();
    }
    
        
    fill(255,120,20);
    rect(foodX,foodY,gridSize,gridSize);
    
        if (snake.eat(foodX,foodY)){
            
            
        
        console.log("head of snake.",snake.x,snake.y);
    
            
            
            //frameRate(snake.total);
            getRandomLocation();
            fill(255,120,20);
            rect(foodX,foodY,gridSize,gridSize);


            htmlScore.textContent = "SCORE: 0"+snake.total*5;
            eatSound.play();
            console.log("snake ate the food.");
        }
    } 
}// draw 

function getRandomLocation() {
    //console.log(innerWidth,innerHeight);
    foodX = floor((random(0,720)));
    foodY = floor((random(0,720)));
    console.log("food location ", foodX, foodY);
}
    
    
}

/*
function restartGame() {
    gameOverSound.play();
    
    snake.tail = [];
    snake.total = 0;
    htmlScore.textContent = "SCORE: 0";
    snake.x = 100;
    snake.y = 100;
    snake.xSpeed = 20;
    snake.ySpeed = 0;
        
    getRandomLocation();
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
    
    if (snake.head.x !== snake.foodx && snake.head.y !== snake.foody){
        
    }
    else{
        snake.genLocation;
    }
    
    
    
    
    
}