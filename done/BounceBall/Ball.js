class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius =  Math.random() * (20 - 5) + 5;
        this.velocityX = 0; 
        this.velocityY = 0; 
    }
    updateVelocity(gravity, groundY, boundLeft, boundRight) {
        if (this.y >= groundY) {
            this.y = groundY;
            this.velocityX = 0;
            this.velocityY = 0;
            return;
        }
        this.velocityY = this.velocityY + gravity;
        this.y = this.y - this.velocityY;

        if (this.x > boundRight) {
            this.velocityX = this.velocityX * (-1);
        }
        else if (this.x < boundLeft) {
            this.velocityX = this.velocityX * (-1);
        }
        this.x = this.x + this.velocityX
    }
    startBounce(gravity, velocityX = 0, velocityY = 0) {
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.velocityY = this.velocityY + gravity;
        this.y = this.y - this.velocityY;
        this.x = this.x + this.velocityX;
    }
}