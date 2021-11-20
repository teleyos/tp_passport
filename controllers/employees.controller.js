const sequelize = require('../config/db2.config')
let initModels = require('../services/init-models')
let models = initModels(sequelize)
let Customer = models.customers
let Employee = models.employees
let Payment = models.payments

exports.getCustomersFromEmploye = (req,res)=>{
	let EmployeeId = parseInt(req.params.id)
	Customer.findAll({
		where:{
			salesRepEmployeeNumber: EmployeeId
		}
	}).then(result=>{
		return res.status(200).send({success:1,data:result})
	}).catch(err=>{
		return res.status(400).send({success:0,data:"Bad Request"})
	})
}


//select salesRepEmployeeNumber,count(salesRepEmployeeNumber) as cnt 
//from customers where salesRepEmployeeNumber is not null 
//group by `salesRepEmployeeNumber` order by cnt desc;
exports.getBest2BasedOnClientCount = (req,res)=>{
	return Customer.findAll({
		attributes: ['salesRepEmployeeNumber',[sequelize.fn('count',sequelize.col('salesRepEmployeeNumber')),'clientNumber']],
		group: ['customers.salesRepEmployeeNumber'],
		raw: true,
		order: sequelize.literal('clientNumber desc'),
		limit: 2
	}).then(result=>{
		res.send({success:1,data:result})
	}).catch(err=>{
		res.send({success:0,data:"Bad Request"})
	})
}

exports.getBest2BasedOnMoney = async (req,res)=>{
	let customerMoney = await Payment.findAll({
		attributes: ['customerNumber',[sequelize.fn('sum',sequelize.col('amount')),'spent']],
		group: ['payments.customerNumber'],
		raw:true,
	})
	let l=[]
	for (let i=0;i<customerMoney.length;i++){
		let cust = await Customer.findOne({where:{customerNumber:customerMoney[i].customerNumber}})
		let nb =cust.dataValues.salesRepEmployeeNumber 
		if(l[nb]==undefined)l[nb]=0.0
		l[nb]+=parseFloat(customerMoney[i].spent)
	}
	let ret = []
	for (let o in l){
		ret.push([o,l[o]])
	}
	ret.sort((a,b)=>{
		return b[1]-a[1]
	})
	return res.status(200).send({success:1,data:ret.slice(0,2).map((a)=>{
		return {employeeNumber:a[0],moneyGenerated:a[1]}
	})})
}

exports.getEmployeeById = (req,res) => {
	let employeeNumber = parseInt(req.params.id)
	Employee.findAll({where:{employeeNumber:employeeNumber}}).then(result=>{
		return res.status(200).send({success:1,data:result})
	}).catch(err=>{
		return res.status(400).send({success:0,data:"Bad reqquest"})
	})
}

exports.getEmployeesReferingTo = (req,res) => {
	return Employee.findAll({where:{reportsTo:parseInt(req.params.id)}}).then(result=>{
		return res.status(200).send({success:1,data:result})
	}).catch(err=>{
		return res.status(400).send({success:0,data:"Bad reqquest"})
	})
}
