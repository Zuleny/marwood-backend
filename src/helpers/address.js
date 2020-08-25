const path = require('path');
const addressTheBitacoraFile = path.join(__dirname,'../../../security/bitacora.json');
const addressThePasswordFile = path.join(__dirname,'../../../security/password.json');
const addressThePasswordOwnerFile = path.join(__dirname, '../../../security/passwordOwner.json');
const addressTheBitacoraOwnerFile = path.join(__dirname, '../../../security/bitacoraOwner.json');
const addressTheReport = path.join(__dirname, '../../../security/report/');

module.exports = {
    addressTheBitacoraFile,
    addressThePasswordFile,
    addressThePasswordOwnerFile,
    addressTheBitacoraOwnerFile,
    addressTheReport
}