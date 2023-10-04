import pg from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, } from '../config.js';
const { Pool } = pg;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Conectar a la base de datos
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }

  console.log('Conexión a la base de datos establecida');

  // Libera el cliente cuando hayas terminado
  done();
});

export { pool };

