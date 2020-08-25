const categoryModel = require('../../../models/CatalogInventoryManagement/productCategoryManage/productCategory.model');


/**
 * Method GET for list of categories
 * @param {*} req : request(petición)
 * @param {*} res : response (respuesta)
 */
const getCategories = async (req, res) => {
    const response = await categoryModel.getCategoryList();
    res.json(response);
}

const postCategory = async (req, res) =>{
    const{categoryName, description} = req.body;
    const response = await categoryModel.registerCategory(categoryName, description);
    res.json(response);
}

const getCategory = async (req, res) => {
    const categoryData = await categoryModel.getCategory(req.params.id);
    res.json(categoryData);
}

const putCategory = async (req, res) =>{
    let idRole = req.params.id;
    const{categoryName, description} = req.body;
    const response = await categoryModel.updateCategory(idRole, categoryName, description);
    res.json(response);
}

const statusCategory = async (req, res) =>{
    const response = await categoryModel.enableDisableCategory(req.params.id);
    res.json(response);
}



 module.exports = {
    getCategories,
    postCategory,
    getCategory, 
    putCategory, 
    statusCategory
}