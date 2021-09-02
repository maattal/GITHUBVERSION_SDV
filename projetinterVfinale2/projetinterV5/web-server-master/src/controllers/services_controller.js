const { getFromAddress } = require('../services/address_converter')

module.exports = {
    GetFromAddress: async (req, res) => {
        const result = await getFromAddress(req.body.address)
        return res.status(200).json(result)
    },

 }