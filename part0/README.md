```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST /new_note and sending user inputted data
    activate server

    Note left of server: Process form data and add new note


    server-->>browser: HTTP 302 Redirect to /notes
    deactivate server

    browser->>server: HTTP GET /notes
    activate server
    server-->>browser: HTML for Notes pgae
    deactivate server

    browser->>server: HTTP GET /main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: HTTP GET /main.js
    activate server
    server -->browser: user main.js
    deactivate server

    browser->>server: HTTP GET /data.json
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
