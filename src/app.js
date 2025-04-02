const express = require('express');

const app = express();

app.get("/test",(req,res) => {
    res.send("Helo from Server")
})

app.use("/test",(req,res) => {
    res.send("Helo from Server")
})

app.listen(3000, () => {
    console.log('Server is listening');
    
});
