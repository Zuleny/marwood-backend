const router = require('express').Router();
const path = require('path');
const {postGenerateInvoice} = require('../../../controllers/OrderManagement/invoiceManage/invoice.controller');

router.post('/api/generate_invoice_pdf', postGenerateInvoice);

//Get Image File to client http://localhost:4000/img/*
router.get("/pdf/:invoice_no",function(req, res){ 
    res.download(path.join(__dirname, `../../../../../files/${req.params.invoice_no}.pdf`));
});

module.exports = router;