//const externalLibrary = require('../config/externalLibrary');
const userModel = require('../../../models/UserManagement/userManage/user.model');


/**
 * Method GET for list of users
 * @param {*} req : request(petición)
 * @param {*} res : response (respuesta)
 */
const getUsers = async (req, res) => {
    const response = await userModel.getUserList();
    res.json(response);
}

/**
 * Method GET for get only one user
 * @param {*} req : request(petición)
 * @param {*} res : response (respuesta)
 */
const getUser = async (req, res) => {
    var id = req.params.id;
    var response = await userModel.getQuery(`select u.username ,u.email ,u."enable" ,u."type", u.id_role , r.role_name from "user" u, "role" r where u.id_role = r.id_role and u.id_user = ${id};`);
    response = response[0];
    res.json(response);
}

/**
 * Method GET for List of Roles
 */
const getRoles = async (req, res) => {
    const response = await userModel.getQuery(`select id_role ,role_name from "role" where "enable" = true and role_name <> 'Client';`);
    res.json(response);
}

/**
 * Method POST for register a new user
 */
const postUser = async (req, res) =>{
    const{userName,email,password,role,type} = req.body;
    const response = await userModel.registerUser(userName,email,password,role,type);
    res.json(response);
}

/**
 * Method PUT for update data of a user
 */

 const putUser = async (req, res) =>{
    var id = req.params.id;
    const{userName,email,password,role,type} = req.body;
    var response = await userModel.updateUser(id, userName,email,password,role);
    res.json(response);
 }

/**
 * Method PUT for enable/disable a user
 */
 
const statusUser = async (req, res) =>{
    var id = req.params.id;
    console.log(id)
    var response = await userModel.enableDisableUser(id);
    res.json(response);
 }

 module.exports = {
    getUsers,
    postUser,
    getRoles,
    getUser,
    putUser,
    statusUser
}