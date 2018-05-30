class Puzzle {
    constructor(grid) {
        this.grid = grid;
    }
    IsLegal(coord, num) {
        var x = coord.x;
        var y = coord.y;
        var group_x = Math.floor(x / 3);
        var group_y = Math.floor(y / 3);

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var original = this.grid[group_x * 3 + i][group_y * 3 + j]
                if (num == original)
                    return false;
            }
        }
        for (var i = 0; i < 9; i++) {
            if (i == y)
                continue;
            if (num == this.grid[x][i])
                return false;
        }
        for (var i = 0; i < 9; i++) {
            if (i == x)
                continue;
            if (num == this.grid[i][y])
                return false;
        }
        return true;
    }
    FindUnassignedLocation(coord) {
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] == 0) {
                    coord.x = i;
                    coord.y = j;
                    return true;
                }
            }
        }
        return false;
    }
    SolveSudoku() {
        var coord = {
            x: -1,
            y: -1
        }
    
        // If there is no unassigned location, we are done
        if (!this.FindUnassignedLocation(coord))
            return true; // success!
    
        // consider digits 1 to 9
        for (var num = 1; num <= 9; num++) {
            // if looks promising
            if (this.IsLegal(coord, num)) {
                // make tentative assignment
                this.grid[coord.x][coord.y] = num;
    
                // return, if success, yay!
                if (this.SolveSudoku())
                    return true;
    
                // failure, unmake & try again
                this.grid[coord.x][coord.y] = 0;
            }
        }
        return false; // this triggers backtracking
    }
    
}


var arr = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0],
];
var arr2 = [
    [3, 9, 0, 6, 0, 7, 5, 1, 0],
    [5, 0, 8, 9, 0, 2, 0, 4, 3],
    [7, 0, 1, 0, 0, 8, 0, 0, 9],
    [8, 1, 0, 4, 6, 0, 3, 9, 2],
    [6, 3, 0, 1, 2, 9, 0, 7, 4],
    [0, 2, 9, 0, 7, 0, 6, 5, 0],
    [0, 5, 3, 0, 0, 0, 4, 8, 0],
    [1, 0, 4, 0, 0, 6, 0, 0, 7],
    [0, 0, 6, 0, 8, 4, 0, 2, 5]
];

var puz1 = new Puzzle(arr);
console.log(puz1.SolveSudoku());
console.log(arr);
var puz2 = new Puzzle(arr2);
console.log(puz2.SolveSudoku());
console.log(arr2);

