//const pdf = require('html-pdf');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
//const nodeMailer = require('nodemailer');
const address = require('../helpers/address');

module.exports = {
    /**
     * Send email for Gmail server
     * @param {string} contentHTML : container of the email
     * @param {string} toEmail : sender email
     * @param {string} subjectEmail : title the email
     * RETURNS : info the email sent
     */
    async sendEmail(contentHTML, toEmail, subjectEmail) {
        const transporter = await nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: "restteam.si@gmail.com",
                pass: "11235813.restTeam.13853211"
            },
            tls: { rejectUnauthorized: false }
        });
        transporter.verify(function (error, success) {
            if (error) {
                console.log("Error connection to gmail", error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });
        const info = await transporter.sendMail({
            from: "'RestTeam Server' <restteam2020@nodejs.net>",
            to: toEmail,
            subject: subjectEmail,
            html: contentHTML
        });
        console.log("info the email: ", info);
        return info;
    },

    /**
     * Its function writes to Bitacora all activities of the user
     * Observation: THE FILE BITACORA.JSON SHOULD IN(*) *../EXPRESS_SI2
     * More INFO: src\public\eventual_image.png
     * @param {string} user : username
     * @param {string} activity : activity to register
     * RETURNS : boolean
     */
    async writeBackLog(user, activity, deviceType = null) {
        const json_backlog = await fs.readFileSync(address.addressTheBitacoraFile, 'utf-8');
        let bitacora = JSON.parse(json_backlog);
        let today = new Date();
        let dateTime = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' ' + today.getTime();
        let newActivity = {
            user,
            date: dateTime,
            activity,
            device: deviceType
        }
        bitacora.push(newActivity);
        const json_write = JSON.stringify(bitacora);
        await fs.writeFile(address.addressTheBitacoraFile, json_write, error => {
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log('successfully writing to bitacora.json');
            }
        })
        return true;
    },

    /**
     * Encrypt a user password
     * @param {string} password : uncharted password
     * RETURNS : hash (string)
     */
    async encryptPassword(password) {
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);
        return hash;
    },

    /**
     * update the password user in "password.json"
     * @param {integer} idUser
     * @param {string} hash
     * RETURNS : boolean
     */
    async updatePassword(idUser, hash) {
        const json_password = fs.readFileSync(address.addressThePasswordFile, 'utf-8');
        let listUserPassword = JSON.parse(json_password);
        listUserPassword.forEach(user => {
            if (user.id_user == idUser) {
                user.pass = hash;
            }
        });
        const json_write = JSON.stringify(listUserPassword);
        await fs.writeFile(address.addressThePasswordFile, json_write, error => {
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log('successfully writing to password.json');
            }
        })
        return true;
    },

    /**
     * Save new user password encrypted in password.json
     * RETURNS boolean
     * @param {integer} idUser : new user id
     * @param {string} password : encrypt new user password
     */
    async saveNewPasswordUser(idUser, password) {
        const json_password = fs.readFileSync(address.addressThePasswordFile, 'utf-8');
        let passwordList = JSON.parse(json_password);
        let newPass = {
            id_user: idUser,
            pass: password
        }
        passwordList.push(newPass);
        const json_write = JSON.stringify(passwordList);
        await fs.writeFile(address.addressThePasswordFile, json_write, error => {
            if (error) {
                console.error("Error in write password.json");
                console.log(error);
                return false;
            } else {
                console.log('successfully writing to password.json');
            }
        })
        return true;
    },

    /**
     * Save new owner password encrypted in passwordOwner.json
     * RETURNS boolean
     * @param {integer} ciOwner : new user id
     * @param {string} password : encrypt new user password
     */
    async saveNewPasswordOwner(ciOwner, password) {
        const json_password = fs.readFileSync(address.addressThePasswordOwnerFile, 'utf-8');
        let passwordList = JSON.parse(json_password);
        let newPass = {
            ci_owner: ciOwner,
            pass: password
        }
        passwordList.push(newPass);
        const json_write = JSON.stringify(passwordList);
        await fs.writeFile(address.addressThePasswordOwnerFile, json_write, error => {
            if (error) {
                console.error("Error in write passwordOwner.json");
                console.log(error);
                return false;
            } else {
                console.log('successfully writing to passwordOwner.json');
            }
        })
        return true;
    },

    /**
     * Get bitacora list
     */
    async getListBitacora() {
        let bitacoraList = await fs.readFileSync(address.addressTheBitacoraFile, 'utf-8');
        bitacoraList = await JSON.parse(bitacoraList);
        console.log(bitacoraList);
        return bitacoraList;
    },

    async getListUserBitacora(user) {
        let bitacoraList = await fs.readFileSync(address.addressTheBitacoraFile, 'utf-8');
        bitacoraList = await JSON.parse(bitacoraList);
        var userList = await bitacoraList.filter(element => element.user == user);
        return userList;
    },

    /**
     * get last 5 activities of the bitacora
     */
    async getLastFiveActivities(countActivities) {
        let bitacoraList = await fs.readFileSync(address.addressTheBitacoraFile, 'utf-8');
        bitacoraList = JSON.parse(bitacoraList);
        if (bitacoraList.length > countActivities) {
            let arrayBitacora = Array(countActivities);
            for (let index = 1; index < countActivities + 1; index++) {
                arrayBitacora[index - 1] = await bitacoraList[bitacoraList.length - index];
            }
            return arrayBitacora;
        } else {
            if (bitacoraList.length < 1) {
                console.log(`Don't have activities in bitacora`);
                return {
                    activity: "There are no activities",
                };
            } else {
                console.log('less activities in bitacora.');
                return bitacoraList;
            }
        }
    },

    async getLastActivities(countActivities, username) {
        let bitacoraList = await fs.readFileSync(address.addressTheBitacoraFile, 'utf-8');
        bitacoraList = JSON.parse(bitacoraList);
        var userList = bitacoraList.filter(element => element.user == user);
        if (userList.length > countActivities) {
            let arrayBitacora = Array(countActivities);
            for (let index = 1; index < countActivities + 1; index++) {
                arrayBitacora[index - 1] = await userList[userList.length - index];
            }
            return arrayBitacora;
        } else {
            if (userList.length < 1) {
                console.log(`Don't have activities`)
                return {
                    activity: "There are no activities",
                };
            } else {
                console.log('less activities: ', userList);
                return userList;
            }
        }
    },


    /**
     * method for create PDF file
     * @param {string HTML} content content HTML of the file
     * @param {string} fileName : fileName.pdf
     */
    async generatePDFReport(content, fileName) {
        pdf.create(content).toFile(`${address.addressTheReport}${fileName}`, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        })
    },

    /**
     * Verify login of the owner in the movil app
     * @param {integer} ciOwner : CI of the owner
     * @param {String} passwordOwner : password owner
     */
    async verifyLoginOwner(ciOwner, passwordOwner) {
        const json_password_owner = await fs.readFileSync(address.addressThePasswordOwnerFile, 'utf-8');
        let listPassword = JSON.parse(json_password_owner);
        let result = false;
        await listPassword.forEach(data => {
            if (data.ci_owner == ciOwner && data.pass == passwordOwner) {
                result = true;
            }
        });
        return result;
    },

    /**
     * Write Activity to register of the user in App Movil
     * @param {String} user : user name
     * @param {*} activity : Activity to register
     */
    async writeBitacoraOwner(user, activity) {
        const json_backlog = await fs.readFileSync(address.addressTheBitacoraOwnerFile, 'utf-8');
        let bitacora = JSON.parse(json_backlog);
        let today = new Date();
        let dateTime = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' ' + today.getTime();
        let newActivity = {
            user,
            date: dateTime,
            activity,
        }
        bitacora.push(newActivity);
        const json_write = JSON.stringify(bitacora);
        await fs.writeFile(address.addressTheBitacoraOwnerFile, json_write, error => {
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log('successfully writing to bitacoraOwner.json');
            }
        })
        return true;
    },
};
