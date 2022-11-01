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


module.exports = {
    getAllVulnerabilities,
    getAllExploits,
};
