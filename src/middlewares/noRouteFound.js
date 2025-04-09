const notfoundMiddleware = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Oops! Route not found"
    });
};

module.exports = notfoundMiddleware;
