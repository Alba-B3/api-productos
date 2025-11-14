// migrate.js
import { connection } from './src/db.js';

const createTable = `
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL
);
`;

const seedData = `
INSERT INTO productos (nombre, descripcion, precio) VALUES
('Taza Kawaii', 'Taza con diseño adorable', 9.99),
('Libreta A5', 'Libreta de papel reciclado', 4.50),
('Bolígrafo Azul', 'Bolígrafo de tinta gel', 1.20),
('Mochila Escolar', 'Mochila resistente de 20L', 25.00),
('Auriculares Bluetooth', 'Auriculares inalámbricos con micrófono', 39.99)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);  -- evita duplicados
`;

async function migrate() {
    try {
        // Crear tabla
        await connection.query(createTable);
        console.log('Tabla productos creada o ya existía.');

        // Insertar datos
        await connection.query(seedData);
        console.log('Datos de ejemplo insertados.');

        process.exit(0); // cerrar conexión
    } catch (error) {
        console.error('Error en migración:', error);
        process.exit(1);
    }
}

migrate();