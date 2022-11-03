const { exec } = require("child_process");
const fs = require('fs');

const executeScript = (script) => {
    return new Promise((resolve,reject) => {
        scriptLines = script.split('\n')
        scriptLines.forEach(line => {
            console.log(line)
            exec(line, (error, stdout, stderr) => {
                if (error) {
                    if(error.message.includes("WARNING")){
                        resolve(line)
                    }
                    reject(error)
                }
                if (stderr) {
                    reject(stderr)
                }
                resolve(stdout)
            });
        });
    })
};



const cleanup = (cleanupScript,logFilePath) => {
    try {
        executeScript(cleanupScript)
        if(fs.existsSync(logFilePath)){  
            fs.unlinkSync(logFilePath)
        }
    } catch(error) {
      console.error(error);
      throw error
    }
};



module.exports = {
    executeScript,
    cleanup,
};
