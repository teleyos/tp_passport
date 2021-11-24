const LocalStrategy = require("passport-local").Strategy
const userController = require('./users.controller')
const bcrypt = require("bcryptjs")

module.exports.initialisePassport = (passport)=>{
    const authenticateUser = async (email, password, done)=>{
        const user = await userController.getByEmail(email)
        if (user == null) {
            return done(null, false, {message: "No user with that email"})
        }

        try {
            if (await bcrypt.compare(password,user.password)){
                return done(null,user)
            }else{
                return done(null,false,{message:'Password incorrect'})
            }
        }catch(e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user,done)=> {
        return done(null,user.id)
    })
    passport.deserializeUser(async (id,done)=> {
        const user = await userController.getById(id)
        if(user == null) return done(null,false,"No user with that id")
        return done(null,user)
    })
}
