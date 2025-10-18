

import db from '../config/db.js'

async function createSchoolTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS school (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100),
      contact BIGINT(20),
      address VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(100),
      image VARCHAR(300)
    );
  `;
  try {
    await db.query(createTableSQL);
    // console.log('✅ School table is ready');
  } catch (err) {
    console.error('❌ Error creating school table:', err.message);
  }
}

export default createSchoolTable;

