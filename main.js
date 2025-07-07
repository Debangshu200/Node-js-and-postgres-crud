const {Client} = require('pg')
const express = require('express')

const app = express()

app.use(express.json())

const conn = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database:"demopost"
})

conn.connect()
    .then(()=> console.log("connected"))
    .catch(err => console.error("connection failed", err));

app.post('/postData', (req, res) => {
    const {name,id} = req.body

    const insert_query='INSERT INTO demotable (name, id) VALUES ($1,$2)'

    conn.query(insert_query, [name, id], (err, result)=> {
        if(err) {
            res.send(err)
        }else{
            console.log(result)
            res.send("POSTED DATA")
        }
    })
})

app.get('/fetchData', (req, res)=> {
    const fetch_query = "Select * from demotable"
    conn.query(fetch_query, (err,result)=>{
        if(err){
            res.send(err)
            console.error("fetch error",err)
        }else{
            res.send(result.rows)
        }
    })
})

app.listen(3000, ()=>{
    console.log("Server is running...")
})