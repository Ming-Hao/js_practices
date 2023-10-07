class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = 0;
        this.radius =  Math.random() * (20 - 5) + 5;
    }
    updateVelocity(gravity, groundY) {
        if (this.y >= groundY) {
            this.y = groundY;
            return;
        }
        this.velocity = this.velocity + gravity;
        this.y = this.y - this.velocity;
    }
    startBounce(gravity) {
        this.velocity = Math.random() * (20 - 10) + 10;
        this.velocity = this.velocity + gravity;
        this.y = this.y - this.velocity;
    }
}