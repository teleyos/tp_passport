const sequelize = require('../config/db2.config')
let initModels = require('../services/init-models')
let models = initModels(sequelize)
let OrderDetail = models.orderdetails

exports.addProductInOrderDetail=(req,res)=>{
	return OrderDetail.create(req.body).then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad request"})
	})
}

exports.deleteLineFromOrderDetails = (req,res)=>{
	return OrderDetail.destroy({
		where:{
			orderNumber: parseInt(req.params.orderId),
			orderLineNumber: parseInt(req.params.lineNumber)
		}
	}).then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad request"})
	})
}

exports.updateProductQuantityFromOrderDetails = (req,res)=>{
	return OrderDetail.update({quantityOrdered:parseInt(req.body.quantityOrdered)},{
		where:{
			orderNumber: parseInt(req.params.orderId),
			productCode: req.params.productCode
		}
	}).then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}