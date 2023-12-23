const createError = require('http-errors')

function notFoundHandler(req,res,next) {
    next(createError(404,'not found'))
}

function errorHandler(err, req , res ,next) {
    res.status(500).json({
        Error : err,
  
    })
}

module.exports={notFoundHandler,errorHandler};