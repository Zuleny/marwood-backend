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
     * get list of all order
     */
    async getOrderList() {
        try {
            let response = await pool.query(`select o.nro_order ,o."date" ,o.state ,o.total_shopping_cart ,o.id_user , u.username , 
                                            o.cod_coupon ,c.discount ,o.id_shipping ,da.price_delivery_area ,o.id_payment_method , pm."name" 
                                            from "order" o, "user" u , coupon c ,payment_method pm, delivery_area da, shipping s 
                                            where o.id_user = u.id_user and o.cod_coupon = c.cod_coupon and o.id_payment_method = pm.id_payment_method and o.id_shipping = s.id_shipping and s.id_delivery_area = da.id 
                                            order by o."date" desc; `);
            response = response.rows;
            response.forEach(element => {
                element.date = element.date.toLocaleDateString();
                
            });
            return response;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    async getShoppingCart(nro_order){
        try {
            let response = await pool.query(`select  sc.id_category , sc.cod_product , p."name" , sc.quantity 
            from shopping_cart sc, product p
            where sc.id_category = p.id_category and sc.cod_product = p.cod_product and nro_order =${nro_order};`);
            return response.rows;
        } catch (error) {
            console.error(error);
            return null;
        }

    },

    async registerOrder(totalShoppingCart, idUser, codCupon, idPaymentMethod, idShipping){
        try {
            var response = await pool.query(`insert into "order" ("date" ,state ,total_shopping_cart ,id_user ,cod_coupon ,id_shipping ,id_payment_method ) values (now(),${2},${totalShoppingCart},${idUser},${codCupon},${idShipping},${idPaymentMethod}) returning nro_order;`);
            response = response.rows[0].nro_order;
            console.log("Nro Order: "+response);
            return response;
        } catch (error) {
            console.error(error);
            return -1;
        }
    },

    async registerShipping(nameClient, phoneNumber, email, deparment, addrees, businessName, nitCi, idDeliveryArea){
        try {
            var response = await pool.query(`insert into shipping (name_client ,phone_number, email ,departament ,address ,business_name ,nit_ci ,id_delivery_area ) values 
            ('${nameClient}','${phoneNumber}','${email}','${deparment}','${addrees}','${businessName}',${nitCi},${idDeliveryArea}) returning id_shipping;`);
            return response.rows[0].id_shipping;
        } catch (error) {
            console.error(error);
            return -1;
        }
    },

    async registerShoppingCart(shoppingCart, nroOrder){
        try {
            shoppingCart.forEach(async element => {
                await pool.query(`insert into shopping_cart (id_category ,cod_product ,nro_order ,quantity ) values (${element.id_category},${element.cod_product},${nroOrder},${element.quantity});`);
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /*async getShipping(nro_order){
        try {
            let response = await pool.query(`select  sc.id_category , sc.cod_product , p."name" , sc.quantity 
            from shopping_cart sc, product p
            where sc.id_category = p.id_category and sc.cod_product = p.cod_product and nro_order =${nro_order};`);
            return response.rows;
        } catch (error) {
            console.error(error);
            return null;
        }

    },*/

    

    
}