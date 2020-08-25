const router = require('express').Router();
const passport = require('passport');
//const { isAuthenticated } = require('../helpers/auth');

//      Import Files dependents
const { getUsers, postUser,getRoles, getUser, putUser, statusUser} = require('../../../controllers/UserManagement/userManage/user.controller');

router.get('/api/users-list', getUsers);
router.post('/api/users-register', postUser);
router.put('/api/users-update/:id', putUser);
router.put('/api/users-status/:id', statusUser);

router.get('/api/users/:id',getUser);
router.get('/api/users-roleslist', getRoles);

module.exports = router;