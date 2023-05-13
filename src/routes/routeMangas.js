const express = require('express')
const connection = require('../db/connection');
const validateMangas = require('../middlewares/validateMangas');
const route = express.Router();

route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM mangas');
    res.status(200).json(result);
});
route.post('/',validateMangas, async (req, res) => {
    const {title,genre,cover_img} = req.body;
    const [result] = await connection.execute('INSERT INTO mangas(title,genre,cover_img) VALUES(?,?,?)',[title,genre,cover_img])
   
    const newManga = {
        id:result.insertId,
        title,
        genre,
        cover_img
    }
    res.status(201).json(newManga);
})
route.put('/:id', validateMangas, async(req, res) => {
    const {title,genre,cover_img} = req.body;
    const {id} = req.params;

    const [[result]] = await connection.execute('SELECT * FROM mangas WHERE id =?',[id]);

    if(!result) {
        res.status(404).json({message:'Manga not found'})
    }

    const updateManga = connection.execute(`UPDATE mangas 
    SET title = ?, genre = ?, cover_img = ?
    WHERE id = ?`, [title,genre,cover_img, id])
    
    const newManga = {
        id,
        title,
        genre,
        cover_img
    }

    res.status(201).json(newManga);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    const [[result]] = await connection.execute('SELECT * FROM mangas WHERE id =?',[id]);

    if(!result) {
        res.status(404).json({message:'Manga '})
    }

    await connection.execute('DELETE FROM mangas WHERE id=?', [id])

    res.status(204).send();
})

route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM mangas WHERE id =?',[id]);
    res.status(200).json(result);
});
    module.exports = route;