import {Client} from "pg";

import options from "./options";
import {logger} from "../helpers/logger";


const invoke = async (queryText: string) => {
    const client = new Client(options)
    await client.connect();

    let result;
    try {
        result = await client.query(queryText);
    } catch (err) {
        const message = err?.message || "Error during database request executing"
        logger.logError(message);
    } finally {
        await client.end();
    }
    return result;
}

export default invoke;
