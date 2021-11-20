const sequelize = require('../config/db2.config')
const initModels = require('../services/init-models')
const models = initModels(sequelize)
const Product = models.products
const OrderDetail = models.orderdetails

exports.createProduct = (req,res) => {
	return Product.create(req.body).then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

exports.deleteProduct = (req,res) => {
	return Product.destroy({where:{productCode:req.params.code}}).then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

exports.updateProduct = (req,res) => {
	return Product.update(req.body,{where:{
		productCode: req.body.productCode
	}}).then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

// select productCode,sum(priceEach*quantityOrdered) as money from orderdetails
// group by productCode order by money desc limit 3;
exports.get3BestProductsBasedOnMoney= async (req,res)=>{

	try{
		var best3 = await OrderDetail.findAll({
			attributes:[
				'productCode',
				[sequelize.fn("sum",sequelize.literal("priceEach*quantityOrdered")),"money"]
			],
			group: sequelize.col('productCode'),
			order: sequelize.literal("money desc"),
			limit:3
		})
	}catch(err){
		res.status(400).send({success:0,data:"Bad Request"})
	}

	for(let i=0;i<best3.length;i++){
		let product = await Product.findOne({where:{productCode:best3[i].dataValues.productCode}})
		best3[i].dataValues = {
			"money":best3[i].dataValues.money,
			"product":product
		}
	}

	res.status(200).send({success:1,data:best3})
}

exports.get3BestProductsBasedOnQuantity= async (req,res)=>{

	try{
		var best3 = await OrderDetail.findAll({
			attributes:[
				'productCode',
				[sequelize.fn("sum",sequelize.literal("quantityOrdered")),"quantity"]
			],
			group: sequelize.col('productCode'),
			order: sequelize.literal("quantity desc"),
			limit:3
		})
	}catch(err){
		res.status(400).send({success:0,data:"Bad Request"})
	}

	for(let i=0;i<best3.length;i++){
		let product = await Product.findOne({where:{productCode:best3[i].dataValues.productCode}})
		best3[i].dataValues = {
			"quantity":best3[i].dataValues.quantity,
			"product":product
		}
	}

	res.status(200).send({success:1,data:best3})
}

