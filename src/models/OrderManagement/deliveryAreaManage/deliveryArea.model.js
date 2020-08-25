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
     * get list of all delivery area
     */
    async getDeliveryAreaList() {
        try {
            let response = await pool.query('select * from delivery_area;');
            response = response.rows;
            return response;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    
}