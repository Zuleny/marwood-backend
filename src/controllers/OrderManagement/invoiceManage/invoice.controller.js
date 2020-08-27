const htmlPDF = require('html-pdf');
const path = require('path');
const invoiceModel = require('../../../models/OrderManagement/invoiceManage/invoice.model');

const postGenerateInvoice = async (req, res) => {
    const {order_no, id_user} = req.body;
    console.log("req body", req.body);
    let invoice_no = await invoiceModel.registerInvoice(order_no, id_user);
    const listProducts = await invoiceModel.getListProducts(invoice_no);
    const dataInvoice = await invoiceModel.getInvoiceData(invoice_no);
    var totalShoopingCart = await invoiceModel.getTotalShoppingCart(invoice_no);
    var discount = (totalShoopingCart*dataInvoice.discount)/100;
    console.log(dataInvoice, listProducts, invoice_no);
    let pdfInvoice = `<tbody>`;
    for (let index = 0; index < listProducts.length; index++) {
        pdfInvoice = await pdfInvoice + `
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${listProducts[index].name}</td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${listProducts[index].price}</td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${listProducts[index].quantity}</td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${(listProducts[index].price)*(listProducts[index].quantity)}</td>
        </tr>`;
    }
    pdfInvoice = pdfInvoice + `</tbody>`;
    let contentHTML = `
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Factura N° ${invoice_no}</title>
    </head>
    <body>
        <div id="pageHeader">
            <h5 style="text-align: center;"><b>Factura Muebles Mara</b></h5>
        </div>
        <h3 style="text-align: center;">NIT :             10045672355</h3>
        <h3 style="text-align: center;">FACTURA N° :      ${invoice_no}</h3>
        <h3 style="text-align: center;">AUTORIZACION N° : ${dataInvoice.nro_authorization}</h3>
        <div style="padding: 5%;">
            <p>
                <b>Cliente: </b> ${dataInvoice.username}<br>
                <b>NIT: </b> ${dataInvoice.nit_ci}<br>
                <b>Razon Social: </b> ${dataInvoice.business_name}<br>
                <b>Fecha de Emision: </b> ${dataInvoice.date}<br>
                <br>
                <br>
            </p>
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th style="border: 1px solid black; border-collapse: collapse;">Concepto</th>
                        <th style="border: 1px solid black; border-collapse: collapse;">Precio</th>
                        <th style="border: 1px solid black; border-collapse: collapse;">Cantidad</th>
                        <th style="border: 1px solid black; border-collapse: collapse;">Subtotal</th>
                    </tr>
                </thead>
                ${pdfInvoice}
            </table>
            <b>TOTAL: </b> ${totalShoopingCart}<br>
            <b>DESCUENTO: </b> ${discount}<br>
            <b>TOTAL PRODUCTOS: </b> ${totalShoopingCart-discount}<br>
            <b>TOTAL DELIVERY: </b> ${dataInvoice.price_delivery_area}<br>
            <b>TOTAL: </b> ${totalShoopingCart-discount+parseInt(dataInvoice.price_delivery_area)}<br>
            <div id="pageFooter" style="text-align: center;">
                <b>Muebles Mara E-commerce MarWood</b>
            </div>
        </div>
    </body>
    </html>
    `;
    var filePath = await path.join(__dirname, `../../../../../files/${invoice_no}.pdf`);
    console.log(filePath);
    await htmlPDF.create(contentHTML).toFile(filePath, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
    setTimeout(function(){
        res.json({invoice_no : invoice_no});
    },6000);
}

module.exports = {
    postGenerateInvoice
}