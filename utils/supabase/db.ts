import { drizzle } from 'drizzle-orm/postgres-js'
// import { Pool } from 'pg';
import postgres from 'postgres'
// import * as dotenv from 'dotenv'
import * as schema from '../../migrations/schema'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
// dotenv.config({ path: '.env' })


declare global {
    var _db: any;
}
if (!process.env.DATABASE_URL) {
    console.log('No database URL')
}
const client = global._db || postgres(process.env.DATABASE_URL as string, {
    max: 10,
    idle_timeout: 5,
    connect_timeout: 10,
})

console.log("DSKALDKSALDAS THIS ISTH EENVRIONEMNT", process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
    global._db = client;
}

console.log("DATABASE URL", process.env.DATABASE_URL)

const db = drizzle(client, { logger: true })
const migrateDb = async () => {
    try {
        console.log('Migrating client')
        await migrate(db, { migrationsFolder: 'migrations' })
        console.log("Successfully Migrated")
    } catch (error) {
        console.log(error)
        console.log("Error Migrating client")
    }
}
// migrateDb()
export default db