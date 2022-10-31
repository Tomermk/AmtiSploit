const Vulnerabilities = require("../models/vulnerabilities.model");

const getAllVulnerabilities = async () => {
    try {
        const exploits = await Vulnerabilities.findAll({ attributes: ['name', 'description'] , raw: true});
        return exploits;
    } catch(error) {
      console.error(error);
      return null;
    }
};


module.exports = {
    getAllVulnerabilities,
};
