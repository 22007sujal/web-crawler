const { JSDOM } = require("jsdom");


async function Crawl(currentUrl, baseUrl, pages) {

    console.log(`Crawling: ${currentUrl}`);

    const currentURLObj = new URL(currentUrl);
    const baseURLObj = new URL(baseUrl);

  
    if (currentURLObj.origin !== baseURLObj.origin) {
        return pages;
    }

    const normalized = normalizeURL(currentUrl);


    if (pages[normalized] > 0) {
        pages[normalized]++;
        return pages;
    }

    pages[normalized] = 1;

    try {
        const resp = await fetch(currentUrl);

        if (resp.status > 399) {
            console.log(`Fetch error on: ${currentUrl}`);
            return pages;
        }

        const contentType = resp.headers.get("content-type");
        if (!contentType || !contentType.includes("text/html")) {
            console.log(`Skipping non-HTML content: ${currentUrl}`);
            return pages;
        }

        const html = await resp.text();

        const nextUrls = getURLsfromHTML(html, baseURLObj);

        for (const url of nextUrls) {
            await Crawl(url, baseUrl, pages);
        }

    } catch (err) {
        console.log(`Error: ${err.message} at ${currentUrl}`);
    }

    return pages;
}





function getURLsfromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll("a");

    for (const link of links) {
        const href = link.getAttribute("href");
        if (!href) continue;

        try {
            let fullUrl;

            if (href.startsWith("/")) {
                fullUrl = new URL(href, baseURL);
            } else if (href.startsWith("http://") || href.startsWith("https://")) {
                fullUrl = new URL(href);
            } else {
                continue; 
            }

            urls.push(fullUrl.href);

        } catch (err) {
            console.log(`Invalid URL found: ${href}`);
        }
    }

    return urls;
}




function normalizeURL(url) {
    const u = new URL(url);
    let hostPath = `${u.hostname}${u.pathname}`;
    if (hostPath.endsWith("/")) hostPath = hostPath.slice(0, -1);
    return hostPath;
}

module.exports = { normalizeURL, getURLsfromHTML, Crawl };
