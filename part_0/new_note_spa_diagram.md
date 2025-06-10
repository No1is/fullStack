``` mermaid
sequenceDiagram
    participant javascript
    participant browser

    browser->>javascript: submit event

    activate javascript
    Note right of javascript: prevents GET redirect event
    javascript->>javascript: 
    Note right of javascript: generates note content obtained from submit event 
    javascript->>javascript: 
    Note right of javascript: pushes new note to note list and renders the list on the page. 
    javascript->>javascript: 
    javascript->>browser: direct browser to POST new note to server
    deactivate javascript

    create participant server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    activate server
    server->>browser: 201 created status returned
    destroy server
    deactivate server

    Note left of server: informs browser that it has received the payload as JSON data type

    


```
