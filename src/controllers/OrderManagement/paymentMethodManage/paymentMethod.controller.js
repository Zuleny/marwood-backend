const paymentMethodModel = require('../../../models/OrderManagement/paymentMethodManage/paymentMethod.model');


/**
 * Method GET for list of orders
 * @param {*} req : request(petición)
 * @param {*} res : response (respuesta)
 */
const getPaymentMethod = async (req, res) => {
    const response = await paymentMethodModel.getPaymentMethodList();
    res.json(response);
}


module.exports = {
    getPaymentMethod,
}