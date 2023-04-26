const express = require('express');
const app = express();
const port = 8000;

// SETTING UP THE VIEW ENGINE 
app.set('view engine','ejs');
app.set('views','./views');

// SETTING UP THE STATIC DIRECTOPRY 
app.use(express.static('assets'));

// CONFIGURING THE ROUTES 
app.use('/',require('./routes/index'));

app.listen(port,err=>{
    if(err){
        console.log("Cannot connect to the server",err);
        return err;
    }
    console.log("Successfully connnected to the port at ",port);
})