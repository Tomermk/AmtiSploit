const {Router} = require('express');
const { getVulnerabilities, getExploits } = require("../controllers/vulnController");
const {check,body} = require("express-validator");
const {validateInput} = require("../middleware/validate-login");

const router = Router();
const { exec } = require("child_process");

router.post("/",[
        check("attackname", "attackname is required").not().isEmpty(),
        check("hostname", "hostname is required").not().isEmpty(),
        validateInput,
    ],(req, res) => {
    console.log(req.body.attackname);
    console.log(req.body.hostname);
    
    // guery by attack name 
    // build script
    // run script  V
    // validate file  V
    var script = 'docker run --name ldapdummyl4s -d -p 8888:8888 -p 1389:1389 -e "ENV_IP=host.docker.internal" ldapdummy:l4s\ndocker run --name attackerl4s -v /Users/cyberteam/Desktop/AmtiSploit/attacksFiles/log4shell:/app -e "ENDPOINT=http://172.17.0.2:8080" -p 8088:8088 --network=host attacker:l4s'
    var cleanupScript = 'docker rm -f ldapdummyl4s attackerl4s'

    scriptLines = script.split('\n')
    cleanupScriptLines = cleanupScript.split('\n')


    scriptLines.forEach(line => {
        console.log(line)
        exec(line, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    });

    var count = 0
    const inter = setInterval(() => {
        //check file
        //if file exist clearInterval
        count = count + 1
        console.log(count)
        if (count == 3){
            clearInterval(inter)
            
            // CLEANUP (TODO: Write function to execute command instead of those repeted lines)
            cleanupScriptLines.forEach(line => {
                exec(cleanupScript, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                });
            });
            // ================================================================================

            console.log("cleared")
        }
    }, 10000);
    

    res.status(200).json({message: "O.K."});

});



router.get("/",
[],
getVulnerabilities);

router.get("/exploits",
[],
getExploits);

module.exports = router;