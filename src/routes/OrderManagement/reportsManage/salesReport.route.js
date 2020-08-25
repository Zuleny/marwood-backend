const router = require('express').Router();
const {getReportSale, getReportsSaleDate} = require('../../../controllers/OrderManagement/reportsManage/salesReport.controller,');

router.get('/api/sales_report', getReportSale);

router.get('/api/sales_date_report', getReportsSaleDate);

module.exports = router;