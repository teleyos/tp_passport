const sequelize = require('../config/db2.config')
let initModels = require('../services/init-models')
let models = initModels(sequelize)
let Customer = models.customers
let Order = models.orders
let OrderDetails = models.orderdetails
let Payment = models.payments

exports.index = (req, res) => {
	Customer.findAll().then(result => {
		return res.status(200).send({
			success: 1,
			data: result
		})
	}).catch(err => {
		console.log(err)
		return res.status(400).send({ success: 0, data: "Bad Request" })
	})
}

exports.count = (req, res) => {
	Customer.count().then(result => {
		return res.status(200).send({
			success: 1,
			data: result
		})
	}).catch(err => {
		console.log("\n\n" + err + "\n\n")
		return res.status(400).send({ success: 0, data: "Bad Request" })
	})
}

exports.getById = (req, res) => {
	let customerNumber = parseInt(req.params.id)
	Customer.findAll({
		where: {
			customerNumber: customerNumber
		}
	}).then(result => {
		return res.status(200).send({
			success: 1,
			data: result
		})
	}).catch(err => {
		console.log(err)
		return res.status(400).send({ success: 0, data: "Bad Request" })
	})
}

exports.createCustomer = (req,res) => {
	return Customer.create(req.body).then((customer)=>{
		res.status(200).send({success:1,data:customer})
	}).catch((err)=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

exports.deleteCustomer = (req,res)=>{
	let customerNumber = parseInt(req.params.id)
	return Customer.destroy({
		where:{
			customerNumber: customerNumber
		}
	}).then((result)=>{
		res.status(200).send({success:result,data:result})
	}).catch((err)=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

exports.updateCustomer = (req,res)=>{
	let customerNumber = parseInt(req.params.id)
	return Customer.update(req.body,{
		where:{
			customerNumber:customerNumber
		}
	}).then((delta)=>{
		res.status(200).send({success:1,data:delta})
	}).catch((err)=>{
		res.status(400).send({success:2,data:"Bad Request"})
	})
}

exports.lastOrderDetails= (req,res)=>{
	let customerNumber = parseInt(req.params.id)
	Order.findOne({
		where:{customerNumber:customerNumber},
		order: sequelize.literal('orderDate desc')
	}).then(lastOrder=>{
		OrderDetails.findAll({where:{orderNumber:lastOrder.orderNumber}}).then(result=>{
			res.status(200).send({success:1,data:result})
		}).catch(err=>{
			res.status(400).send({success:0,data:"Bad Request"})
		})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

exports.lastOrder = (req,res)=>{
	let customerNumber = parseInt(req.params.id)
	Order.findOne({
		where:{customerNumber:customerNumber},
		order: sequelize.literal('orderDate desc')
	}).then(lastOrder=>{
		res.status(200).send({success:1,data:lastOrder})
	}).catch(err=>{
		res.status(400).send({success:0,data:"Bad Request"})
	})
}

//select customerNumber from customers where customerNumber 
//not in (select customerNumber from payments where year(paymentDate) = 2005 group by customerNumber);

exports.getCustomerWithoutPaymentInYear = async (req,res) =>{
	let paidinyear = await Payment.findAll({
		attributes:[
			"customerNumber"
		],
		where:[
			sequelize.where(sequelize.fn("year",sequelize.col("paymentDate")),parseInt(req.params.year))
		],
		group: "customerNumber"
	})

	res.send(paidinyear)
}