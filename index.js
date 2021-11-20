const express = require("express");
const app = express();
//later
const bodyParser = require("body-parser");
//ADD Routers
const customersRoutes = require("./routes/customers.routes")
const employeesRoutes = require("./routes/employees.routes")
const officesRoutes = require("./routes/offices.routes")
const ordersRoutes = require("./routes/orders.routes")
const productLinesRoutes = require("./routes/prodcutLines.routes")
const paymentsRoutes = require("./routes/payments.routes")
const productsRoutes = require("./routes/products.routes")
//ADD SWAGGER MODULES
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//ADD dotenv
const dotenv = require("dotenv");
dotenv.config();


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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/** Swagger Initialization - END */

app.use("/customers",customersRoutes)
app.use("/employees",employeesRoutes)
app.use("/offices",officesRoutes)
app.use("/orders",ordersRoutes)
app.use("/productlines",productLinesRoutes)
app.use("/payments",paymentsRoutes)
app.use("/products",productsRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Le serveur ecoute sur le port ${process.env.PORT}`);
});




