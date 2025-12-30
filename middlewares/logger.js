const fs = require('node:fs');

module.exports =  function(req,res,next){
    const log = `\n [${Date.now()}] : ${req.url} method: ${req.method}`;
    fs.appendFileSync("./Serverlogs.txt", log ,'utf-8');
    next();
}