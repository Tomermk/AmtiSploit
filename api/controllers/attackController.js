const { response } = require("express");
const fs = require('fs');
const {executeScript,cleanup,isHostOnline} = require("../handlers/attack");
const { getVulnerability, setExploitStatus, setExploitErrorMsg, newExploit} = require("../handlers/vulnerabilities");

const launchAttack = async (req, res = response) => {
    ip = req.body.hostname.split("://")[1].split(":")[0]
    port = req.body.hostname.split("://")[1].split(":")[1]
    
    connectionRes = await isHostOnline(ip)
    if(connectionRes.alive == false){
        res.status(400).send({'errors':[{'msg':'Host is unavailable'}]});
    }else{
        try{
            const vulnerability = await getVulnerability(req.body.attackname);
            var script = vulnerability.dataValues.script
            var cleanupScript = vulnerability.dataValues.cleanupScript
            attackFilesPath = `${__dirname.replace("controllers","attackFiles")}/${req.body.attackname}`
            attackFilesPath = "\""+attackFilesPath+"\"";
            logFilePath = `${attackFilesPath}/${ip.replaceAll('.','-')}.txt`
            logFilePath = logFilePath.replaceAll(/"/g,'')
            script = script.replace("%HOSTNAME%",req.body.hostname).replace("%ATTACKFILESPATH%",attackFilesPath)
            scriptLines = script.split('\n')
            cleanupScriptLines = cleanupScript.split('\n')
            var exploit = await newExploit(req.body.hostname,req.body.attackname,'2')
        }
        catch(error){
            res.status(400).json(error.message);
        }
        
        try{
            const test = await executeScript(script)
            if (test){
    
            var count = 0
            const inter = setInterval(() => {
                count = count + 1
                if (fs.existsSync(logFilePath)){
                    clearInterval(inter)
                    setExploitStatus(exploit.dataValues.id,3)
                    cleanup(cleanupScript,logFilePath)
                }
                if (count == 3){
                    clearInterval(inter)
                    setExploitStatus(exploit.dataValues.id,1)
                    cleanup(cleanupScript,logFilePath)
                }
            }, 10000);
            res.status(200).json("attack launched");
        } else {
            throw new Error("attack failed");
        }
        } catch(error) {
            await setExploitErrorMsg(exploit.dataValues.id,error.message)
    
            await setExploitStatus(exploit.dataValues.id,4)
            await cleanup(cleanupScript,logFilePath)
            res.status(400).json(error.message);
        }
    }

};

module.exports = {
    launchAttack,
};