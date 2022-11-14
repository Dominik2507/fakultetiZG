
const express = require('express'); //Line 1
var bodyParser = require('body-parser')
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const pg = require('pg')
const session = require('express-session')
const db = require('./db')
const pgSession = require('connect-pg-simple')(session)

var jsonParser = bodyParser.json()



// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
//Line 11

//middleware - dekodiranje parametara
app.use(express.urlencoded({ extended: true }));

app.use(session({  //inicijalizira express-session middleware
    store: new pgSession({
        pool: db.pool
    }),
    resave: false,
    secret: "fakulteti", //služi za hash
    saveUninitialized: true
}))

/* app.use((req, res, next) => {  
    if (req.session.cart === undefined || req.session.cart.invalid) {
        req.session.cart = cart.createCart();
    }
    next();
}) */

app.get('/express_backend', (req, res) => { //Line 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
  }); 

app.get('/getFaks',async (req, res) => { //Line 9
    
    const sqlQuery = `SELECT * FROM fakultet;`;
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
    try {
        const resultFaks = (await db.query(sqlQuery, [])).rows;
        res.send({fakulteti: resultFaks});
    } catch (err) {
        console.log(err);
    } 
});

app.get('/getSmjer',async (req, res) => { //Line 9
    
    const sqlQuery = `SELECT * FROM smjer;`;
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
    try {
        const resultFaks = (await db.query(sqlQuery, [])).rows;
        res.send({smjerovi: resultFaks});
    } catch (err) {
        console.log(err);
    } 
});
app.get('/getFaksWithSmjers',async (req, res) => { //Line 9
    
    const sqlQuery = `SELECT fakultet.id as faksId, 
                fakultet.ime,
                adresa,
                dekan,
                eadresa,
                faks,
                telefon,
                webadresa,smjer.* FROM fakultet left join smjer on fakultet.id=smjer.fakultetId;`;
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
    try {
        const resultFaks = (await db.query(sqlQuery, [])).rows;
        res.send({fakulteti: resultFaks});
    } catch (err) {
        console.log(err);
    } 
});
app.get('/getFaksWithSmjersJSON',async (req, res) => { //Line 9
    
    const sqlQuery = `SELECT json_agg(row_to_json(fakultetsmjerjson)) as fakulteti
    FROM fakultetsmjerjson`;
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
    try {
        const resultFaks = (await db.query(sqlQuery, [])).rows[0];
        res.send(resultFaks);
    } catch (err) {
        console.log(err);
    } 
});

app.post("/createCSVFile",jsonParser, async (req, res) =>{
    
    const dataColumns=[
        "ime",
        "adresa",
        "dekan",
        "eadresa",
        "faks",
        "telefon",
        "webadresa",
        "id",
        "imestudija",
        "razinastudija",
        "brojsemestara",
        "nacinizvedbe",
        "akgodina",
        "fakultetid"
    ]
    let filter=req.body.filter;
    let filterOption=req.body.filterOption;
    if(filterOption==="faksid") filterOption="id";
    let filterLines="";

    if(filterOption==="wildcard"){
        for(let column of dataColumns){
            filterLines += "UPPER(" + column+" ::TEXT)" + " LIKE " + "'%" +filter.toUpperCase()+"%'" + " OR ";
        }
        filterLines += "false"
    }else filterLines += "UPPER(" + filterOption + " :: TEXT) " + " LIKE " + "'%" +filter.toUpperCase()+"%'";
    
    let upit=`SELECT * FROM fakultet left join smjer on id=fakultetId WHERE ${filterLines}`;
    const sqlQuery = `COPY (${upit}) TO 'D:/otvarac/fakultetiZG/client/public/naziv.csv' DELIMITER ',' CSV HEADER;`;
    
    console.log(sqlQuery)
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
    
    try {
        const resultFaks = (await db.query(sqlQuery, []));
        res.send(resultFaks);
    } catch (err) {
        console.log(err);
    }  

})

app.post("/createJSONFile",jsonParser, async (req, res) =>{
    const dataColumns=[
        "ime",
        "adresa",
        "dekan",
        "eadresa",
        "faks",
        "telefon",
        "webadresa",
        "id"
    ]

    let filter=req.body.filter;
    let filterOption=req.body.filterOption;
    if(filterOption==="faksid") filterOption="id";
    let filterLines="";
    let filterLines2="";
    let filterLines3=""

    if(filterOption==="wildcard"){
        for(let column of dataColumns){
            filterLines += "UPPER(" + column+" ::TEXT)" + " LIKE " + "'%" +filter.toUpperCase()+"%'" + " OR ";
        }
        filterLines2+=`UPPER(smjerovi ::TEXT)  LIKE '%"%":"%${filter.toUpperCase()}%"%'`
        filterLines3+=" false"
    }else {
        if(dataColumns.includes(filterOption)){
            filterLines += "UPPER(" + filterOption+" ::TEXT)" + " LIKE " + "'%" +filter.toUpperCase()+"%' OR";
            filterLines2 +="false"
        }else{
            filterLines2 += `UPPER(smjerovi ::TEXT)  LIKE '%"${(filterOption).toUpperCase()}":%${filter.toUpperCase()}%'`;
            filterLines3+= "true";
        }
    }
    
    let upit=`
    DROP VIEW IF EXISTS filteredView2;
    DROP VIEW IF EXISTS filteredView;
    Create view filteredView as (
        SELECT fakultet.*, (SELECT json_agg(row_to_json(smjer)) FROM SMJER where smjer.fakultetId=fakultet.id ) as smjerovi
        FROM fakultet
        WHERE ${filterLines} ${filterLines3}
    );
    Create view filteredView2 as (
        SELECT filteredView.*
        FROM filteredView
        WHERE ${filterLines} ${filterLines2}
    );
    COPY (SELECT json_agg(row_to_json(filteredView2)) FROM filteredView2 ) TO 'D:/otvarac/fakultetiZG/client/public/naziv.json';
    `;
    const sqlQuery = `${upit}`;
    
    console.log(sqlQuery)
    
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
    
    try {
        const resultFaks = (await db.query(sqlQuery, []));
        res.send(resultFaks);
    } catch (err) {
        console.log(err);
    }  

})

  /*
//uvoz modula
const express = require('express');
const app = express();
const pg = require('pg')
const session = require('express-session')
const db = require('./db')
const pgSession = require('connect-pg-simple')(session)
const path = require('path');

const cart = require('./models/CartModel')

//uvoz modula s definiranom funkcionalnosti ruta
const homeRouter = require('./routes/home.routes');
const loginRoute = require('./routes/login.routes');
const logoutRoute = require('./routes/logout.routes');
const signupRoute = require('./routes/signup.routes');
const checkoutRoute = require('./routes/checkout.routes');
const cartRoute = require('./routes/cart.routes');
const orderRouter = require('./routes/order.routes');
const userRoute = require('./routes/user.routes');
const viewRoute = require('./routes/on-site.routes');

//middleware - predlošci (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware - statički resursi
app.use(express.static(path.join(__dirname, 'public')));



//####################### ZADATAK #######################

//pohrana sjednica u postgres bazu korštenjem connect-pg-simple modula

//#######################################################
*/