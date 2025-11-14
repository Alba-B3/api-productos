import { connection } from "../db.js";

// Obtener todos
export const getProductos = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM productos');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

// Obtener uno
export const getProductoById = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener producto" });
    }
};

// Crear
export const createProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;
        const [result] = await connection.query(
            'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)',
            [nombre, descripcion, precio]
        );
        res.status(201).json({ id: result.insertId, nombre, descripcion, precio });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al crear producto" });
    }
};

// Actualizar
export const updateProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;
        await connection.query(
            'UPDATE productos SET nombre=?, descripcion=?, precio=? WHERE id=?',
            [nombre, descripcion, precio, req.params.id]
        );
        res.json({ message: "Producto actualizado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al actualizar producto" });
    }
};

// Eliminar
export const deleteProducto = async (req, res) => {
    try {
        await connection.query('DELETE FROM productos WHERE id=?', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al eliminar producto" });
    }
};