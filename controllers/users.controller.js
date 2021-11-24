const sequelize = require('../config/db2.config')
let initModels = require('../services/init-models')
let models = initModels(sequelize)
let User = models.users

module.exports.create = (o) => {
    return User.create(o)
}

module.exports.getByEmail = (email) => {
    return User.findOne({where:{
        email:email
    }})
}

module.exports.getById = (id) => {
    return User.findOne({where:{
        id:id
    }})
}