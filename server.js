const express = require('express');
const app = express();

app.get('/', function(req, res) {
	res.send('Welcome to Passport with Sequelize');
});

app.listen(3000, function(err) {
	if (!err)console.log("Le serveur ecoute sur le port 3000");
	else console.log(err)
});
