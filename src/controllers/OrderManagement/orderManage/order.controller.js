const orderModel = require('../../../models/OrderManagement/orderManage/order.model');


/**
 * Method GET for list of orders
 * @param {*} req : request(petición)
 * @param {*} res : response (respuesta)
 */
const getOrders = async (req, res) => {
    const response = await orderModel.getOrderList();
    res.json(response);
}
/**
 * Method GET for list of products of a nro_order
 * @param {*} req 
 * @param {*} res 
 */
const getShoopingCart = async (req, res) => {
    const response = await orderModel.getShoppingCart(req.params.id);
    res.json(response);
}

/**
 * Method GET for Shipping of a nro_order
 * @param {*} req 
 * @param {*} res 
 */
const getShipping = async (req, res) => {
    const response = await orderModel.getShipping(req.params.id);
    res.json(response);
}

const postOrder = async (req, res) => {
    const{totalShoppingCart,idUser, codCupon, idPaymentMethod, nameClient, phoneNumber, email, departament, address, businessName, nitCi, idDeliveryArea, shoppingCart}= req.body;
    const idShipping =  await orderModel.registerShipping(nameClient, phoneNumber, email, departament, address, businessName, nitCi, idDeliveryArea);
    console.log(idShipping);
    const nroOrder = await orderModel.registerOrder(totalShoppingCart, idUser, codCupon, idPaymentMethod, idShipping);
    const response = await orderModel.registerShoppingCart(shoppingCart, nroOrder);
    res.json(nroOrder);
}

module.exports = {
    getOrders,
    getShoopingCart,
    postOrder
    
}