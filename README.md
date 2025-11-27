Simple Web-Crawler
Description
A lightweight JavaScript web crawler that maps the internal structure of a target website. It recursively fetches pages to discover all navigation paths sharing the same origin as the base URL.

How It Works
The logic follows a simple recursive loop:

Fetch: access the provided Home Page URL.

Extract: parse the HTML to find all anchor tags (<a>).

Filter: discard external links; keep only those matching the base domain.

Recurse: repeat the process for every new link found.

Stop: end recursion when a link has already been visited to prevent loops.

Installation
Clone the repository and install the dependencies.
npm install
Run the crawler using the start command followed by the target URL.

Command:

npm start [url]

Example:

npm start https://google.com
The terminal will output a list of all unique internal links visited during the session.
