
const bcryptjs = require('bcryptjs');
const pool = require('../../../config/database');
const externalLibrary = require('../../../config/externalLibrary');


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
     * get list of all users
     */
    async getUserList() {
        try {
            let response = await pool.query(`select id_user , username , email , u."enable" ,"type" ,u.id_role ,r.role_name 
                                             from "user" u, "role" r
                                             where u.id_role = r.id_role
                                             order by id_user;`);
            return response.rows;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    async registerUser(userName,email,password,role,type){
        try {
            var hash = await externalLibrary.encryptPassword(password);
            let response = await pool.query(`insert into "user" (username ,email ,password ,"enable" ,"type" ,id_role )values ('${userName}','${email}','${hash}',${true},${type},${role}) returning id_user;`);
            response = response.rows[0].id_user;
            console.log("model id: "+response);
            return response;
        } catch (e) {
            console.error(e);
            return -1;
        }
    },

    async updateUser(id, userName,email,password,role){
        try {
            if(password==''){
                await pool.query(`update "user" set username = '${userName}',email = '${email}', id_role = ${role} where id_user = ${id};`);
            }else{
                var hash = await externalLibrary.encryptPassword(password);
                await pool.query(`update "user" set username = '${userName}',email = '${email}', "password" ='${hash}', id_role = ${role} where id_user = ${id};`);
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    },

    async enableDisableUser(id){
        try {
            console.log(id);
            let status = await pool.query(`select enable from "user" u where id_user = ${id};`);
            status = status.rows[0].enable;
            console.log(status);
            await pool.query(`update "user" set "enable" = not ${status} where id_user = ${id};`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async validateLogin(email, password){
        try {
            let data = await pool.query(`select id_user , username , email ,"password", u."enable" ,"type" ,u.id_role ,r.role_name 
                                         from "user" u, "role" r
                                        where u.email='${email}' and  u.id_role = r.id_role;`);
    
            data = data.rows;
            if(data.length>0){
                data = data[0];
                let hash = data.password;
                if(await bcryptjs.compare(password,hash)){
                    return {id_user:data.id_user, username: data.username, email: data.email, enable: data.enable, type: data.type, id_role: data.id_role, role_name: data.role_name};
                }
            }
            return null; 
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}
