const sequelize = require('../config/db2.config')
let initModels = require('../services/init-models')
let models = initModels(sequelize)
let Employees = models.employees
let Office = models.offices

exports.getEmployeesFromOffice=(req,res)=>{
	let officeCode = parseInt(req.params.id)
	return Employees.findAll({
		where:{officeCode:officeCode}
	}).then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

exports.getAll = (req,res)=>{
	return Office.findAll().then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

exports.count = (req,res)=>{
	return Office.count().then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}