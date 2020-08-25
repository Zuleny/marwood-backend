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
     * get list of all roles
     */
    async getRoleList() {
        try {
            let response = await pool.query(`select id_role, role_name, description, enable, get_quantity_privileges(cast(id_role as smallint)) 
                                             from "role"
                                             order by get_quantity_privileges desc ;`);
            response = response.rows;
            let totalPrivileges = await pool.query('select count(*) from privilege;');
            totalPrivileges = totalPrivileges.rows[0].count;
            response.forEach(element => {
                element.get_quantity_privileges = (element.get_quantity_privileges/totalPrivileges)*100;
            });
            return response;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    async registerRole(roleName,description, privilege){
        try {
            let id_role = await pool.query(`insert into "role" (role_name , description ,"enable" ) values('${roleName}','${description}',${true}) returning id_role;`);
            id_role = id_role.rows[0].id_role;
            privilege.forEach(element => {
               pool.query(`insert into role_privilege (id_role ,id_privilege ) values (${id_role},${element});`);
            });
            return id_role;
        } catch (e) {
            console.error(e);
            return -1;
        }
    },

    async updateRole(idRole, roleName, description, privileges){
        try {
            await pool.query(`update "role" set role_name = '${roleName}', description = '${description}' where id_role = ${idRole};`);
            await pool.query(`delete from role_privilege where id_role = ${idRole};`);
            privileges.forEach(element => {
                pool.query(`insert into role_privilege (id_role ,id_privilege ) values (${idRole},${element});`);
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    },

    async enableDisableRole(id){
        try {
            let status = await pool.query(`select enable from "role" where id_role = ${id};`);
            status = status.rows[0].enable;
            await pool.query(`update "role" set "enable" = not ${status} where id_role = ${id};`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async getRole(id){
        try {
            let response = await pool.query(`select * from "role" where id_role = ${id};`);
            return response.rows[0];
        } catch (error) {
            console.error(error);
            return null;
        }

    },

    async getPrivilegesList(id){
        try {
            let response = await pool.query(`select rp.id_privilege
                                             from role_privilege rp
                                             where rp.id_role = ${id};`);
            response = response.rows;
            let arrPrivileges = [];
            response.forEach(element => {
                arrPrivileges.push(element.id_privilege);
            });
            return arrPrivileges;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}