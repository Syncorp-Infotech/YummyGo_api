const { send_response } = require('../../utils/app.util');
const { verifyToken } = require('../../utils/jwt.util');
const { uploadFile } = require('../../utils/s3.util');
const { Sequelize, QueryTypes } = require('sequelize');
const db = require("../../models");
const Invoice = db.invoice;

const Op = Sequelize.Op;

exports.createInvoice = function (event, context) {
    var _data = event.body;
    const file = event.files.doc_invoice;

    uploadFile(file, 'invoices').then((fileurl) => {
        Invoice.create({
            sender: _data.sender,
            receiver: _data.receiver,
            inv_subject: _data.subject,
            inv_note: _data.note,
            doc_invoice: fileurl,
            inv_status: 'A'
        }).then(invoice => {
            context.done(null, send_response(200, invoice));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.viewInvoice = function (event, context) {

    verifyToken(event.headers).then(auther => {
        var filter = {
            include: [
                {
                    model: db.corporate,
                    attributes: ['corp_id', 'corp_name'], 
                    as: 'insender',
                    required: true
                },
                {
                    model: db.corporate,
                    attributes: ['corp_id', 'corp_name'], 
                    as: 'inreceiver',
                    required: true
                }
            ],
            where: {
                id: event.pathParams.id
            }
        };

        Invoice.findOne(filter).then(post => {
            context.done(null, send_response(200, post));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.listSentInvoices = function (event, context) {

    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);

    verifyToken(event.headers).then(auther => {
        var filter = {
            include: [
                {
                    model: db.corporate,
                    attributes: ['corp_id', 'corp_name'], 
                    as: 'insender',
                    required: true
                },
                {
                    model: db.corporate,
                    attributes: ['corp_id', 'corp_name'], 
                    as: 'inreceiver',
                    required: true
                }
            ],
            where: {
                sender: event.pathParams.profile_id
            },
            order: [['created_at', 'DESC']],
            offset: _offset,
            limit: _limit
        };

        Invoice.findAndCountAll(filter).then(invoices => {
            context.done(null, send_response(200, invoices));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.listReceivedInvoices = function (event, context) {

    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);

    verifyToken(event.headers).then(auther => {
        var filter = {
            include: [
                {
                    model: db.corporate,
                    attributes: ['corp_id', 'corp_name'], 
                    as: 'insender',
                    required: true
                },
                {
                    model: db.corporate,
                    attributes: ['corp_id', 'corp_name'], 
                    as: 'inreceiver',
                    required: true
                }
            ],
            where: {
                receiver: event.pathParams.profile_id
            },
            order: [['created_at', 'DESC']],
            offset: _offset,
            limit: _limit
        };

        Invoice.findAndCountAll(filter).then(invoices => {
            context.done(null, send_response(200, invoices));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}