const { Crawl } = require("./shy.js");

(async () => {
    if (process.argv.length < 3) {
        console.log("NO WEBSITE PROVIDED");
        process.exit(1);
    }

    if (process.argv.length > 3) {
        console.log("TOO MANY COMMAND LINE ARGS");
        process.exit(1);
    }

    const base_url = process.argv[2];

    console.log("START CRAWLING...");

    try {
       
        const pages = await Crawl(base_url, base_url, {});

        for (const page of Object.entries(pages)) {
            console.log(page);
        }

        console.log("CRAWLING FINISHED");
    } catch (err) {
        console.error("ERROR:", err.message);
    }
})();
