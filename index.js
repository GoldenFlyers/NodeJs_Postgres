const express = require('express');
const app = express();
const port = 3000;
const pool = require('./db');
app.use(express.json());

//get all users

app.get('/users',async(req,res)=>{
    try {
       const allEmployee =await pool.query('SELECT * FROM Employee');
       res.json(allEmployee.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//get a user

//create a user

app.post('/users', async(req, res) => {
try {
    console.log(req.body);
    const {empname} =req.body;
    const users=await pool.query("INSERT INTO Employee (empname) VALUES($1) RETURNING *",[empname]);
    res.json(users);
} catch (err) {
    console.log(err.message);
}
});

//update a user

//delete a user

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
