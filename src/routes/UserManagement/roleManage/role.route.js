const router = require('express').Router();

//      Import Files dependents
const { getRoles, postRol, getRol, putRol, statusRol, getPrivileges} = require('../../../controllers/UserManagement/roleManage/role.controller');

router.get('/api/role-list', getRoles);

router.post('/api/role-register', postRol);

router.get('/api/role-edit/:id', getRol);

router.put('/api/role-edit/:id', putRol);

router.put('/api/role-status/:id', statusRol);

router.get('/api/role-privilege-list', getPrivileges);

module.exports = router;