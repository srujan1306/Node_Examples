const fs = require("fs");
var data = "Live more, worry less😊😎";
// const a = 10;
// for (let i = 1; i <= a; i++) {
//   fs.writeFile(`text-${i}.html`, data, (err) => {
//     console.log("Completed writing", i);
//   });
// }

// console.log(process.argv);
// const [, , num] = process.argv;
// const files = (num) => {
//   for (let i = 1; i <= num; i++) {
//     fs.writeFile(`./backup/text-${i}.html`, data, (err) => {
//       console.log("Completed writing", i);
//     });
//   }
// };
// console.log(files(process.argv[2]));

// fs.writeFile(`./backup/text.html`, data, (err) => {
//   console.log("Completed writing");
// });

// fs.readFile("./backup/text.html", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

// fs.appendFile("./backup/text.html", "\ndata to append", () => {
//   console.log('The "data to append" was appended to file!');
//   fs.appendFile(`./backup/text.html`, `\n${data}`, () => {
//     console.log("Completed writing");
//   });
// });

// to delete files
fs.unlink("./backup/text.html", () => {
  console.log("Delete Done");
});

// to see all
fs.readdir("./backup", () => {});
