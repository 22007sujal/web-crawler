const { JSDOM } = require("jsdom");


async function Crawl(currentUrl, baseUrl, pages) {

    console.log(`Crawling: ${currentUrl}`); //print the current url

    const currentURLObj = new URL(currentUrl); //convert string to url object
    const baseURLObj = new URL(baseUrl); //convert string to url object

  
    if (currentURLObj.origin !== baseURLObj.origin) { //checks if both base url and current url is from same origin 
                                                      //because we don,t want to run this function forever so we don,t go outside to fetch link
        return pages;
    }

    const normalized = normalizeURL(currentUrl); //normalize url this function
                                                 //convert url path and captilized 
                                                //letter in url to full url


    if (pages[normalized] > 0) {
        return pages;
    } //if we already mapping of website then pages map shoudl greater than 0
      // so we just return pages

    pages[normalized] = 1;//otherwise we set 1 to map for that website we visited

    try {
        const resp = await fetch(currentUrl);

        if (resp.status > 399) { //check is if website gave correct response
            console.log(`Fetch error on: ${currentUrl}`);
            return pages;
        }

        const contentType = resp.headers.get("content-type");
        if (!contentType || !contentType.includes("text/html")) { // check if we get html
             //content after fetch
            console.log(`Skipping non-HTML content: ${currentUrl}`);
            return pages;
        }

        const html = await resp.text(); //get all html text 

        const nextUrls = getURLsfromHTML(html, baseURLObj);  //get all urls from fetched 
                                                             //html

        for (const url of nextUrls) {
            await Crawl(url, baseUrl, pages);//doing rescursivley calls on every url to scroll all part
                                             //of same website
        }

    } catch (err) {
        console.log(`Error: ${err.message} at ${currentUrl}`);
    }

    return pages; //return pages 
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
