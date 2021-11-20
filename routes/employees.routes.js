const employeeController = require('../controllers/employees.controller')
const express = require('express')
let router = express.Router()

router.get("/:id/customers",employeeController.getCustomersFromEmploye)
/**
 * @swagger
 * /employees/{employeeID}/customers:
 *   get:
 *     description: Used to get all Customers
 *     tags:
 *       - employees
 *     parameters:
 *       - in: path
 *         name: employeeID
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

router.get("/best2/clients",employeeController.getBest2BasedOnClientCount)
/**
 * @swagger
 * /employees/best2/clients:
 *   get:
 *     description: Used to get the 2 best employees based on client number
 *     tags:
 *       - employees
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/best2/money",employeeController.getBest2BasedOnMoney)
/**
 * @swagger
 * /employees/best2/money:
 *   get:
 *     description: Used to get the 2 best employees based on money won
 *     tags:
 *       - employees
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */ 

router.get("/:id",employeeController.getEmployeeById)
/**
 * @swagger
 * /employees/{employeeId}:
 *   get:
 *     description: Used to get information an employee
 *     tags:
 *       - employees
 *     parameters:
 *       - in: path
 *         name: employeeId
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

router.get("/:id/referers",employeeController.getEmployeesReferingTo)
/**
 * @swagger
 * /employees/{id}/referers:
 *   get:
 *     description: Used to get the employes refering to given employee
 *     tags:
 *       - employees
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         example: 1102
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

module.exports = router