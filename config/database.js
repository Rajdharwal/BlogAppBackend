const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("db connection successfully");
    })
    .catch((error)=>{
        console.log("db connection issue");
        console.log(error);
        process.exit(1);
        
    })

}

module.exports = dbconnect;