const pool = require('../../../config/database');

module.exports = {
    
    async registerInvoice(orderNo, idUser){
        try {
            const response = await pool.query(`select register_invoice(${orderNo}, ${idUser})`);
            return response.rows[0].register_invoice;
        } catch (error) {
            console.log("Error in register invoice", error);
            return -1;
        }
    },
    
    async getListProducts(invoiceNo){
        try {
            const response = await pool.query(`select pc.description_category, p.description, p.price, sc.quantity from shopping_cart sc, product p, product_category pc, "order" o, invoice i2 where sc.cod_product=p.cod_product and p.id_category=sc.id_category and p.id_category=pc.id_category and sc.nro_order=o.nro_order and i2.nro_order=o.nro_order and i2.nro_invoice=${invoiceNo}`);
            return response.rows;
        } catch (error) {
            console.log("Error in getListProducts line 3", error);
            return null;
        }
    },

    async getInvoiceData(invoiceNo){
        try {
            const response = await pool.query(`select i.nro_invoice, s.name_client as username, i.nit_ci, i.business_name, i."date", i.total_cost from invoice i, shipping s, "order" o where i.nro_order=o.nro_order and o.id_shipping=s.id_shipping and i.nro_invoice=${invoiceNo}`);
            return response.rows[0];
        } catch (error) {
            console.log("Error in getDataInvoice line 14", error);
            return null;
        }
    }
}