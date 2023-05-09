const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const cors = require('cors');

const user = require('./components/user/index');

const app = express();
const port = 8001;

var path = require('path');

app.use(function(req, res, next) {
 res.header('Access-Control-Allow-Origin', req.headers.origin);
 res.header('Access-Control-Allow-Credentials', true);
 res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
 next();   
    
})

app.use(
    cors({origin: ["http://localhost:3001"]})
)

app.use(cookieParser("SOME SECRETS CANT BE SHARED"))

const fiveDays = 5 * 24 * 60 * 60 * 1000

app.use(sessions({
    secret: "somesecretkeyasdfasdfag",
    saveUninitialized: true,
    cookie: {maxAge: fiveDays},
    resave: false
}))

app.use(express.static(path.resolve('./components/public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//user api calls
app.use("/user", user)

app.get('/', (req, res) => {
    res.send("Live! Working")
})

app.listen(port, () => {
    console.log(`Backend is live on port ${port}`);
})