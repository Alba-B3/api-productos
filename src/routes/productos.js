import { Router } from 'express';
import { connection } from '../db.js';

const router = Router();

// Obtener todos los productos
router.get('/productos', async (req, res) => {
    const [rows] = await connection.query('SELECT * FROM productos');
    res.json(rows);
});

// Obtener un producto por ID
router.get('/productos/:id', async (req, res) => {
    const [rows] = await connection.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    if (rows.length <= 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(rows[0]);
});

// Crear nuevo producto
router.post('/productos', async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    const [result] = await connection.query(
        'INSERT INTO productos(nombre, descripcion, precio) VALUES (?, ?, ?)',
        [nombre, descripcion, precio]
    );
    res.json({ id: result.insertId, nombre, descripcion, precio });
});

// Actualizar producto
router.put('/productos/:id', async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    await connection.query(
        'UPDATE productos SET nombre=?, descripcion=?, precio=? WHERE id=?',
        [nombre, descripcion, precio, req.params.id]
    );
    res.json({ message: 'Producto actualizado' });
});

// Eliminar producto
router.delete('/productos/:id', async (req, res) => {
    await connection.query('DELETE FROM productos WHERE id=?', [req.params.id]);
    res.json({ message: 'Producto eliminado' });
});

export default router;