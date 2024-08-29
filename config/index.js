import { createPool } from "mysql2/promises";
import 'dotenv/config'

export let db = createPool({
    host: process.env.DBhost,
    user: process.env.DBuser,
    password: process.env.DBpassword,
    database: process.env.DBname,
    multipleStatements: true,
    dbLimit: 30,
})
db.on('db', (pool) => {
    if (!pool) throw new Error('Could not connect to the database, please try again later')
})
