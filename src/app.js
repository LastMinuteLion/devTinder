const express = require('express');

const app = express();

app.use("/test",(req,res) => {
    res.send("Helo from Server")
})

app.listen(3000, () => {
    console.log('Server is listening');
    
});
