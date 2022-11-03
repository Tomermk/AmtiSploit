const { exec } = require("child_process");
const fs = require('fs');

const executeScript = async (script) => {
    try{
        return await new Promise((resolve,reject) => {
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
    } catch(error) {
        console.log(error)
        throw error;
    }
};


const cleanup = async (cleanupScript,logFilePath) => {
    try {
        await executeScript(cleanupScript)
        if(fs.existsSync(logFilePath)){  
            fs.unlinkSync(logFilePath)
        }
    } catch(error) {
      console.error(error);
      if(error.includes("No such container")){
        return null;
      }
      throw error
    }
};



module.exports = {
    executeScript,
    cleanup,
};