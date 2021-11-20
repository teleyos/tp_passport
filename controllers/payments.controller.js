const sequelize = require('../config/db2.config')
let initModels = require('../services/init-models')
const { Op } = require('sequelize')
const payments = require('../services/payments')
let models = initModels(sequelize)
let Payment = models.payments


// select monthname(`paymentDate`) as month from payments
// where year(`paymentDate`) = 2005 group by month order 
// by sum(amount) desc limit 1;

exports.getBestMonthFromYear = (req, res) => {
	return Payment.findAll({
		where:sequelize.where(sequelize.fn("year",sequelize.col("paymentDate")),parseInt(req.params.year)),
		attributes: [
			[sequelize.fn("monthname", sequelize.col("paymentDate")), "month"],
			[sequelize.fn("sum", sequelize.col('amount')), "money"]
		],
		group: sequelize.col("month"),
	}).then(result => {
		result.map(e => {
			e.dataValues.money = parseFloat(e.dataValues.money)
			return e
		})
		result = result.sort((a, b) => b.dataValues.money - a.dataValues.money)[0]
		res.status(200).send({ success: 1, data: result})
	}).catch(err => {
		res.status(400).send({ success: 0, data: err })
	})
}

exports.getPaymentAtDate = (req,res) => {
	return Payment.findAll({
		where:{
			paymentDate:req.params.date
		} 
	}).then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

exports.getPaymentsBetween = (req,res)=>{
	return Payment.findAll({
		where:{
			paymentDate:{
				[Op.between]:[new Date(req.params.date1),new Date(req.params.date2)]
			}
		}
	}).then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

exports.getSumPaymentsDuringYearBetween = (req,res)=>{
	return Payment.findAll({
		attributes:[
			[sequelize.fn("sum",sequelize.col("amount")),"money"]
		],
		where:{
			[Op.and]:[
				sequelize.where(sequelize.fn("year",sequelize.col('paymentDate')),parseInt(req.params.year)),
				sequelize.where(sequelize.fn("month",sequelize.col('paymentDate')),{[Op.between]:[parseInt(req.params.month1),parseInt(req.params.month2)]})
			]
		}
	}).then(result=>{
		res.status(200).send({success:1,data:result})
	}).catch(err=>{
		res.status(400).send({success:0,data:err})
	})
}