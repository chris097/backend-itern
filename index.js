const csv = require('csv-parser')
const fs = require('fs')
const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const user = []

fs.createReadStream('data.csv')
.pipe(csv({}))
.on('data', (data) => user.push(data))
.on('end', () => {
    console.log(user)
})


app.get('/api/csv', (req, res) =>{
    res.send(user)
})

app.post('/api/csv', (req, res) => {

    const schema = {
        firstName: Joi.string().min(5).required(),
        lastName: Joi.string().min(5).required(),
        age: Joi.number().min(2).required()
    }
    const result = Joi.validate(req.body, schema)

    if(result.error){
       return res.status(400).send(result.error.details[0].message)
    }

    const item = {
        conversional_key: user.length + 1,
        json:[
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
        }
        ]
    };
    user.push(item);
    res.send(item)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))