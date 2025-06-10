``` mermaid
    sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa

    activate server
    server->>browser: html document
    deactivate server

    Note right of browser: browser reads the html document, link tag calls for css file from server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css

    activate server
    server->>browser: css file
    deactivate server

    Note right of browser: browser reads css, and continues executing reading html code, script tag calls for JS file from server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js

    activate server
    server->>browser: JavaScript file
    deactivate server

    Note right of browser: JS code requires the JSON file from server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json

    activate server
    server->>browser: contents of JSON returned to browser
    deactivate server
```
