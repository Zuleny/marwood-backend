const pool = require('../../../config/database');


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
     * get list of all Categories of products
     */
    async getCategoryList() {
        try {
            let response = await pool.query(`select id_category, name, description_category, enable ,
                                             get_quantity_product_of_a_category(id_category) 
                                             from product_category;`);
            response = response.rows;
            return response;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    async registerCategory(categoryName,description){
        try {
            let id_category = await pool.query(`insert into product_category ("name" ,description_category ,"enable" ) values ('${categoryName}','${description}',${true}) returning id_category;`);
            id_category = id_category.rows[0].id_category;
            return id_category;
        } catch (e) {
            console.error(e);
            return -1;
        }
    },

    async updateCategory(idCategory, categoryName, description){
        try {
            await pool.query(`update product_category set "name" = '${categoryName}', description_category = '${description}' where id_category = ${idCategory};`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    },

    async enableDisableCategory(id){
        try {
            let status = await pool.query(`select enable from product_category where id_category = ${id};`);
            status = status.rows[0].enable;
            await pool.query(`update product_category set "enable" = not ${status} where id_category = ${id};`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async getCategory(id){
        try {
            let response = await pool.query(`select * from product_category where id_category = ${id};`);
            return response.rows[0];
        } catch (error) {
            console.error(error);
            return null;
        }

    },

    async getCategories(){
        try {
            let response = await pool.query(`select id_category , "name" from product_category pc where "enable" =true;`);
            return response.rows;
        } catch (error) {
            console.error(error);
            return null;
        }

    }

}