const joi = require('joi')

const PAGE =joi.object({
page_number:joi.number().required(),
img:joi.string().required().min(2),
chapter_id:joi.number().required(),
})

function validatePages(req,res,next){
const {page_number,img,chapter_id}=req.body

const {error}=PAGE.validate({page_number,img,chapter_id});

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validatePages