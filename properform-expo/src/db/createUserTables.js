import { db } from './db.js';

export async function createUserTables() {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      uid INT AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(50) NOT NULL,
      birthdate DATE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      weight FLOAT,
      height FLOAT,
      gender ENUM('male', 'female', 'other', 'not specified') DEFAULT 'not specified',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createInterestsTable = `
    CREATE TABLE IF NOT EXISTS interests (
      iid INT AUTO_INCREMENT PRIMARY KEY,
      interest VARCHAR(50) NOT NULL UNIQUE
    );
  `;

  const createUserHasInterestTable = `
    CREATE TABLE IF NOT EXISTS user_has_interest (
      uid INT,
      iid INT,
      PRIMARY KEY (uid, iid),
      FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
      FOREIGN KEY (iid) REFERENCES interests(iid) ON DELETE CASCADE
    );
  `;

  const queries = [
    {
      name: 'users',
      sql: `    
      CREATE TABLE IF NOT EXISTS users (
        uid INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        birthdate DATE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        weight FLOAT,
        height FLOAT,
        gender ENUM('male', 'female', 'other', 'not specified') DEFAULT 'not specified',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `,
    },
    {
      name: 'interests',
      sql: `
      CREATE TABLE IF NOT EXISTS interests (
        iid INT AUTO_INCREMENT PRIMARY KEY,
        interest VARCHAR(50) NOT NULL UNIQUE
      );
      `,
    },
    {
      name: 'user_has_interest',
      sql: `
      CREATE TABLE IF NOT EXISTS user_has_interest (
        uid INT,
        iid INT,
        PRIMARY KEY (uid, iid),
        FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
        FOREIGN KEY (iid) REFERENCES interests(iid) ON DELETE CASCADE
      );
      `,
    },
  ];

  try {
    for (const { name, sql } of queries) {
      await db.execute(sql);
      console.log(`✅ Table '${name}' created or already exists.`);
    }
  } catch (err) {
    console.error('❌ Error creating Users table:', err.message);
  }
}
