const pool = require('../../../config/database');
const { getProduct } = require('../../../controllers/CatalogInventoryManagement/productManage/product.controller');


module.exports = {

    /**
     * get SQL query
     * @param {string} query : SQL query
     */
    async getQuery(query) {
        try {
            let response = await pool.query(query);
            return response.rows;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    /**
     * get list of all Products
     */
    async getProductList() {
        try {
            let response = await pool.query(`select p.id_category ,pc."name" as category_name ,p.cod_product , p."name" , p.description ,
                                             p.measure , p.material ,p.wood_color , p.price , p.availability 
                                             from product p, product_category pc
                                             where p.id_category = pc.id_category;`);
            response = response.rows;
            return response;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    async getImagesList(){
        try {
            let response = await pool.query('select * from product_image pi2 ;');
            response = response.rows;
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }

    },

    async getImages(idProduct){
        try {
            let response = await pool.query(`select * from product_image where id_product=${idProduct};`);
            response = response.rows;
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }

    },

    async getImagesByCategory(idCategory){
        try {
            let response = await pool.query(`select * from product_image where id_category=${idCategory};`);
            response = response.rows;
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }

    },

    async getProductsCategory(id_category){
        try {
            let response = await pool.query(`select p.id_category ,pc."name" as category_name ,p.cod_product , p."name" , p.description , 
                                             p.measure , p.material ,p.wood_color , p.price , p.availability 
                                            from product p, product_category pc
                                            where p.id_category = pc.id_category and p.availability = true and p.id_category = ${id_category};`);
            response = response.rows;
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }


    },

    async registerProduct(idCategory, productName, description, measure, material, woodColor, price, images){
        try {
            let cod_product = await pool.query(`insert into product (id_category ,"name" ,description ,measure ,material ,wood_color ,price ,availability ) values (${idCategory},'${productName}','${description}','${measure}','${material}','${woodColor}',${price},${true}) returning cod_product;`);
            cod_product = cod_product.rows[0].cod_product;
            this.registerImages(idCategory, cod_product, images);
            return cod_product;
        } catch (e) {
            console.error(e);
            return -1;
        }
    },

    async registerImages(idCategory, codProduct, images){
        try {
            images.forEach(async element => {
                await pool.query(`insert into product_image values('${element}',${idCategory},${codProduct});`);
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async getProduct(idProduct){
        try {
            let response = await pool.query(`select p.id_category ,pc."name" as category_name ,p.cod_product , p."name" , p.description , 
                                             p.measure , p.material ,p.wood_color , p.price , p.availability 
                                             from product p, product_category pc
                                             where p.id_category = pc.id_category and p.cod_product = ${idProduct};`);
            return response.rows[0];
        } catch (error) {
            console.error(error);
            return null;
        }

    },

    async updateProduct(id, idCategory, productName, description, measure, material, woodColor, price, images){
        try {
            await pool.query(`update product set id_categroy= ${idCategory}, "name" = '${productName}', description = '${description}', measure=${measure}, material=${material}, wood_color=${woodColor},price=${price} where cod_product = ${id};`);
            await pool.query(`delete from product_image where id_category = ${idCategory} and cod_product =${id};`);
            this.registerImages(idCategory,id,images);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    },

    async enableDisableProduct(id){
        try {
            let status = await pool.query(`select availability from product where cod_product = ${id};`);
            status = status.rows[0].availability;
            await pool.query(`update product set availability = not ${status} where cod_product = ${id};`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    

    

}