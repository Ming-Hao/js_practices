class CombinationsIncludeSubsets {
    constructor(size, pick) {
        if (size < 1)
            size = 1;
        if (pick < 1)
            pick = 1;
        this.size = Math.floor(size);
        this.maxpick = Math.floor(pick);
        this.AllPossible = [];
        this.array = [];
    }
    HasNext(index, num) {
        for (var i = 0; i < index; i++) {
            if (this.array[i] >= num)
                return false;
        }
        return true;
    }
    NewPosition() {
        for (var i = 0; i < this.array.length; i++) {
            if (this.array[i] == 0)
                return i;
        }
        return -1;
    }

    IsAllZero() {
        for (var i = 0; i < this.array.length; i++) {
            if (this.array[i] != 0)
                return false;
        }
        return true;
    }
    CollectParticularSizeSubsets(num) {
        var index = this.NewPosition();
        if (index == -1) {
            var newarray = [];
            for (var i = 0; i < this.array.length; i++)
                newarray.push(this.array[i]);
            this.AllPossible.push(newarray);

            return;
        }

        for (var i = 1; i <= this.size; i++) {
            if (this.HasNext(index, i)) {
                this.array[index] = i;
                this.CollectParticularSizeSubsets(num);
                this.array[index] = 0;
            }
        }
        return;
    }

    start() {
        for (var max = 1; max <= this.maxpick; max++) {
            this.array = [];
            for (var i = 0; i < max; i++) {
                this.array.push(0);
            }
            this.CollectParticularSizeSubsets(max);
        }

    }

    AllResult() {
        return this.AllPossible;
    }
}

var combination_generate = new CombinationsIncludeSubsets(7, 5);
combination_generate.start();
var all = combination_generate.AllResult();
console.log(all.length);
