const productLineController = require('../controllers/productLines.controller')
const express = require('express')
let router = express.Router()

router.get("/",productLineController.getAll)
/**
 * @swagger
 * /productlines/:
 *   get:
 *     description: Used to get All productlines
 *     tags:
 *       - productlines
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

module.exports = router