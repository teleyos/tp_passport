const sequelize = require('../config/db2.config')
let initModels = require('../services/init-models')
let models = initModels(sequelize)
let ProductLine = models.productlines

exports.getAll=(req, res)=>{
	return ProductLine.findAll().then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad request"})
	})
}