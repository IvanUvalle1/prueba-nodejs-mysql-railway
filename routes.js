const express = require('express')
const routes = express.Router()

//Rutas para los usuarios
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM usuarios', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
 })

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO usuarios set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('success')
        })
    })
 })

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('DELETE FROM usuarios WHERE idusuarios = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('user excluded')
        })
    })
 })

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE usuarios set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('user updated!')
        })
    })
 })

module.exports = routes