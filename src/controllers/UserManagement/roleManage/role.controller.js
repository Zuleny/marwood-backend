
const roleModel = require('../../../models/UserManagement/roleManage/role.model');


/**
 * Method GET for list of users
 * @param {*} req : request(petición)
 * @param {*} res : response (respuesta)
 */
const getRoles = async (req, res) => {
    const response = await roleModel.getRoleList();
    res.json(response);
}

const postRol = async (req, res) =>{
    const{roleName, description, privileges} = req.body;
    const response = await roleModel.registerRole(roleName, description, privileges);
    res.json(response);
}

const getRol = async (req, res) => {
    const roleData = await roleModel.getRole(req.params.id);
    const privilegesList = await roleModel.getPrivilegesList(req.params.id);
    res.json({roleData, privilegesList});
}

const putRol = async (req, res) =>{
    let idRole = req.params.id;
    const{roleName, description, privileges} = req.body;
    const response = await roleModel.updateRole(idRole, roleName, description, privileges);
    res.json(response);
}

const statusRol = async (req, res) =>{
    let idRole = req.params.id;
    const response = await roleModel.enableDisableRole(idRole);
    res.json(response);
}

const getPrivileges = async (req, res) =>{
    const response = await roleModel.getQuery('select * from privilege;');
    res.json(response);
}

 module.exports = {
    getRoles,
    postRol,
    getRol, 
    putRol, 
    statusRol,
    getPrivileges
}