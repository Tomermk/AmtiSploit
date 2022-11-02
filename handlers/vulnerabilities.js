const Vulnerabilities = require("../models/vulnerabilities.model");
const Exploits = require("../models/exploits.model");

const getAllVulnerabilities = async () => {
    try {
        const exploits = await Vulnerabilities.findAll({ attributes: ['name', 'description'] , raw: true});
        return exploits;
    } catch(error) {
      console.error(error);
      return null;
    }
};

const getAllExploits = async () => {
    try {
        const exploits = await Exploits.findAll({raw: true});
        return exploits;
    } catch(error) {
      console.error(error);
      return null;
    }
};

const getVulnerability = async (attackname) => {
    try {
        const vulnerability = await Vulnerabilities.findOne({ where: { name: attackname } })
        return vulnerability;
    } catch(error) {
      console.error(error);
      return null;
    }
};

const setExploitStatus = async (id,status) => {
    try {
        const updatedRow = await Exploits.update(
            {
              status: status,
            },
            {
              where: { id: id },
            }
          );
        return updatedRow;
    } catch(error) {
      console.error(error);
      return null;
    }
}

const newExploit = async (host,attack,status) => {
    try {
        const exploit = await Exploits.create({
            host: host,
            attack: attack,
            status: status
          });
        return exploit;
    } catch(error) {
      console.error(error);
      return null;
    }


}

module.exports = {
    getAllVulnerabilities,
    getVulnerability,
    getAllExploits,
    setExploitStatus,
    newExploit,
};
