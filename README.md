<p align="center"><a href="https://slick-pay.com" target="_blank"><img src="https://azimutbscenter.com/logos/slick-pay.png" width="380" height="auto" alt="Slick-Pay Logo"></a></p>

## Description

[Node.js](https://www.npmjs.com) module for [Slick-Pay](https://slick-pay.com) Quick Transfer API implementation.

* [Installation](#installation)
* [How to use?](#how-to-use)
    * [createPayment](#createPayment)
    * [paymentStatus](#checkStatus)

## Installation

Just run this command line :

```sh
npm i @slick-pay/quick-transfer
```

## How to use?

By using the **@slick-pay/quick-transfer** package, you will be able to **create new payments**, and also **check payments statuses** identified by their transfer ID.

### createPayment

To create any new payment, you will use the **createPayment** function provided within the **@slick-pay/quick-transfer** package.

#### Parameters

* **returnUrl:** <**string**> (optional), the callback URL that the user will be redirected to after the payment was successfully completed from the payment platform
* **amount:** <**numeric**> (required), the transaction amount in "Dinar algérien" currency, the minimum accepted amount is **100 DA**
* **rib:** <**string**> (required) It will define the merchant bank account ID, it should be a string with the exact size of 20 characters.
* **fname:** <**string**> (required) To define the merchant first name, it should be a string with minimum length of 2 characters.
* **lname:** <**string**> (required) To define the merchant last name, it should be a string with minimum length of 2 characters.
* **address:** <**string**> (required) To define the merchant address, it should be a string with minimum length of 5 characters.

#### Example

Check the example below :

```js
const createPayment = require('@slick-pay/quick-transfer');

createPayment({
        "rib": "00012345678912345678",
        "amount": 1000,
        "fname": "Lorem",
        "lname": "ipsum",
        "address": "Dolor",
    })
    .then((result: any) => {
        console.log(result);
    })
    .catch((err: any) => {
        console.log(err);
    });
```

After calling **then** method you'll be able to access to :
* **transferId:** Payment transfer ID (can be used to check payment status)
* **redirectUrl:** The redirect url to redirect the client to the payment platform

Meanwhile, when the **catch** method is call, it will retruns an array of strings for errors occured.

### paymentStatus

If you would like to check any payment status, you will use the **paymentStatus** function provided within the **@slick-pay/quick-transfer** package.

#### Parameters

* **[rib](#parameters):** <**string**> (required)
* **transferId:** <**number**> (required), Payment transfer ID

#### Example

Check the example below :

```js
paymentStatus("00012345678912345678", 1)
    .then((result: any) => {
        this.result = result;
    }).catch((err: any) => {
        console.log(err);
    });
```

After calling **then** method you'll be able to access to :
* **date:** The transaction date (format: Y-m-d H:i:s)
* **amount:** The transaction amount
* **orderId:** The order ID provided from the payment platform
* **orderNumber:** The order N° provided from the payment platform
* **approvalCode:** The approval code returned from the payment platform
* **respCode:** The response code returned from the payment platform
* **pdf:** Download the order details as a PDF file

Meanwhile, when the **catch** method is call, it will retruns an array of strings for errors occured.

## More help
   * [Slick-Pay website](https://slick-pay.com)
   * [Reporting Issues / Feature Requests](https://github.com/Slick-Pay-Algeria/quick-transfer/issues)