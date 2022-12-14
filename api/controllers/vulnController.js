const { response } = require("express");
const { getAllVulnerabilities, getAllExploits, getExploitsWithStatus, getHostsWithStatus, getAttacksAndDates } = require("../handlers/vulnerabilities");

const getVulnerabilities = async (req, res = response) => {
    const exploits = await getAllVulnerabilities();
    res.status(200).json(exploits);
    };

const getExploits = async (req, res = response) => {
    const exploits = await getAllExploits();
    res.status(200).json(exploits);
    };

const getVulnsStatus = async (req, res = response) => {
    const exploits = await getExploitsWithStatus();
    res.status(200).json(exploits);
    };

const getHostsVulnsStatus = async (req, res = response) => {
    const exploits = await getHostsWithStatus();
    res.status(200).json(exploits);
    };

const getAttacksWithDates = async (req, res = response) => {
    const exploits = await getAttacksAndDates();
    res.status(200).json(exploits);
    };

module.exports = {
    getVulnerabilities,
    getExploits,
    getVulnsStatus,
    getHostsVulnsStatus,
    getAttacksWithDates,
};

