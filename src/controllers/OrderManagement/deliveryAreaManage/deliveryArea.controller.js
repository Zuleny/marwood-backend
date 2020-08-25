const deliveryAreaModel = require('../../../models/OrderManagement/deliveryAreaManage/deliveryArea.model');


/**
 * Method GET for list of users
 * @param {*} req : request(petición)
 * @param {*} res : response (respuesta)
 */
const getDeliveryArea = async (req, res) => {
    const response = await deliveryAreaModel.getDeliveryAreaList();
    res.json(response);
}

module.exports = {
    getDeliveryArea
}