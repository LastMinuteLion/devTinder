const express = require('express');
const connectDb = require('./config/database');
const cookieParser = require("cookie-parser");
const errorMiddleware = require('./middlewares/error');
const notfoundMiddleware = require('./middlewares/noRouteFound');
const { AsyncHandler, ErrorHandler } = require('./utils/handlers');
const { port } = require('./config/config');

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
// app.use("/api/profile", profileRouter);
// app.use("/api/request", requestRouter);
// app.use("/api/user", userRouter);
// app.use("/api/health", healthRouter);
// app.use("/api/message", messageRouter);

app.use(notfoundMiddleware);
app.use(errorMiddleware);

const startServer = async () => {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log(`🚀 Server is running on PORT ${port}`);
        });
    } catch (err) {
        console.error('❌ Server failed to start:', err);
    }
};

startServer();
