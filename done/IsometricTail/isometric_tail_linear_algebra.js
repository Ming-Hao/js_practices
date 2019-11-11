class DiamondBoard {
    constructor(width, height, diagonalNum) {
        this.diamonds = [];
        this.height = height;
        this.width = width;
        this.diagonalNum = diagonalNum;
        this.bgColormap = new Map();
        this.bgColormap.set("normal", "#D2691E");
        this.bgColormap.set("click", "#D2691E");
        this.bgColormap.set("hover", "#FFDD00");

        this.borderColormap = new Map();
        this.borderColormap.set("normal", "#FFFFFF");
        this.borderColormap.set("click", "#FFFFFF");
        this.borderColormap.set("hover", "#FFDD00");
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

        canvas.addEventListener("mousemove", moveDetect);
        canvas.addEventListener("mousedown", pressDetect);
        this.initDiamonds(canvas);
    }

    initDiamonds(canvas) {
        for(var i = 0; i < this.diagonalNum; i++) {
            this.diamonds.push([]);
            for(var j = 0; j < this.diagonalNum; j++) {
                var diamond = {
                    x: j,
                    y: i,
                    state: "normal",
                    drawColor: "#000000",
                };
                this.diamonds[i].push(diamond);
            }
        }

        for(var i = 0; i < this.diamonds.length; i++) {
            for(var j = 0; j < this.diamonds[i].length; j++) {
                this.drawDiamond(canvas, this.diamonds[i][j]);
            }
        }
        
    }

    drawNormalRect(canvas, diamond) {
        var ctx = canvas.getContext("2d");
        var bgColor = this.bgColormap.get(diamond.state);
        var borderColor = this.borderColormap.get(diamond.state);
        ctx.strokeStyle = borderColor;
        ctx.fillStyle = bgColor;
        ctx.beginPath();
        ctx.moveTo( diamond.x      * this.width,   diamond.y      * this.height);
        ctx.lineTo((diamond.x + 1) * this.width,   diamond.y      * this.height);
        ctx.lineTo((diamond.x + 1) * this.width,  (diamond.y + 1) * this.height);
        ctx.lineTo( diamond.x      * this.width , (diamond.y + 1) * this.height);
        ctx.lineTo( diamond.x      * this.width ,  diamond.y      * this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    getDiamondCoord(x, y) {
        return {
                    i: (x - y)*this.width / 2,
                    j: (x + y)*this.height / 2
               }
    }

    drawDiamond(canvas, diamond) {
        this.drawDiamondBackground(canvas, diamond);
        
        if(diamond.state == "click")
            this.drawDiamondContent(canvas, diamond);
    }

    drawDiamondBackground(canvas, diamond) {
        var ctx = canvas.getContext("2d");
        var bgColor = this.bgColormap.get(diamond.state);
        var borderColor = this.borderColormap.get(diamond.state);
        ctx.strokeStyle = borderColor;
        ctx.fillStyle = bgColor;

        var offsetX = this.diagonalNum * this.width / 2;
        var pt0 = this.getDiamondCoord(diamond.x, diamond.y);
        var pt1 = this.getDiamondCoord(diamond.x + 1, diamond.y);
        var pt2 = this.getDiamondCoord(diamond.x + 1, diamond.y + 1);
        var pt3 = this.getDiamondCoord(diamond.x, diamond.y + 1);

        ctx.beginPath();
        ctx.moveTo(offsetX + pt0.i, pt0.j);
        ctx.lineTo(offsetX + pt1.i, pt1.j);
        ctx.lineTo(offsetX + pt2.i, pt2.j);
        ctx.lineTo(offsetX + pt3.i, pt3.j);
        ctx.lineTo(offsetX + pt0.i, pt0.j);

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    drawDiamondContent(canvas, diamond) {
        var ctx = canvas.getContext("2d");
        var offsetX = this.diagonalNum * this.width / 2;
        var pt0 = this.getDiamondCoord(diamond.x, diamond.y);
        var pt2 = this.getDiamondCoord(diamond.x + 1, diamond.y + 1);
        
        ctx.save();
        ctx.beginPath();
        ctx.translate((pt0.i + pt2.i) / 2 + offsetX, (pt0.j + pt2.j) / 2);
        if(this.height > this.width) {
            ctx.scale(this.width / this.height, 1);
            ctx.arc(0, 0, this.width / 3, 0, Math.PI * 2);
        }
        else {
            ctx.scale(1, this.height / this.width);
            ctx.arc(0, 0, this.height / 3, 0, Math.PI * 2);
        }
        
        ctx.fillStyle = diamond.drawColor;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    getCoord(x, y) {
        var x0 = x - this.diagonalNum * this.width / 2;;
        var y0 = y;

        var column = Math.floor(x0 / this.width + y0 / this.height);
        var row    = Math.floor(y0 / this.height - x0 / this.width);

        return { 
                 i: (row),
                 j: (column) 
               };
    }
}

var last_i0 = -1;
var last_j0 = -1;

function moveDetect(e) {
    var canvas = document.getElementById("myCanvas");
    var mx = e.pageX - canvas.offsetLeft;
    var my = e.pageY - canvas.offsetTop;

    var coord = board.getCoord(mx,my);
    var i0 = coord.i;
    var j0 = coord.j;

    if(i0 >= 0 && j0 >= 0) {
        if(i0 < board.diamonds.length && j0 < board.diamonds[i0].length) {
            if (board.diamonds[i0][j0].state == "click") {
                return;
            }
            else {
                board.diamonds[i0][j0].state = "hover";

                if(i0 != last_i0 || j0 != last_j0)
                    if(last_i0 != -1 && last_j0 != -1)
                        if(board.diamonds[last_i0][last_j0].state == "hover") {
                            board.diamonds[last_i0][last_j0].state = "normal";
                            board.drawDiamond(canvas, board.diamonds[last_i0][last_j0]);
                        }
                        
                board.drawDiamond(canvas, board.diamonds[i0][j0]);
                
                last_i0 = i0;
                last_j0 = j0;
            }
        }
    }
}

function pressDetect(e) {
    var canvas = document.getElementById("myCanvas");
    var mx = e.pageX - canvas.offsetLeft;
    var my = e.pageY - canvas.offsetTop;

    var coord = board.getCoord(mx, my);
    var i0 = coord.i;
    var j0 = coord.j;

    var clickCount = 0;
    for (var i = 0; i < board.diamonds.length; ++i) {
        for (var j = 0; j < board.diamonds[i].length; ++j) {
            if (board.diamonds[i][j].state == "click")
                clickCount++;
        }
    }

    if(i0 >= 0 && j0 >= 0) {
        if(i0 < board.diamonds.length && j0 < board.diamonds[i0].length) {
            if (board.diamonds[i0][j0].state == "click") {
                board.diamonds[i0][j0].state = "normal";
            }
            else {
                var black = clickCount % 2 == 0;
                var nextColor = black ? "#000000" : "#FFFFFF";
                board.diamonds[i0][j0].state = "click";
                board.diamonds[i0][j0].drawColor = nextColor;
            }
            board.drawDiamond(canvas, board.diamonds[i0][j0]);
        }
    }
}