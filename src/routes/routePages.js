const express = require('express')
const connection = require('../db/connection');
const validatePages = require('../middlewares/validatePages')
const route = express.Router();

route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM pages');
    res.status(200).json(result);
});
route.post('/', validatePages, async (req, res) => {
    const {page_number,img,chapter_id} = req.body;
    const [result] = await connection.execute('INSERT INTO pages(page_number,img,chapter_id) VALUES(?,?,?)',[page_number,img, chapter_id])
   
    const newManga = {
        id:result.insertId,
        page_number,
        img,
        chapter_id
    }

    res.status(201).json(newManga);
})
route.put('/:id', validatePages, async(req, res) => {
    const {page_number,img} = req.body;
    const {id} = req.params;

    const [[result]] = await connection.execute('SELECT * FROM pages WHERE id =?',[id]);

    if(!result) {
        res.status(404).json({message:'Page not found'})
    }

    const updatePagina = connection.execute(`UPDATE pages 
    SET page_number = ?, img = ?
    WHERE id = ?`, [page_number,img, id])

    const newPage = {
        id,
        page_number,
        img
    }

    res.status(201).json(newPage);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    const [[result]] = await connection.execute('SELECT * FROM pages WHERE id =?',[id]);

    if(!result) {
        res.status(404).json({message:'Page not found'})
    }

    await connection.execute('DELETE FROM pages WHERE id=?', [id])

    res.status(204).send();
})
route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM pages WHERE id =?',[id]);
    if(!result) {
        res.status(404).json({message:'Page not found'})
    }
    res.status(200).json(result);
});

    module.exports = route;