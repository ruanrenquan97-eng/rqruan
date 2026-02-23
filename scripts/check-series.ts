
import { db } from "../server/db";
import { productSeries } from "../drizzle/schema";

async function main() {
    console.log("Fetching product series...");
    const seriesList = await db.select().from(productSeries);

    if (seriesList.length === 0) {
        console.log("No product series found.");
    } else {
        console.log("Found product series:");
        seriesList.forEach(s => {
            console.log(`ID: ${s.id}`);
            console.log(`Name: "${s.name}"`);
            console.log(`Image URL: ${s.imageUrl || "NULL"}`);
            console.log("-------------------");
        });
    }
}

main().catch(console.error);
