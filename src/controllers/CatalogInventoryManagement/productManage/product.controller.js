const productModel = require('../../../models/CatalogInventoryManagement/productManage/product.model');
const categoryModel = require('../../../models/CatalogInventoryManagement/productCategoryManage/productCategory.model');

/**
 * Method GET for list of products
 * @param {*} req : request(petición)
 * @param {*} res : response (respuesta)
 */
const getProducts = async (req, res) => {
    const productList = await productModel.getProductList();
    const imagesList = await productModel.getImagesList();
    res.json({productList,imagesList});
}

const getProductsCategory = async (req, res) => {
    const productCategory = await productModel.getProductsCategory(req.params.id);
    const imagesProductCategory = await productModel.getImagesByCategory(req.params.id);
    res.json({productCategory, imagesProductCategory});
}


const postProduct = async (req, res) =>{
    const{idCategory, productName, description, measure, material, woodColor, price,images} = req.body;
    const response = await productModel.registerProduct(idCategory, productName, description, measure, material, woodColor, price, images);
    res.json(response);
}

const getProduct = async (req, res) => {
    const productData = await productModel.getProduct(req.params.id);
    const imagesProduct = await productModel.getImages(req.params.id)
    const categories= await categoryModel.getCategories();
    res.json({productData, imagesProduct,categories});
}

const putProduct = async (req, res) =>{
    let id = req.params.id;
    const{idCategory, productName, description, measure, material, woodColor, price,images} = req.body;
    const response = await productModel.updateProduct(id, idCategory, productName, description, measure, material, woodColor, price, images);
    res.json(response);
}

const statusProduct = async (req, res) =>{
    const response = await productModel.enableDisableProduct(req.params.id);
    res.json(response);
}



 module.exports = {
    getProducts,
    getProductsCategory,
    postProduct,
    getProduct, 
    putProduct, 
    statusProduct
}