const htmlPDF = require('html-pdf');
const path = require('path');
const invoiceModel = require('../../../models/OrderManagement/invoiceManage/invoice.model');

const postGenerateInvoice = async (req, res) => {
    const {order_no, id_user} = req.body;
    console.log("req body", req.body);
    let invoice_no = await invoiceModel.registerInvoice(order_no, id_user);
    const listProducts = await invoiceModel.getListProducts(invoice_no);
    const dataInvoice = await invoiceModel.getInvoiceData(invoice_no);
    console.log(dataInvoice, listProducts, invoice_no);
    let pdfInvoice = `<tbody>`;
    for (let index = 0; index < listProducts.length; index++) {
        pdfInvoice = await pdfInvoice + `
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${listProducts[index].description}</td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${listProducts[index].description_category}</td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${listProducts[index].price}</td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${listProducts[index].quantity}</td>
        </tr>`;
    }
    pdfInvoice = pdfInvoice + `</tbody>`;
    let contentHTML = `
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Factura #${invoice_no}</title>
    </head>
    <body>
        <div id="pageHeader">
            <h5 style="text-align: center;"><b>Factura Muebles Mara</b></h5>
        </div>
        <h2 style="text-align: center;">Factura #${invoice_no}</h2>
        <div style="padding: 5%;">
            <p>
                <b>Cliente: </b> ${dataInvoice.username}<br>
                <b>Razon Social: </b> ${dataInvoice.business_name}<br>
                <b>NIT: </b> ${dataInvoice.nit_ci}<br>
                <b>Fecha de Compra: </b> ${dataInvoice.date}<br>
                <b>Total costo: </b> ${dataInvoice.total_cost} <br>
                <br>
            </p>
            <table style="border: 1px solid black; border-collapse: collapse; width: 100%;">
                <thead>
                    <tr>
                        <th style="border: 1px solid black; border-collapse: collapse;">Mueble</th>
                        <th style="border: 1px solid black; border-collapse: collapse;">Categoria</th>
                        <th style="border: 1px solid black; border-collapse: collapse;">Precio</th>
                        <th style="border: 1px solid black; border-collapse: collapse;">Cantidad</th>
                    </tr>
                </thead>
                ${pdfInvoice}
            </table>
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