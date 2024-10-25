import { createConnection } from 'mysql2'
import second from 'mysql2/promise'

createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: 3307,
})