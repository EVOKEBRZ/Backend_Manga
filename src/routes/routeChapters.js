const express = require('express')
const connection = require('../db/connection');
const validateChapters = require('../middlewares/validateChapters')

const route = express.Router();

route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM chapters');
    res.status(200).json(result);
});
route.post('/',validateChapters, async (req, res) => {
    const {title,chapter_number,id_manga} = req.body;
    const [result] = await connection.execute('INSERT INTO chapters(title,chapter_number,id_manga) VALUES(?,?,?)',[title,chapter_number,id_manga])
   
    const newChapter = {
        id:result.insertId,
        title,
        chapter_number,
        id_manga
    }
    res.status(201).json(newChapter);
})
route.put('/:id', validateChapters, (req, res) => {
    const {title,chapter_number,id_manga} = req.body;
    const {id} = req.params;

    const updateManga = connection.execute(`UPDATE chapters 
    SET titulo = ?, chapter_number = ?, id_manga = ?
    WHERE id = ?`, [title,chapter_number,id_manga, id])

    const newManga = {
        id,
        title,
        chapter_number,
        id_manga
    }

    res.status(201).json(newManga);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    await connection.execute('DELETE FROM chapters WHERE id=?', [id])

    res.status(204).send();
})
route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM chapters WHERE id =?',[id]);
    res.status(200).json(result);
});


    module.exports = route;