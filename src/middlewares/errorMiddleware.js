
const errorMiddleware = (error,req,res,next) => {
    if(error.status){
        res.status(error.status).json({error:error.message})
    }
    console.log(error)
   res.status(500).json({message: "erro interno do servidor"}) 
}

module.exports = errorMiddleware;