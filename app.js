require('dotenv').config()
const express = require('express');
const faker = require('faker');
const mysql = require('mysql');
const app = express();

app.set('view engine', 'ejs');
//creates a connection to the mySQL database
let connection = mysql.createConnection(
{
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});


app.get('/', (req, res) =>
{
	// find number of users
	const query = 'SELECT COUNT(*) AS count FROM users';
	connection.query(query, (error, results, fields) =>
	{
		if(error) throw error;
		const numUsers = results[0].count;
		// Respond with total
		res.send(`we have ${numUsers} users`);
	})
})


app.listen(3000, ()=>
{
	console.log("App is listening on 3000");
})