const rateLimit = require('express-rate-limit')


const checkGetTable = async (method, path) => {
    if(method === 'GET' && path === '/launch/exploits'){
        return true;
    }
    return false;
}

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: async(req, res) => {
    const {method, path} = req;
    if(await checkGetTable(method, path)) return 0;
    else return 1000;
  },
  message: 'You have exceeded the 100 requests in 24 hrs limit!', 
  standardHeaders: true,
  legacyHeaders: false,
});


module.exports = {
    rateLimiterUsingThirdParty
}