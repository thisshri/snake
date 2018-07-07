var snake;
var globalSpeed;
var foodX;
var foodY;
var gridSize = 20;

var eatSound;
var gameOverSound;

var canvasHeight;
var btnPP;
var btnRestart;


var keepPlaying;

var htmlScore;

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

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.dir(0,-globalSpeed);
    } else if (keyCode === DOWN_ARROW){
        snake.dir(0,globalSpeed);
    }
    else if (keyCode === RIGHT_ARROW){
        snake.dir(globalSpeed,0);
    }
    else if (keyCode === LEFT_ARROW){
        snake.dir(-globalSpeed,0);
    }
    else if (keyCode == 80 || keyCode == 120){
        if (keepPlaying === true) {
            keepPlaying = false;
        }else {
            keepPlaying = true;
        }
    }else if (keyCode == 82 || keyCode == 114){ // r or R is pressed.
        restartGame();
    }
    

    
    
}

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