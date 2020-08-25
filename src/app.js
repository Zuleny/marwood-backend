const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const device = require('express-device');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');

/**
 * 
 * Initializations
 */
const app = express();
require('./config/database');
//require('./config/passport');
/**
 * 
 * 
 * Settings
 */
app.set('port', process.env.PORT || 4000);      // using a port assigned for OS; else 3000 port
/**
 * Globals  Variables
 */

/**
 *
 * Middlewares
 */
app.use(device.capture());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));                        // you can to send html methods as put, delete
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */ 

app.use(require('./routes/index.route'));
app.use(require('./routes/UserManagement/userManage/user.route'));
app.use(require('./routes/UserManagement/roleManage/role.route'));

app.use(require('./routes/CatalogInventoryManagement/productCategoryManage/productCategory.route'));
app.use(require('./routes/CatalogInventoryManagement/productManage/product.route'));

app.use(require('./routes/OrderManagement/reportsManage/salesReport.route'));
app.use(require('./routes/OrderManagement/deliveryAreaManage/deliveryArea.route'));
app.use(require('./routes/OrderManagement/orderManage/order.route'));
app.use(require('./routes/OrderManagement/paymentMethodManage/paymentMethod.route'));
app.use(require('./routes/OrderManagement/invoiceManage/invoice.route'));

module.exports = app;