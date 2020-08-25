const reportModel = require('../../../models/OrderManagement/reportsManage/salesReport.model');

const getReportSale = async (req, res) => {
    const listReportSales = await reportModel.getListReport();
    res.json(listReportSales);
}

const getReportsSaleDate = async (req, res) => {
    const listReport = await reportModel.getListReportSaleDate();
    res.json(listReport);
}

module.exports = {
    getReportSale,
    getReportsSaleDate
}