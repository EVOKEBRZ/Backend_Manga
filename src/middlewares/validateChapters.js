const joi = require('joi')

const CHAPTER =joi.object({
title:joi.string().required().min(2),
chapter_number:joi.number().required(),
id_manga:joi.number().required(),
})

function validateChapters(req,res,next){
const {title,chapter_number,id_manga}=req.body

const {error}=CHAPTER.validate({title,chapter_number,id_manga})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validateChapters