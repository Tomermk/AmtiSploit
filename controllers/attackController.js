const { response } = require("express");
const fs = require('fs');
const {executeScript,cleanup,testExec} = require("../handlers/attack");
const { getVulnerability, setExploitStatus, newExploit} = require("../handlers/vulnerabilities");

const launchAttack = async (req, res = response) => {
    console.log(req.body.attackname);
    console.log(req.body.hostname);
    try{
        const vulnerability = await getVulnerability(req.body.attackname);
        var script = vulnerability.dataValues.script
        var cleanupScript = vulnerability.dataValues.cleanupScript
        ip = req.body.hostname.split("://")[1].split(":")[0]
        attackFilesPath = `${__dirname.replace("controllers","attackFiles")}/${req.body.attackname}`
        logFilePath = `${attackFilesPath}/${ip.replaceAll('.','-')}.txt`
        script = script.replace("%HOSTNAME%",req.body.hostname).replace("%ATTACKFILESPATH%",attackFilesPath)
        scriptLines = script.split('\n')
        cleanupScriptLines = cleanupScript.split('\n')
        var exploit = await newExploit(req.body.hostname,req.body.attackname,'2')
    }
    catch(error){
        res.status(500).json(error.message);
    }
    
    try{
        await executeScript(script)
        
        var count = 0
        const inter = setInterval(() => {
            count = count + 1
            console.log(count)
            if (fs.existsSync(logFilePath)){
                clearInterval(inter)
                setExploitStatus(exploit.dataValues.id,1)
                cleanup(cleanupScript,logFilePath)
            }
            if (count == 3){
                clearInterval(inter)
                setExploitStatus(exploit.dataValues.id,3)
                cleanup(cleanupScript,logFilePath)
            }
        }, 10000);
        res.status(200).json("attack launched");
    }
    catch(error){
        console.log(error)
        setExploitStatus(exploit.dataValues.id,4)
        cleanup(cleanupScript,logFilePath)
        res.status(500).json(error.message);
    }
};

module.exports = {
    launchAttack,
};