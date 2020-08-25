const router = require('express').Router();

//      Import Files dependents
const { getProducts, getProductsCategory,postProduct, getProduct, putProduct, statusProduct} = require('../../../controllers/CatalogInventoryManagement/productManage/product.controller');

router.get('/api/product-list', getProducts);

router.get('/api/product-list/:id', getProductsCategory);

router.post('/api/product-register', postProduct);

router.get('/api/product-edit/:id', getProduct);

router.put('/api/product-edit/:id', putProduct);

router.put('/api/product-status/:id', statusProduct);


module.exports = router;