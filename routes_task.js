const express = require('express')
const tarea = express.Router()

//Rutas para las tareas
tarea.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM tarea', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
 })

tarea.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT tareas.tarea, usuario.nombre, usuario.primer_apellido, status.status FROM tarea tareas INNER JOIN usuarios usuario ON usuario.id_tarea_usuario = tareas.id_tarea_usuario INNER JOIN status status on status.idstatus = tareas.status WHERE tareas.id_tarea_usuario = ? and tareas.status = 1', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
 })

 tarea.get('/buscar/:palabra', (req, res) => {
    const palabra = req.params.palabra; // Cambié el nombre de la variable

    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        const query = 'SELECT * FROM tarea WHERE tarea LIKE ?';

        conn.query(query, [`%${palabra}%`], (err, rows) => { // Usé el nuevo nombre de la variable
            if (err) return res.send(err);

            res.json(rows);
        });
    });
});

tarea.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO tarea set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('success')
        })
    })
 })

tarea.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('DELETE FROM tarea WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('task excluded')
        })
    })
 })

tarea.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE tarea set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Task updated!')
        })
    })
 })


module.exports = tarea