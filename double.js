console.log(process.argv);
const [, , num] = process.argv;
const double = (num) => num * 2;
console.log(double(process.argv[2]));
console.log(double(num));
