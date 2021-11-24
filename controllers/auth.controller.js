const bcrypt = require("bcryptjs")
const userController = require('./users.controller')

module.exports.register = async (req,res)=>{
    const user = undefined;
    try{
        const hash = await bcrypt.hash(req.body.password,10)
        user = await userController.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        res.redirect("/login")
    }catch(e){
        res.redirect("/register")
    }
    console.log(user)
}

module.exports.renderRegister = (req,res)=>{
    res.render('register')
}

module.exports.login = (req,res)=>{
    res.json(req.body)
}

module.exports.renderLogin = (req,res)=>{
    res.render('login')
}

module.exports.checkAuthenitcated = (req,res,next)=>{
    if (req.isAuthenticated()) return next()
    res.redirect("/login")
}

module.exports.checkNotAuthenitcated = (req,res,next)=>{
    if (req.isAuthenticated()) return res.redirect('/api-docs')
    return next()
}

module.exports.logout = (req,res,next)=>{
    req.logOut()
    res.redirect('/login')
}