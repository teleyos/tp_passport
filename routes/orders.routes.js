const ordersController = require('../controllers/orders.controller')
const express = require('express')
let router = express.Router()

router.post('/details',ordersController.addProductInOrderDetail)
/**
 * @swagger
 * /orders/details:
 *   post:
 *     description: Used to create an order detail
 *     tags:
 *       - orderdetails
 *     parameters:
 *       - in: body
 *         name: orderDetail
 *         description: create a new order detail
 *         schema:
 *           type: object
 *           properties:
 *             orderNumber:
 *               type: integer
 *               required: true
 *               example: 10100
 *             productCode:
 *               type: string
 *               required: true
 *               description: has to reference existing productCode
 *               example: 'S10_1949'
 *             quantityOrdered:
 *               type: integer
 *               required: true
 *               example: 10
 *             priceEach:
 *               type: string
 *               required: true
 *               example: '10.30'
 *             orderLineNumber:
 *               type: integer
 *               required: true
 *               example: 5
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.put("/:orderId/details/:productCode",ordersController.updateProductQuantityFromOrderDetails)
/**
 * @swagger
 * /orders/{orderId}/details/{productCode}:
 *   put:
 *     description: Used to update the quantity of a prodcut from an order
 *     tags:
 *       - orderdetails
 *     parameters:
 *       - in: path
 *         name: orderId
 *         description: the id of the order
 *         type: integer
 *         example: 10100
 *       - in: path
 *         name: productCode
 *         description: the product in the order
 *         type: integer
 *         example: 'S10_1949'
 *       - in: body
 *         name: quantity
 *         schema:
 *           type: object
 *           properties:
 *             quantityOrdered:
 *               required: true
 *               description: the quantity to change
 *               type: integer
 *               example: 5
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.delete("/:orderId/details/:lineNumber",ordersController.deleteLineFromOrderDetails)
/**
 * @swagger
 * /orders/{orderId}/details/{lineNumber}:
 *   delete:
 *     description: Used to delete lineNumber from order orderId
 *     tags:
 *       - orderdetails
 *     parameters:
 *       - in: path
 *         name: orderId
 *         description: the id of the order
 *         type: integer
 *         example: 10100
 *       - in: path
 *         name: lineNumber
 *         description: the number of the line to delete
 *         type: integer
 *         example: 5
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

module.exports = router