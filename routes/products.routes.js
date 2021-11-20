const productController = require('../controllers/products.controller')
const express = require('express')
const router = express.Router()

router.post("/",productController.createProduct)
/**
 * @swagger
 * /products/:
 *   post:
 *     description: creates a product
 *     tags:
 *       - products
 *     parameters:
 *       - in: body
 *         name: product
 *         schema:
 *           type: object
 *           properties:
 *             productCode:
 *               type: string
 *               required: true
 *               example: 'S0_000'
 *             productName:
 *               type: string
 *               required: true
 *               example: 'Basic Name'
 *             productLine:
 *               type: string
 *               required: true
 *               example: 'Planes'
 *               description: has to correspond to existing product line
 *             productScale:
 *               type: string
 *               required: true
 *               example: '1:18'
 *             productVendor:
 *               type: string
 *               required: true
 *               example: 'A Basic Brand'
 *             productDescription:
 *               type: string
 *               required: true
 *               example: 'a description'
 *             quantityInStock:
 *               type: integer
 *               required: true
 *               example: 15
 *             buyPrice:
 *               type: number
 *               format: float
 *               required: true
 *               example: 15.26
 *             MSRP:
 *               type: number
 *               format: float
 *               required: true
 *               example: 30.5
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.delete("/:code",productController.deleteProduct)
/**
 * @swagger
 * /products/{code}:
 *   delete:
 *     description: used to delete a product with given productCode
 *     tags:
 *       - products
 *     parameters:
 *       - in: path
 *         name: code
 *         type: string
 *         required: true
 *         example: 'S0_000'
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.put("/",productController.updateProduct)
/**
 * @swagger
 * /products/:
 *   put:
 *     description: updates a product
 *     tags:
 *       - products
 *     parameters:
 *       - in: body
 *         name: product
 *         schema:
 *           type: object
 *           properties:
 *             productCode:
 *               type: string
 *               required: true
 *               example: 'S0_000'
 *             productName:
 *               type: string
 *               example: 'Cool Name'
 *             productLine:
 *               type: string
 *               example: 'Planes'
 *               description: has to correspond to existing product line
 *             productScale:
 *               type: string
 *               example: '1:18'
 *             productVendor:
 *               type: string
 *               example: 'A Basic Brand'
 *             productDescription:
 *               type: string
 *               example: 'a description'
 *             quantityInStock:
 *               type: integer
 *               example: 15
 *             buyPrice:
 *               type: number
 *               format: float
 *               example: 15.26
 *             MSRP:
 *               type: number
 *               format: float
 *               example: 30.5
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/3best/money",productController.get3BestProductsBasedOnMoney)
/**
 * @swagger
 * /products/3best/money:
 *   get:
 *     description: used to get the 3 best products based on money
 *     tags:
 *       - products
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */

router.get("/3best/quantity",productController.get3BestProductsBasedOnQuantity)
/**
 * @swagger
 * /products/3best/quantity:
 *   get:
 *     description: used to get the 3 best products based on quantity
 *     tags:
 *       - products
 *     responses:
 *       '200':
 *         description: Resource returned successfully
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
 */


module.exports = router