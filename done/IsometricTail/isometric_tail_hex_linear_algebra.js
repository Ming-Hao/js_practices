class DiamondBoard {
    constructor(radius, diagonalNum) {
        this.diamonds = [];
        this.radius = radius;
        this.diagonalNum = diagonalNum;
    }
    build(w, h, topOffset, leftOffset) {
        var canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.setAttribute('id', "myCanvas");
        canvas.setAttribute('width', String(w));
        canvas.setAttribute('height', String(h));

        canvas.setAttribute("style", "position: absolute;" +
            "top:" + topOffset + ";" +
            "left:" + leftOffset + ";" +
            "z-index: 0");

        this.initDiamonds(canvas);
    }

    initDiamonds(canvas) {
        for (var i = 0; i < this.diagonalNum; i++) {
            this.diamonds.push([]);
            for (var j = 0; j < this.diagonalNum; j++) {
                var diamond = {
                    x: j,
                    y: i,
                    state: "normal",
                    drawColor: "#000000",
                };
                this.diamonds[i].push(diamond);
            }
        }

        for (var i = 0; i < this.diamonds.length; i++) {
            for (var j = 0; j < this.diamonds[i].length; j++) {
                this.drawDiamond(canvas, this.diamonds[i][j]);
            }
        }

    }

    getDiamondCoord(x, y) {
        return {
            i: Math.sqrt(3) *  this.radius * (x-y/2),
            j: 3/2 * this.radius * y
        }
    }

    drawDiamond(canvas, diamond) {
        var ctx = canvas.getContext("2d");
       
        var offsetX = this.radius;
        var offsetY = this.radius;
        var center = this.getDiamondCoord(diamond.x, diamond.y);
        
        ctx.save();
        ctx.translate(offsetX + center.i, offsetY + center.j);
        var h = this.radius / 2 * Math.sqrt(3);
        var pt1_x = h;
        var pt1_y = -this.radius / 2;
        var pt2_x = 0;
        var pt2_y = -this.radius;
        var pt3_x = -h;
        var pt3_y = -this.radius / 2;
        var pt4_x = -h;
        var pt4_y = this.radius / 2;
        var pt5_x = 0;
        var pt5_y = this.radius;
        var pt6_x = h;
        var pt6_y = this.radius / 2;
        var pt7_x = pt2_x;
        var pt7_y = pt2_y + this.radius;
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(pt1_x, pt1_y);
        ctx.lineTo(pt2_x, pt2_y);
        ctx.lineTo(pt3_x, pt3_y);
        ctx.lineTo(pt4_x, pt4_y);
        ctx.lineTo(pt5_x, pt5_y);
        ctx.lineTo(pt6_x, pt6_y);
        ctx.lineTo(pt1_x, pt1_y);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(pt1_x, pt1_y);
        ctx.lineTo(pt2_x, pt2_y);
        ctx.lineTo(pt3_x, pt3_y);
        ctx.lineTo(pt7_x, pt7_y);
        ctx.lineTo(pt1_x, pt1_y);
        ctx.fillStyle = "#06b9f9"
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(pt3_x, pt3_y);
        ctx.lineTo(pt4_x, pt4_y);
        ctx.lineTo(pt5_x, pt5_y);
        ctx.lineTo(pt7_x, pt7_y);
        ctx.lineTo(pt3_x, pt3_y);
        ctx.fillStyle = "#116ed9"
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
}