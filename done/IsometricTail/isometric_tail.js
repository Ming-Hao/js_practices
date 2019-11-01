class DiamondBoard {
    constructor(side, diagonalNum) {
        this.diamonds = [];
        this.side = side;
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
                                     "left:" + leftOffset);
        

        canvas.addEventListener("mousemove", moveDetect);
        canvas.addEventListener("mousedown", pressDetect);

        this.initDiamonds(canvas);
    }

    initDiamonds(canvas) {
        for (var i = 0; i < 2 * this.diagonalNum - 1; i++) {
            this.diamonds.push([]);
            var offsetX = this.side / 2;
            var leftOffset = (this.diagonalNum - (i + 1));
            if (leftOffset < 0)
                leftOffset *= (-1);

            for (var j = 0; j < this.diagonalNum; j++) {
                var diamond = {
                    x: offsetX + this.side * j + (this.side / 2) * leftOffset,
                    y: this.side / 2 * (i + 1),
                    state: "normal",
                    drawColor: "#000000",
                };

                this.drawDiamond(canvas, diamond, this.side, this.side);
                this.diamonds[i].push(diamond);

                if (this.diamonds[i].length == this.diagonalNum - leftOffset) {
                    break;
                }
            }
        }
    }
    drawAllHoverNormalDiamonds(canvas, diamonds) {
        for (var i = 0; i < diamonds.length; ++i) {
            for (var j = 0; j < diamonds[i].length; ++j) {
                if (diamonds[i][j].state == "click")
                    continue;

                this.drawDiamond(canvas, diamonds[i][j], this.side, this.side);
            }
        }
    }

    drawAllClickDiamonds(canvas, diamonds) {
        for (var i = 0; i < diamonds.length; ++i) {
            for (var j = 0; j < diamonds[i].length; ++j) {
                if (diamonds[i][j].state == "click")
                    this.drawDiamond(canvas, diamonds[i][j], this.side, this.side);;
            }
        }
    }

    drawDiamondBackground(canvas, diamond, w, h) {
        var ctx = canvas.getContext("2d");
        var bgColor = this.bgColormap.get(diamond.state);
        var borderColor = this.borderColormap.get(diamond.state);
        ctx.strokeStyle = borderColor;
        ctx.fillStyle = bgColor;
        ctx.beginPath();
        ctx.moveTo(diamond.x, diamond.y - h / 2);
        ctx.lineTo(diamond.x - w / 2, diamond.y);
        ctx.lineTo(diamond.x, diamond.y + h / 2);
        ctx.lineTo(diamond.x + w / 2, diamond.y);
        ctx.lineTo(diamond.x, diamond.y - h / 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    drawDiamondContent(canvas, diamond, w, h) {
        var ctx = canvas.getContext("2d");
        let x = diamond.x;
        let y = diamond.y;
        ctx.beginPath();
        ctx.arc(x, y, h / 4, 0, Math.PI * 2);
        ctx.fillStyle = diamond.drawColor;
        ctx.fill();
        ctx.closePath();
    }

    drawDiamond(canvas, diamond, w, h) {
        this.drawDiamondBackground(canvas, diamond, w, h);

        if (diamond.state == "click") {
            this.drawDiamondContent(canvas, diamond, w, h);
        }
    }

}



function moveDetect(e) {
    var canvas = document.getElementById("myCanvas");
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;


    var clicked = [];
    var i0 = -1;
    var j0 = -1;
    for (var i = 0; i < board.diamonds.length; ++i) {
        for (var j = 0; j < board.diamonds[i].length; ++j) {
            var distanceX = x - board.diamonds[i][j].x;
            var distanceY = y - board.diamonds[i][j].y;
            var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
            if (distance <= (board.side / 2) - 1) {
                i0 = i;
                j0 = j;
            }
            if (board.diamonds[i][j].state == "click")
                continue;

            board.diamonds[i][j].state = "normal";
        }
    }
    if (i0 != -1 && j0 != -1 && board.diamonds[i0][j0].state != "click")
        board.diamonds[i0][j0].state = "hover";

    board.drawAllHoverNormalDiamonds(canvas, board.diamonds);
    board.drawAllClickDiamonds(canvas, board.diamonds);
}

function pressDetect(e) {
    var canvas = document.getElementById("myCanvas");
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;

    var i0 = -1;
    var j0 = -1;
    var clickCount = 0;
    for (var i = 0; i < board.diamonds.length; ++i) {
        for (var j = 0; j < board.diamonds[i].length; ++j) {
            var distanceX = x - board.diamonds[i][j].x;
            var distanceY = y - board.diamonds[i][j].y;
            var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
            if (distance <= (board.side / 2) - 1) {
                i0 = i;
                j0 = j;
            }
            if (board.diamonds[i][j].state == "click")
                clickCount++;
        }
    }

    if (i0 == -1 || j0 == -1)
        return;

    if (board.diamonds[i0][j0].state == "click") {
        board.diamonds[i0][j0].state = "normal";
    }
    else {
        var black = clickCount % 2 == 0;
        var nextColor = black ? "#000000" : "#FFFFFF";
        board.diamonds[i0][j0].state = "click";
        board.diamonds[i0][j0].drawColor = nextColor;
    }
    board.drawDiamond(canvas, board.diamonds[i0][j0], board.side, board.side);
}