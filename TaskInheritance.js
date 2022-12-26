/* API:
new IntBuilder(int) // constructor takes starting integer, if not passed starts with 0;
.plus(...n)         // take infinite number of integers and sum all with stored value;
.minus(...n)        // take infinite number of integers and subtract from stored value; 
.multiply(n)        // multiply param n on stored value;
.divide(n)          // leaves integer part of division stored value on n; 
.mod(n)             // leaves remainder of the division stored value with on n;
.get()              // returns stored value;

random(from, to)   // static method; from, to: integer; values limits the range of random values; 

// EXAMPLE:
IntBuilder.random(10, 100);          // 42;

let intBuilder = new IntBuilder(10); // 10;
intBuilder
  .plus(2, 3, 2)                     // 17;
  .minus(1, 2)                       // 14;
  .multiply(2)                       // 28;
  .divide(4)                         // 7;
  .mod(3)                            // 1;
  .get();                            // -> 1;

  // API:

new StringBuilder(str)   // constructor takes starting string, if not passed starts with '';
plus(...str)             // takes infinite number of strings and concat with stored string;
minus(n)                 // cut last n chars from stored string;
multiply(int)            // repeat stored strings n times;
divide(n)                // leaves first k chars of stored string, where k = Math.floor(str.length / n);
remove(str)              // remove taken string str from stored; Prohibited to use String.prototype.replace(); 
sub(from, n)             // leaves substring starting from and with length n;
get()                    // returns stored value;

// EXAMPLE:
let strBuilder = new StringBuilder('Hello'); // 'Hello';
strBuilder
  .plus(' all', '!')                         // 'Hello all!'
  .minus(4)                                  // 'Hello '
  .multiply(3)                               // 'Hello Hello Hello '
  .divide(4)                                 // 'Hell';
  .remove('l')                               // 'He';
  .sub(1,1)                                  // 'e';
  .get();                                    // -> 'e';

*/

class BaseBuilder {
    //value = null;
    
    constructor(value) {
        this.value = value;
    }

    get() {
        return this.value;
    }
}

class IntBuilder{    
    plus(...args) {
        for (let i = 0; i < args.length; i++) {
            this. value = this.value + args[i];
        }
        return this;
    }

    minus(...args) {
        for (let i = 0; i < args.length; i++) {
            this.value = this.value - args[i];
        }
        return this;
    }

    multiply(arg) {
        this.value = this.value * arg;
        return this;
    }

    divide(arg) {
        this.value = this.value / arg;
        return this;
    }

    mode(arg) {
        this.value = this.value % arg;
        return this;
    }

    get() {
        return this.value;
    }

    static random(from, to) {
        let k = to - from;
        let b = from;
        let x = Math.random();
        let y = k * x + b;
        y = Math.floor(y);
        return y;
    }
}

/*
let b = new IntBuilder(2);
console.log('result ' + b.minus(1, 2, 38).get());
console.log(IntBuilder.random(10,100))
*/



class StringBuilder extends BaseBuilder {
    minus(arg) {
        let arr = this.value.split('');
        let newLength = arr.length - arg;
        let newArr = arr.slice(0, newLength);
        let newStr = newArr.join('');

        this.value = newStr;
        return this;
    }

    multiply(n) {
        let sum = '';
        for (let i = 0; i < n; i++) {
            sum += this.value;
        }
        this.value = sum;
        return this;
    }

    divide(n) {
        let k = Math.floor(this.value.length / n);
        let newString = this.value.slice(0, k);
        this.value = newString;
        return this;
    }

    remove(substr) {
        function findArr (str, substr) {
            let pos = 0;
            let arr =[];
            while(true) {
                let foundPos = str.indexOf(substr, pos);
                if( foundPos == -1) break;
                //console.log(`Value foundPos ${foundPos}`);
                arr.push(foundPos);
                //console.log(`arr includes ${arr}`);
                pos = foundPos + substr.length;
            } 
            return arr;
        }
        
        
        function getNewString(arr, str) {  
            let start = 0; // position in str
            let newArr = [];
            let newStr;
            let N = str.length;
            arr.push(N);
            for (let j = 0; j < arr.length; j++ ) {
                let piece = str.slice(start, arr[j]); // j -index in arr2
                newArr.push(piece);
                start = arr[j]+ substr.length;  
                //console.log(`Start ${start}`);
                //console.log(`newArr ${newArr}`);
            }
            newStr = newArr.join('')
            return newStr;
        }
        
        
        let arr1 = findArr(this.value, substr);
        let arr = arr1
         
        this.value = getNewString(arr, this.value);
        return this;
           
    }

    sub(from, n) {
        this.value  = this.value.substr(from, n);
        return this;
    }
}


/*
let a = new StringBuilder('Hello');
console.log(a.multiply(3).get());
console.log(a.divide(3).get());
console.log(a.remove('l'));
let c = new StringBuilder('Attention');
console.log(c.remove('t'));  
console.log(c.sub(2, 3));
*/