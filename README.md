# Asynck

## Overview
Asynck is a JavaScript library designed to facilitate asynchronous web requests using Web Workers. It allows developers to handle HTTP requests efficiently without blocking the main thread.

## Features
- Utilizes Web Workers for non-blocking HTTP requests.
- Supports method chaining for better usability.
- Easy integration into existing projects.

## Installation
You can include `asynck.js` in your project by downloading it from this repository or linking it directly if hosted.

## Usage
```
const asyncRequest = new Asynck({
url: 'https://api.example.com/data',
method: 'GET',
headers: {
'Content-Type': 'application/json'
}
});
asyncRequest.send()
.then(response => console.log(response))
.catch(error => console.error(error));
```

## License
This project is licensed under the MIT License. You are free to use, modify, and distribute this software for both personal and commercial purposes.
