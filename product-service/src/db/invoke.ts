import {Client} from "pg";

import options from "./options";
import {logger} from "../helpers/logger";


const invoke = async (queryText: string) => {
    const client = new Client(options)
    await client.connect();

    let result;
    try {
        result = await client.query(queryText);
    } catch ({message}) {
        logger.logError(message || "Error during database request executing")
    } finally {
        await client.end();
    }
    return result;
}

export default invoke;
