// const dbl = (n) => n * 2;

// console.log("Hello", dbl(10));

//console.log(document); Error
//console.log(window); Error

// console.log(global);

console.log(process.argv) // argument value

// console.log(dbl(process.argv[2]));

// const sum = (a,b) => a + b;
// console.log(sum(process.argv[a,b]));

const sum = (a,b) => a + b;
const[, , a, b] = process.argv;
console.log(sum(+a,+b));



