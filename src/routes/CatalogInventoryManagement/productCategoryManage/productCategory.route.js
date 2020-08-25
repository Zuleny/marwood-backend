const router = require('express').Router();

//      Import Files dependents
const { getCategories, postCategory, getCategory, putCategory, statusCategory} = require('../../../controllers/CatalogInventoryManagement/productCategoryManage/productCategory.controller');

router.get('/api/category-list', getCategories);

router.post('/api/category-register', postCategory);

router.get('/api/category-edit/:id', getCategory);

router.put('/api/category-edit/:id', putCategory);

router.put('/api/category-status/:id', statusCategory);



module.exports = router;