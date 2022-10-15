/*
const lista = [ //Array 
    "Douglas",
    "Maria",
    "Enço"
];
console.log(lista);
lista.push("Guilherme");
console.log(lista);

for(let i =o;i =lista.length;i++){
    console.log(lista[i]);
}


for(const a of lista){
     console.log(a);
}


lista.forEach(element =>(console.log(element))); declarando uma função para o for

const a =(element) =>{
    console.log(element);
}
lista.forEach(a);
*/
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const md5 = require('md5');
const jwt =require('jsonwebtoken')//com ele é possivel gerar tokens e verificar tokens
const SECRET = 'thomastools';
const port = 3007;
const cors = require('cors')

const corsOptions = {
    origin : '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bodyparser.json())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//----------------------------------------------------------------------rota de cadastrado de usuário------------/user
app.post('/user',(req, res)=>{
    console.log(req.body.name)
    res.send(req.body);
    const mysql = require('mysql');
    const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "guilhermemeiring"
   })
   con.connect(function(err) {
       if (err) throw err;
       console.log("Connected!");
       const sql = "INSERT INTO guilhermemeiring.user (iduser, name, cpf, password, status) VALUES ("+req.body.iduser+",'"+req.body.name+"',"+req.body.cpf+",'"+md5(req.body.senha)+"',"+req.body.status+")";
       con.query(sql, function (err, result) {
           if (err) throw err;
          console.log("1 record inserted");
        });
    });
 });

 //----------------------------------------------------------------rota de login---------------------------/login
const execSQL = (sql2) => {
    return new Promise((resolve, reject) => {
      const mysql = require('mysql');
      const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "guilhermemeiring"
  
    })
    con.connect((error) => {
        if (error){
            reject(error);
            return;
        }
        con.query(sql2, (error, result) => {
            if (error){
                 reject(error);
                return;
            }
            console.log("Connected!");
            con.destroy();
            console.log(result)
            resolve(result);
            })
        })
    })
}
app.post('/login', async (req, res) => {
    const cpf  = req.body.cpf;
    const pass = md5(req.body.password);
    const sql2 = `select * from guilhermemeiring.user where user.cpf = '${cpf}' and password = '${pass}' and status = 1`;
    const result = await execSQL(sql2);
    if (result == undefined || result.length == 0){
        res.status(401);
        res.end();
        return;
    }
    const token = jwt.sign({iduser: result[0].iduser}, SECRET, {expiresIn: 300})
    res.json({ auth: true, token});
});

//------------------------------------------------------rota listar clientes-----------------------------------/Clientes
function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
    if(err) return res.status(401).end();
    
    req.cpf = decoded.cpf
    next()
})}


app.get('/clientes', verifyJWT, (req, res) => {
    const mysql = require('mysql');
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "guilhermemeiring"
    })
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("SELECT * FROM guilhermemeiring.user", (err, result) => {
           if (!err) {
            res.json(result);
        } else {
           res.json({error : true});
        }
        connection.destroy();
        })
    })
});

/*

const md5 = require('md5')
  
var password = '2005'
  
console.log('Normal password : ', password)
console.log('Hashed password : ', md5(password))

*/
