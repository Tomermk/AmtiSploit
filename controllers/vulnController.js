const { response } = require("express");
const { getAllVulnerabilities, getAllExploits, getExploitsByStatus } = require("../handlers/vulnerabilities");

const getVulnerabilities = async (req, res = response) => {
    const exploits = await getAllVulnerabilities();
    res.status(200).json(exploits);
    };

const getExploits = async (req, res = response) => {
    const exploits = await getAllExploits();
    res.status(200).json(exploits);
    };

const getVulnsStatus = async (req, res = response) => {
    const exploits = await getExploitsByStatus();
    res.status(200).json(exploits);
    };

module.exports = {
    getVulnerabilities,
    getExploits,
    getVulnsStatus,
};