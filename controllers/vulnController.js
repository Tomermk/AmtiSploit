const { response } = require("express");
const { getAllVulnerabilities } = require("../handlers/vulnerabilities");

const getVulnerabilities = async (req, res = response) => {
    const exploits = await getAllVulnerabilities();
    res.status(200).json(exploits);
    };

module.exports = {
    getVulnerabilities,
};