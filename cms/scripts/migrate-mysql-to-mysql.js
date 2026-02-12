/**
 * Script to migrate data from MySQL (local) to MySQL (cPanel)
 *
 * Usage:
 * 1. Make sure both databases are accessible
 * 2. Set environment variables for both databases in .env
 * 3. Run: node scripts/migrate-mysql-to-mysql.js
 */

require('dotenv').config();

const mysql = require('mysql2/promise');

// MySQL connection (source - local)
const sourceConfig = {
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  user: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'itadvisors_cms',
  multipleStatements: true,
};

console.log('🔍 DEBUG: Source (local) config:', {
  host: sourceConfig.host,
  port: sourceConfig.port,
  user: sourceConfig.user,
  database: sourceConfig.database,
});

// MySQL connection (target - cPanel)
const targetConfig = {
  host: process.env.TO_DATABASE_HOST,
  port: parseInt(process.env.TO_DATABASE_PORT || '3306'),
  user: process.env.TO_DATABASE_USERNAME,
  password: process.env.TO_DATABASE_PASSWORD,
  database: process.env.TO_DATABASE_NAME,
  multipleStatements: true,
};

console.log('🔍 DEBUG: Target (remote) config:', {
  host: targetConfig.host,
  port: targetConfig.port,
  user: targetConfig.user,
  database: targetConfig.database,
});

async function migrate() {
  console.log('\n🚀 Starting MySQL (local) → MySQL (remote) migration...\n');

  let sourceConnection;
  let targetConnection;

  try {
    // Connect to source MySQL (local)
    console.log('📡 Connecting to source MySQL (local)...');
    sourceConnection = await mysql.createConnection(sourceConfig);
    console.log('✅ Connected to source MySQL\n');

    // Connect to target MySQL (remote)
    console.log('📡 Connecting to target MySQL (remote)...');
    targetConnection = await mysql.createConnection(targetConfig);
    console.log('✅ Connected to target MySQL\n');

    // Get all tables from source
    const [tables] = await sourceConnection.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ? 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `, [sourceConfig.database]);

    const allTables = tables.map(row => row.TABLE_NAME || row.table_name);
    console.log(`📋 Found ${allTables.length} tables in source database\n`);

    // Disable foreign key checks on target
    await targetConnection.query('SET FOREIGN_KEY_CHECKS = 0');
    console.log('🔓 Disabled foreign key checks on target\n');

    // Migrate each table
    for (const tableName of allTables) {
      console.log(`📦 Migrating table: ${tableName}`);

      // Get row count
      const [[countResult]] = await sourceConnection.query(`SELECT COUNT(*) as count FROM \`${tableName}\``);
      const rowCount = countResult.count;
      console.log(`   Rows: ${rowCount}`);

      if (rowCount === 0) {
        console.log(`   ⏭️  Skipping (empty table)\n`);
        continue;
      }

      // Fetch all data from source
      const [rows] = await sourceConnection.query(`SELECT * FROM \`${tableName}\``);

      if (rows.length === 0) {
        console.log(`   ⏭️  No data to migrate\n`);
        continue;
      }

      // Clear existing data in target
      try {
        await targetConnection.query(`DELETE FROM \`${tableName}\``);
      } catch (err) {
        console.log(`   ⚠️  Could not clear table (may not exist): ${err.message}`);
        continue;
      }

      // Insert data in batches
      const batchSize = 100;
      let inserted = 0;

      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        
        for (const row of batch) {
          const columns = Object.keys(row);
          const values = Object.values(row).map(val => {
            if (val === null) return null;
            if (typeof val === 'object' && !(val instanceof Date)) return JSON.stringify(val);
            if (typeof val === 'boolean') return val ? 1 : 0;
            return val;
          });

          const placeholders = values.map(() => '?').join(', ');
          const columnNames = columns.map(c => `\`${c}\``).join(', ');

          try {
            await targetConnection.query(
              `INSERT INTO \`${tableName}\` (${columnNames}) VALUES (${placeholders})`,
              values
            );
            inserted++;
          } catch (err) {
            console.log(`\n   ⚠️  Error inserting row: ${err.message}`);
          }
        }

        process.stdout.write(`\r   Inserted: ${inserted}/${rows.length}`);
      }

      console.log(`\n   ✅ Migrated ${inserted} rows\n`);
    }

    // Re-enable foreign key checks
    await targetConnection.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('🔒 Re-enabled foreign key checks\n');

    console.log('✅ Migration completed successfully! 🎉');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    if (sourceConnection) await sourceConnection.end();
    if (targetConnection) await targetConnection.end();
    console.log('\n📡 Connections closed');
  }
}

migrate().catch(console.error);

