function Snake () {
    this.x = 100;
    this.y = 100;
    
    this.total = 0;
    this.tail = [];
    
                          
    this.xSpeed = 20;
    this.ySpeed = 0;
    
    this.update = function () {
        //
        if (this.total > 0) {
            this.tail.unshift(createVector(this.x,this.y));
            this.tail.pop;
        }
        
        //
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        //this.x = this.x + this.xSpeed;
        //this.y = this.y + this.ySpeed;
    }
    
    this.show = function () {
        rect(this.x, this.y, gridSize,gridSize);
        for (var i = 0; i < this.total; i++) {
            rect( this.tail[i].x, this.tail[i].y , gridSize, gridSize);
        }
        
        
        console.log("In show, begins, ######################");
        
        console.log("head", this.x, this.y);
        for (var i = 0; i < this.total; i++){
            console.log(this.tail[i].x,this.tail[i].y);
        }
        
        
        console.log("In show, ends, ######################");
        
    }
    
    this.dir = function(x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }
    
    this.eat = function(fx, fy) {
        if (dist(fx,fy,this.x,this.y) < 20){
            this.tail.unshift(createVector(fx, fy));
            this.total++;
            return true;
            
        } else {
            return false;
        }
        
    }
    this.died = function() {
        //touches itself
        for (var i = 0; i < this.total; i++){
            //console.log(snake.tail[i].x,snake.tail[i].y);
            if (dist(this.x, this.y, this.tail[i].x, this.tail[i].y) < 5){
                return true;
            }
        }
        //outer wall
        if (this.x < -10 || this.x > 760 || this.y < -10 || this.y > 760){
            console.log("wall is hit.");
            return true;
        } else {
            false;
        }
        
    }

}