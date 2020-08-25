const router = require('express').Router();
const passport = require('passport');
//const { isAuthenticated } = require('../helpers/auth');

//      Import Files dependents
const { getLogin, getIndex, postLogin } = require('../controllers/login.controller');

router.get('/', getIndex);

router.post('/api/users-login', postLogin);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/login', getLogin);

module.exports = router;