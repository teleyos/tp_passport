const customersController = require('../controllers/customers.controller')
const express = require('express')
let router = express.Router()

router.get("/",customersController.index)
/**
 * @swagger
 * /customers/:
 *   get:
 *     description: Used to get all Customers
 *     tags:
 *       - customers
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/count",customersController.count)
/**
 * @swagger
 * /customers/count:
 *   get:
 *     description: Used to count the number of customer
 *     tags: 
 *       - customers
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/:id",customersController.getById)
/**
 * @swagger
 * /customers/{customerId}:
 *   get:
 *     description: Used to get all Customers
 *     tags:
 *       - customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.delete("/:id",customersController.deleteCustomer)
/**
 * @swagger
 * /customers/{customerId}:
 *   delete:
 *     description: delete customer with this id
 *     tags:
 *       - customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.post("/",customersController.createCustomer)
/**
 * @swagger
 * /customers/:
 *   post:
 *     description: Used to create a Customers
 *     tags:
 *       - customers
 *     parameters:
 *       - in: body
 *         name: customer
 *         description: create a customer with given infos
 *         schema:
 *           type: object
 *           required:
 *             - customerNumber
 *             - customerName
 *             - contactLastName
 *             - contactFirstName
 *             - phone
 *             - addressLine1
 *             - city
 *             - country
 *           properties:
 *             customerNumber:
 *               type: integer
 *             customerName:
 *               type: string
 *             contactLastName:
 *               type: string
 *             contactFirstName:
 *               type: string
 *             phone:
 *               type: string
 *             addressLine1:
 *               type: string
 *             addressLine2:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             postalCode:
 *               type: string
 *             country:
 *               type: string
 *             salesRepEmployeeNumber:
 *               type: integer
 *             creditLimit:
 *               type: decimal(10,2)
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.put("/:id",customersController.updateCustomer)
/**
 * @swagger
 * /customers/{customerId}:
 *   put:
 *     description: Used to create a Customer
 *     tags:
 *       - customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *       - in: body
 *         name: customer
 *         description: updates customer with given number with given infos
 *         schema:
 *           type: object
 *           properties:
 *             customerNumber:
 *               type: integer
 *             customerName:
 *               type: string
 *             contactLastName:
 *               type: string
 *             contactFirstName:
 *               type: string
 *             phone:
 *               type: string
 *             adrressLine1:
 *               type: string
 *             adrressLine2:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             postalCode:
 *               type: string
 *             country:
 *               type: string
 *             salesRepEmployeeNumber:
 *               type: integer
 *             creditLimit:
 *               type: decimal(10,2)
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/:id/lastorder/",customersController.lastOrder)
/**
 * @swagger
 * /customers/{customerId}/lastorder:
 *   get:
 *     description: Used to get last order details
 *     tags:
 *       - customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/:id/lastorder/details",customersController.lastOrderDetails)
/**
 * @swagger
 * /customers/{customerId}/lastorder/details:
 *   get:
 *     description: Used to get last order details
 *     tags:
 *       - customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/nopayment/:year",customersController.getCustomerWithoutPaymentInYear)


module.exports = router