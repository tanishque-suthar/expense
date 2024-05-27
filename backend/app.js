const dotenv = require("dotenv").config();
const express = require("express");
const {db} = require('./database/db');
const cors = require("cors");
const {readdirSync} = require('fs');
const cookieParser = require("cookie-parser");
const loginStuff = require('./routes/loginStuff');

const port = 3000;
const app = express();

app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(cookieParser());
// readdirSync('./routes').map((route)=>app.use(require('./routes/'+route)))
app.use(loginStuff);

const server = ()=>{
    db();
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

server();