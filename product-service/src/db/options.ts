import {ClientConfig} from "pg";

const {
    PG_HOST,
    PG_DATABASE,
    PG_PORT,
    PG_USER,
    PG_PASSWORD
} = process.env;

const options: ClientConfig = {
    host: PG_HOST,
    port: Number(PG_PORT),
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD,
    ssl: {
        // to avoid warning
        rejectUnauthorized: false
    },
    // connectionTimeoutMillis: 5000
}


export default options;
