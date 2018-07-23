var GAMESIZE_X =window.innerWidth;
var GAMESIZE_Y =window.innerHeight;
var BLOCKSIZE = Math.round ( Math.min(GAMESIZE_X, GAMESIZE_Y) / 80) ;
console.log(BLOCKSIZE);

var Snake = function () {
    this.head = {x:0,y:0};
    this.body = [this.head];
    this.foodx = BLOCKSIZE*3;
    this.foody = BLOCKSIZE*3;
    this.play = true;

    this.moveToDir = "RIGHT";

    this.generateRandomNumber = function(value){
        let randNum = Math.random()*value;
        randNum = Math.round(randNum);
        randNum -= randNum % BLOCKSIZE ;
       // console.log("randNum: ",randNum, "block size: ",BLOCKSIZE);

        return randNum;

    }

    this.generateFood = function() {
        this.foodx = this.generateRandomNumber(GAMESIZE_X);
        this.foody = this.generateRandomNumber(GAMESIZE_Y);

    }

    this.notHitBody = function() {
        //for each is not working with head object array.

        for (let i = 0; i < this.body.length-1; i++){
            if (this.body[i].x === this.head.x &&
                this.body[i].y === this.head.y){
                    //snake hit the body.
                    console.log("snake hit the body");
                return false;

            } //if
        }// loop
        return  true; //snake didn't hit the body.
    }// didntHitTheBody



    this.notHitBoundry = function () {
        //check if it hit the boundry
        // < 0 because snake shouldnot die on the fist row or first column of the game.
        if (this.head.x < 0 || this.head.y < 0 ||
            this.head.x >= GAMESIZE_X || this.head.y >= GAMESIZE_Y){
            console.log("sname hit boundry!");
            return false;
        }else {
            return true;
        }
    }// boundry

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
        else if (this.moveToDir === "STOP") {
            //don't do anything.
        }

        this.body.push({x:this.head.x, y: this.head.y});
        this.body.shift();

        //not hit the boundry
        //this.didntHitTheBody();

        //not hit the body
        //this.didntHitTheBoundry();

    }
    this.generateFood();

    this.restartGame = function () {
        //console.log("restartGame called.");
        //

        while (this.body.length > 1){
            this.body.pop();
            console.log("poping");
        }
        this.head.x = 0;
        this.head.y = 0;
        this.moveToDir = "RIGHT";
        score = 0;
        document.getElementById("score").innerText = score;
    }

}

var snake = new Snake();

var score = 0;

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
    else if (keyCode == 80 || keyCode == 120){
        snake.moveToDir = "STOP";
    }
}

function setup(){
    createCanvas(GAMESIZE_X, GAMESIZE_Y);
    frameRate(20);

    var lScore = document.getElementById("score");
    lScore.innerText = 0;

}

function draw(){
    background(0);

    // draw food
    fill(0, 255, 0);
    stroke(0, 255, 0);

    rect(snake.foodx ,snake.foody , BLOCKSIZE, BLOCKSIZE);



    fill(0, 255, 0);
    stroke(0, 255, 0);
    for (var i = 0 ; i < snake.body.length; i++){
        rect(snake.body[i].x ,snake.body[i].y , BLOCKSIZE, BLOCKSIZE);
    }

    if (snake.head.x === snake.foodx && snake.head.y === snake.foody){
        snake.body.push({x:snake.foodx, y:snake.foody});    //food becomes part of body.
        snake.keepMoving();
        /*
        head needs to move before checking the body.
        because food was just added here and it becomes part of body.
        */

        score++;
        document.getElementById("score").innerText = score;

        snake.generateFood();


    }


    if (snake.notHitBody() && snake.notHitBoundry()){
        if (snake.play){
            snake.keepMoving();
        }

    }else {
        snake.restartGame();

    }


}
