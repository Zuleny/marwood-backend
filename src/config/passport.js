const passport = require('passport');                           // get passport library
const localStrategy = require('passport-local').Strategy;       // get strategy of authentication
const userModel = require('../models/UserManagement/userManage/user.model');
const externalLibrary = require('./externalLibrary');

/**
 * This function make the user input to the System ExpressJS
 * without Login (email, password)
 */
passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
    console.log('process initialize session with login');
    if (await userModel.emailUserExists(email)) {
        console.log('Email exists in Web System');
        if (await userModel.enabledUser(email)) {
            if (await userModel.matchPassword(email, password)) {
                console.log('Compare password 100%');
                const user = await userModel.getUser(`SELECT * FROM "user" WHERE email='${email}'`); //id_user, username, email, user_profile, enable, id_role
                if (externalLibrary.writeBackLog(user.rows[0].username, "Initialize Session in ExpressJS")) {
                    console.log('Write BackLog Session initialization');
                } else {
                    console.error("I can't write in backlog the session initialize");
                }
                return done(null, user.rows[0]);
            } else {
                console.log('Compare password 0% compatible');
                return done(null, false, { message: 'Incorrect Password.' })
            }
        } else {
            return done(null, false, { message: `User disabled, you can't entry.` })
        }
    } else {
        console.log('email does not exists');
        return done(null, false, { message: 'Not user found.' });
    }
}));

/**
 * This function serializes each time you session initialize with Login 
 */
passport.serializeUser((user, done) => {
    done(null, user.id_user);   //id_user, username, email, user_profile, enable, id_role
})

/**
 * This function deserialize each time that browser in views of the system  
 */
passport.deserializeUser(async (id, done) => {
    console.log('Session Deserialize');
    await userModel.getUser(`select u.id_user, u.username, u.user_profile, r.role_name from "user" u, "role" r where u.id_role=r.id_role and  u.id_user=${id}`, (err, user) => {
        if (err) {
            console.error('error deserialize passport');
            console.log(err);
        }
        done(null, user.rows[0]); //id_user, username, user_profile, role_name
    })
})

