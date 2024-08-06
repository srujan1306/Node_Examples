var os = require("os");
var ram = 0;
// console.log(os.freemem() / 1024 / 1024 / 1024);
function freeRam() {
  ram = os.freemem() / 1024 / 1024 / 1024;
  return ram.toFixed(2) + " GB";
}
console.log(freeRam());
