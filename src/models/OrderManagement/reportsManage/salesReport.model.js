const pool = require('../../../config/database');

module.exports = {
    async getListReport(){
        try {
            const response = await pool.query(`select distinct p."name", sum(sc.quantity) from shopping_cart sc, product p where sc.cod_product=p.cod_product group by p."name"`);
            return response.rows;
        } catch (error) {
            console.error("Error in get list report sales", error);
            return null;
        }
    },

    async getListReportSaleDate(){
        try {
            const response = await pool.query(`SELECT date, count(DISTINCT nro_invoice) FROM invoice GROUP by date order by date limit 5`);
            return response.rows;
        } catch (error) {
            console.log("Error in sales report", error);
            return null;
        }
    }
}