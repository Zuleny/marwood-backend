const router = require('express').Router();


const { getPaymentMethod } = require('../../../controllers/OrderManagement/paymentMethodManage/paymentMethod.controller');

router.get('/api/paymentMethod-list', getPaymentMethod);


module.exports = router;