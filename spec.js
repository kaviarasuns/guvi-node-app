const os = require("os"); // import inbuilt package
console.log("Free memory", os.freemem()/1024/1024/1024)
console.log("Total Memory", os.totalmem()/1024/1024/1024);
console.log("Version", os.version());
console.log("Cpus",os.cpus());
