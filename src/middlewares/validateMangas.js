const joi = require('joi')

const MANGA =joi.object({
title:joi.string().required().min(2),
genre:joi.string().required().min(2),
cover_img:joi.string().required().min(2),
})

function validateMangas(req,res,next){
const {title,genre,cover_img}=req.body

const {error}=MANGA.validate({title,genre,cover_img})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validateMangas