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
            const response = await pool.query(`select p."name" , p.price, sc.quantity 
            from shopping_cart sc, product p, "order" o, invoice i2 
            where sc.cod_product=p.cod_product and p.id_category=sc.id_category and sc.nro_order=o.nro_order and i2.nro_order=o.nro_order and i2.nro_invoice=${invoiceNo};`);
            return response.rows;
        } catch (error) {
            console.log("Error in getListProducts line 3", error);
            return null;
        }
    },

    async getInvoiceData(invoiceNo){
        try {
            const response = await pool.query(`select i.nro_invoice, i.nro_authorization ,s.name_client as username, i.nit_ci, i.business_name, i."date", i.total_cost, c.discount , da.price_delivery_area 
            from invoice i, shipping s, "order" o , coupon c, delivery_area da 
            where i.nro_order=o.nro_order and o.id_shipping=s.id_shipping and c.cod_coupon = o.cod_coupon and s.id_delivery_area = da.id and i.nro_invoice=${invoiceNo};`);
            return response.rows[0];
        } catch (error) {
            console.log("Error in getDataInvoice line 14", error);
            return null;
        }
    },

    async getTotalShoppingCart(invoiceNro){
        try {
            var response = await pool.query(`select sum(sc.quantity * p.price )  
            from shopping_cart sc, product p, "order" o, invoice i2 
            where sc.cod_product=p.cod_product and p.id_category=sc.id_category and sc.nro_order=o.nro_order and i2.nro_order=o.nro_order and i2.nro_invoice=${invoiceNro};`);
            response = response.rows[0].sum;
            return response;
        } catch (error) {
            console.error(error);
            return 0;
        }

    }
}