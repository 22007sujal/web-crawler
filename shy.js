function normalizeURL(url) {
    const new_url = new URL(url);
    const host_name =  `${new_url.hostname}${new_url.pathname}`;
    if(host_name.length > 0 && host_name.slice(-1) === '/') {
        return host_name.slice(0,-1);
    }
    return host_name;
}


module.exports = {normalizeURL};