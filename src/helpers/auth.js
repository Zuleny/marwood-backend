const helpers = {};

//MIddleware
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/login');
    }
}

module.exports = helpers;