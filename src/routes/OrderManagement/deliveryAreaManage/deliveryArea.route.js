const router = require('express').Router();


//      Import Files dependents
const { getDeliveryArea} = require('../../../controllers/OrderManagement/deliveryAreaManage/deliveryArea.controller');

router.get('/api/deliveryArea-list', getDeliveryArea);

module.exports = router;