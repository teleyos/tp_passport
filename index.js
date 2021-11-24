const express = require("express");
const app = express();
const passport = require("passport")
//later
const bodyParser = require("body-parser");
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require("method-override")
//ADD Routers
const customersRoutes = require("./routes/customers.routes")
const employeesRoutes = require("./routes/employees.routes")
const officesRoutes = require("./routes/offices.routes")
const ordersRoutes = require("./routes/orders.routes")
const productLinesRoutes = require("./routes/prodcutLines.routes")
const paymentsRoutes = require("./routes/payments.routes")
const productsRoutes = require("./routes/products.routes")
const authController = require("./controllers/auth.controller")
const passportController = require("./controllers/passport.controller")
const userController = require("./controllers/users.controller")
//ADD SWAGGER MODULES
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//ADD dotenv
const dotenv = require("dotenv");
dotenv.config();

passportController.initialisePassport(passport)

app.use(flash())
app.use(session({
    secret: process.env.SECRET_TOKEN,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Static Files
app.use(express.static('public'))
app.use('/img', express.static(__dirname + 'public/img'))
// Templating Engine
app.set('views', './views')
app.set('view engine', 'ejs')
//enable CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


//later (this is a middleware)
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "Partiel Web Back End",
            description: "API documentation",
            contact: {
                name: "Tristan Duret",
            },
            servers: [`http://localhost:${process.env.PORT}/`],
        },
    }),
    apis: ["index.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs",authController.checkAuthenitcated ,swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/** Swagger Initialization - END */

app.use("/customers",authController.checkAuthenitcated,customersRoutes)
app.use("/employees",authController.checkAuthenitcated,employeesRoutes)
app.use("/offices",authController.checkAuthenitcated,officesRoutes)
app.use("/orders",authController.checkAuthenitcated,ordersRoutes)
app.use("/productlines",authController.checkAuthenitcated,productLinesRoutes)
app.use("/payments",authController.checkAuthenitcated,paymentsRoutes)
app.use("/products",authController.checkAuthenitcated,productsRoutes)

app.get("/login",authController.checkNotAuthenitcated,authController.renderLogin)
app.post("/login",authController.checkNotAuthenitcated,passport.authenticate('local',{
    successRedirect: "/api-docs",
    failureRedirect: "/login",
    failureFlash: true
}))
app.get("/register",authController.checkNotAuthenitcated,authController.renderRegister)
app.post("/register",authController.checkNotAuthenitcated,authController.register)
app.get("/logout",authController.checkAuthenitcated,authController.logout)


app.listen(process.env.PORT,()=>{
    console.log(`Le serveur ecoute sur le port ${process.env.PORT}`);
});




