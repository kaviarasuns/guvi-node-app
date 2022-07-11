const fs = require("fs");
const quote = "Nothing";
const quote2 = "Something";

// fs.writeFile("./awesome.html", quote, (err)=>{
//     console.log(err);
//     console.log("Completed writing");
// })


// gets number from user and creates that number of files
// const[, , a] = process.argv;
// for(let i=0; i<a;i++){
// fs.writeFile(`./backup/text-${i}.html`, quote2, (err)=>{
//     console.log("Completed writing"); 
// })
// }



// loop to create 10 files using fs.writeFile
// for(let i=1;i<=10;i++){
//     fs.writeFile( `./backup/text-${i}.html`,quote,(err)=>{
//         // console.log(err);
//         console.log(`Completed writing text-${i}.html`);
//     })  
// }


// function to read file
// fs.readFile("./martin.txt","utf-8",(err,data)=>{
//      if(err){
//         console.log(err);
//      } else{
//         console.log(data);
//      }
    
// });



// append file
// const quote3 = "Life would be tragic if it weren't funny";
// fs.appendFile("./append.txt","\n" + quote3,(err)=>{
//     console.log("Completed writing");
// })



// delete file
// fs.unlink("./delete.css", (err) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Completed deleting!");
//     }
// })