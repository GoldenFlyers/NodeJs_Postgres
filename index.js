const express = require('express');
const app = express();
const port = 3000;
const pool = require('./db');
app.use(express.json());

//get all users

app.get('/users', async (req, res) => {
    try {
        const allEmployee = await pool.query('SELECT * FROM Employee');
        res.json(allEmployee.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//get a user

app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const allEmployee = await pool.query('SELECT * FROM Employee WHERE emp_id=$1',[id]);
        res.json(allEmployee.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//create a user

app.post('/users', async (req, res) => {
    try {
        console.log(req.body);
        const { empname } = req.body;
        const users = await pool.query("INSERT INTO Employee (empname) VALUES($1) RETURNING *", [empname]);
        res.json(users);
    } catch (err) {
        console.log(err.message);
    }
});

//update a user

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { empname } = req.body;
        const allEmployee = await pool.query('UPDATE Employee SET empname=$2 WHERE emp_id=$1',[id,empname]);
        res.json('Employee name is updated');
    } catch (error) {
        console.log(error.message);
    }
});

//delete a user

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const allEmployee = await pool.query('DELETE from  Employee WHERE emp_id=$1',[id]);
        res.json('Employee Deleted !');
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
