import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'


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

if (process.env.NODE_ENV !== 'production') {
    global._db = client;
}

const db = drizzle(client, {})
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