const externalLibrary = require('../config/externalLibrary');
const userModel = require('../models/UserManagement/userManage/user.model');
let keyLogger = new Array();

/**
 * Method GET for principal view of the system web
 * @param {*} req : request(petición)
 * @param {*} res : response (respuesta)
 */
const getIndex = async (req, res) => {
    const response = await userModel.getQuery('select * from "user"');
    res.json(response);
}

/**
 * Method GET for show login view
 * @param {*} req : request(petición)
 * @param {*} res : response (respuesta)
 */
const getLogin = (req, res) => {
    res.status(200).render('login');
};

/**
 * Method POST for show Login view
 */

 const postLogin = async (req, res) =>{
    const{email, password} = req.body;
    console.log(req.body);
    var response = await userModel.validateLogin(email, password);
    res.json(response);
 }

module.exports = {
    getIndex,
    getLogin,
    postLogin
}