const axios = require("axios");

module.exports = {

    /**
     * Initiate a new payment
     *
     * @param {any} params  Request params
     * @returns {Promise}
     */
    createPayment: function (params) {

        return new Promise(async (resolve, reject) => {

            if (typeof params.returnUrl != undefined && !isNaN(params.returnUrl))
                reject(["The returnUrl field must be string !"]);

            if (typeof params.rib == undefined)
                reject(["The RIB field is required !"]);

            if (isNaN(params.rib))
                reject(["The RIB field must be numeric !"]);

            if (String(params.rib).length != 20)
                reject(["The RIB field length must be 20 !"]);

            if (typeof params.amount == undefined)
                reject(["The Amount field is required !"]);

            if (isNaN(params.amount))
                reject(["The Amount field must be numeric !"]);

            if (typeof params.fname == undefined)
                reject(["The First name field is required !"]);

            if (!isNaN(params.fname))
                reject(["The First name field must be string !"]);

            if (String(params.fname).length < 2)
                reject(["The First name field length must be at least 2 chars !"]);

            if (typeof params.lname == undefined)
                reject(["The Last name field is required !"]);

            if (!isNaN(params.lname))
                reject(["The Last name field must be string !"]);

            if (String(params.lname).length < 2)
                reject(["The Last name field length must be at least 2 chars !"]);

            if (typeof params.address == undefined)
                reject(["The Address field is required !"]);

            if (!isNaN(params.address))
                reject(["The Address field must be string !"]);

            if (String(params.address).length < 5)
                reject(["The Address field length must be at least 5 chars !"]);

            await axios.post("https://slick-pay.com/api/slickapiv1/transfer", params)
                .then((result) => {
                    let response = result.data;

                    if (typeof response.errors != undefined && response.errors == true)
                        reject([response.msg]);

                    resolve({
                        'transferId' : response.transfer_id,
                        'redirectUrl': response.url,
                    });
                }).catch((err) => {
                    reject([err[0].message]);
                });

        });
    },

    /**
     * Check a payment status with it transfer_id for a specific RIB
     *
     * @param {numeric} rib         The merchant bank account ID
     * @param {integer} transferId  The payment transfer_id provided as a return of the createPayment function
     * @returns {Promise}
     */
    paymentStatus: function (rib, transferId) {

        return new Promise(async (resolve, reject) => {

            if (!Number.isInteger(transferId))
                reject(["The transferId arg must be integer !"]);

            if (isNaN(rib))
                reject(["The RIB arg must be numeric !"]);

            if (String(rib).length != 20)
                reject(["The RIB arg length must be 20 !"]);

            await axios.post("https://slick-pay.com/api/slickapiv1/transfer/transferPaymentSatimCheck", {
                    rib: rib,
                    transfer_id: transferId,
                })
                .then((result) => {
                    let response = result.data;

                    if (typeof response.errors != undefined && response.errors == true)
                        reject([response.msg]);

                    resolve({
                        'date'        : response.date,
                        'amount'      : response.amount,
                        'orderId'     : response.orderId,
                        'orderNumber' : response.orderNumber,
                        'approvalCode': response.approvalCode,
                        'pdf'         : response.pdf,
                        'respCode'    : response.respCode_desc,
                    });
                }).catch((err) => {
                    reject([err[0].message]);
                });

        });
    }
};