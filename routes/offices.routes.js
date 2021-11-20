const officesController = require('../controllers/offices.controller')
const express = require('express')
let router = express.Router()

router.get("/:id/employees",officesController.getEmployeesFromOffice)
/**
 * @swagger
 * /offices/{officeId}/employees:
 *   get:
 *     description: Used to get all employes from given office
 *     tags:
 *       - office
 *     parameters:
 *       - in: path
 *         name: officeId
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


router.get("/",officesController.getAll)
/**
 * @swagger
 * /offices/:
 *   get:
 *     description: USed to get all offices
 *     tags:
 *       - office
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/count",officesController.count)
/**
 * @swagger
 * /offices/count:
 *   get:
 *     description: Used the number of office
 *     tags:
 *       - office
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

module.exports = router;