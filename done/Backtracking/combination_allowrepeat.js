class Combinations {
    constructor(size, pick, repeat) {
        if (size < 1)
            size = 1;
        if (pick < 1)
            pick = 1;

        this.size = Math.floor(size);
        this.pick = Math.floor(pick);
        this.repeat = Math.floor(repeat);

        this.AllPossible = [];
        this.array = [];

        for (var i = 0; i < this.pick; i++) {
            this.array.push(0);
        }

    }
    HasNext(duplicate_num, num) {
        for (var i = 0; i < duplicate_num.pos; i++) {
            if (this.array[i] >= num)
                return false;
        }
        return true;
    }
    FindNewPosition(duplicate_num, max_repeat) {
        var count = 0;
        for (var i = 0; i < this.array.length; i++) {
            if (this.array[i] == 0)
                count++;
        }

        for (var i = 0; i < this.array.length; i++) {
            if (this.array[i] == 0) {
                duplicate_num.pos = i;
                duplicate_num.repeat = Math.min(max_repeat, count);
                return;
            }
        }

        duplicate_num.pos = -1;
        duplicate_num.repeat = 0;
    }

    start() {
        this.backtracking(this.repeat);
    }

    backtracking(max_repeat) {
        var duplicate_num = {
            pos: -1,
            repeat: max_repeat
        }
        this.FindNewPosition(duplicate_num, max_repeat);
        var index = duplicate_num.pos;
        if (index == -1) {
            var newarray = [];
            for (var i = 0; i < this.array.length; i++) {
                newarray.push(this.array[i]);
            }
            console.log(`Array  ${newarray}`);
            this.AllPossible.push(newarray);
            return;
        }

        for (var i = 1; i <= this.size; i++) {
            if (this.HasNext(duplicate_num, i)) {
                var outer_repeat = duplicate_num.repeat;
                for (var n = outer_repeat; n >= 1; n--) {
                    for (var j = 0; j < n; j++) {
                        this.array[index + j] = i;
                    }
                    this.backtracking(max_repeat);
                    for (var j = 0; j < n; j++) {
                        this.array[index + j] = 0;
                    }
                }
            }
        }
        return;
    }

    AllResult() {
        return this.AllPossible;
    }
}

var combination_generate = new Combinations(6, 3, 3);
combination_generate.start();
var res = combination_generate.AllResult();
console.log(res.length);
console.log(res);
