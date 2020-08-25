const router = require('express').Router();


//      Import Files dependents

const { getOrders, getShoopingCart, postOrder} = require('../../../controllers/OrderManagement/orderManage/order.controller');

router.get('/api/order-list', getOrders);

router.post('/api/order-register', postOrder);

router.get('/api/shooping-cart/:id', getShoopingCart);



//router.get('/api/shipping/:id', getShipping);

module.exports = router;