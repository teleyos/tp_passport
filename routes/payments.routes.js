const paymentsController = require('../controllers/payments.controller')
const express = require('express')
let router = express.Router()

router.get("/bestmonth/:year",paymentsController.getBestMonthFromYear)
/**
 * @swagger
 * /paymets/bestmonth/:year:
 *   get:
 *     description: used to get the best month of given year
 *     tags:
 *       - payments
 *     parameters:
 *       - in: path
 *         name: year
 *         description: the year 
 *         required: true
 *         example: 2005
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/:date",paymentsController.getPaymentAtDate)
/**
 * @swagger
 * /payments/{date}:
 *   get:
 *     description: used to get payments at a specific date
 *     tags:
 *       - payments
 *     parameters:
 *       - in: path
 *         name: date
 *         description: the date
 *         required: true
 *         example: 2004-05-14
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/between/:date1/:date2",paymentsController.getPaymentsBetween)
/**
 * @swagger
 * /payments/between/{date1}/{date2}:
 *   get:
 *     description: used to get all the payments between date1 and date2
 *     tags:
 *       - payments
 *     parameters:
 *       - in: path
 *         name: date1
 *         type: string
 *         required: true
 *         example: 2004-12-31
 *       - in: path
 *         name: date2
 *         type: string
 *         required: true
 *         example: 2005-2-15
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/sum/:year/between/:month1/:month2",paymentsController.getSumPaymentsDuringYearBetween)
/**
 * @swagger
 * /payments/sum/{year}/between/{month1}/{month2}:
 *   get:
 *     description: used to get the sum of all payments between month1 and month2 during the year year
 *     tags:
 *       - payments
 *     parameters:
 *       - in: path
 *         name: year
 *         type: integer
 *         required: true
 *       - in: path
 *         name: month1
 *         type: integer
 *         required: 3
 *       - in: path
 *         name: month2
 *         type: integer
 *         required: 3
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

module.exports = router