const express = require('express');
const connectDb = require("./config/database");
const User = require("./models/user")
const app = express();

app.use(express.json());

app.post("/signup", async(req,res) => {

    console.log(req.body);
    


    // const userObj = {
    //     firstName: "Hola",
    //     lastName: "Amigo",
    //     emailId: "jelly@gmail.com",
    //     password:"abcd1234"
    // }

    // const user = new User(userObj);

    // const savedUser = await user.save();
    // console.log(savedUser);
    // res.send("User added successfully");
})

connectDb().then( () => {
    console.log("Database connection established successfully!!");
}).catch(err => {
    console.error("DB cannot be connected!");   
});

app.listen(3000, () => {
    console.log('Server is listening');
});
