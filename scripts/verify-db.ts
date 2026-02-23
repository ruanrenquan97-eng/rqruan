
import { db } from "../server/db";
import { productSeries } from "../drizzle/schema";

async function main() {
    try {
        console.log("Checking product_series table...");
        const series = await db.select().from(productSeries).limit(1);
        console.log("Success! Table exists. Rows found:", series.length);
    } catch (error) {
        console.error("Error accessing product_series table:", error);
        process.exit(1);
    }
}

main();
