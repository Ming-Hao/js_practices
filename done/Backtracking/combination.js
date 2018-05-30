class Combinations {
    constructor(size, pick) {
        if(size < 1)
            size = 1;
        if(pick < 1)
            pick = 1;
        this.size = Math.floor(size);
        this.pick = Math.floor(pick);
        this.AllPossible = [];                
        this.array = [];

        for (var i = 0; i < this.pick; i++) {
            this.array.push(0);
        }
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

    start() {
        var index = this.NewPosition();
        if (index == -1) {   
            var newarray = [];
            for(var i = 0; i < this.array.length; i++)
                newarray.push(this.array[i]);
            this.AllPossible.push(newarray);
            return;
        }

        for (var i = 1; i <= this.size; i++) {
            if (this.HasNext(index, i)) {
                this.array[index] = i;
                this.start(); 
                this.array[index] = 0;
            }
        }
        return;
    }

    AllResult(){
        return this.AllPossible;
    }
}

var combination_generate = new Combinations(6, 2);
combination_generate.start();
console.log(combination_generate.AllResult());
