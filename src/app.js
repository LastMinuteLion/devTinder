const express = require('express');
const connectDb = require('./config/database');
const cookieParser = require("cookie-parser");
const errorMiddleware = require('./middlewares/error');
const notfoundMiddleware = require('./middlewares/noRouteFound');
const { AsyncHandler, ErrorHandler } = require('./utils/handlers');
// Routers
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
// const userRouter = require('./routes/user');
const healthRouter = require('./routes/health');
// const messageRouter = require('./routes/message');




const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/request", requestRouter);
app.use("/api/user", userRouter);
app.use("/api/health", healthRouter);
app.use("/api/message", messageRouter);

app.use(notfoundMiddleware);
app.use(errorMiddleware);

connectDb()
    .then(() => {
        console.log('✅ Database connection established successfully!');
        app.listen(3000, () => {
            console.log('🚀 Server is running on PORT 3000');
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect to the database:', err);
    });
