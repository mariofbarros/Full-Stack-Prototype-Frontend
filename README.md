# Coffee Shop Order Manager

A lightweight, responsive web interface for managing coffee shop orders. Built with **Vanilla JavaScript**, **HTML5**, and **CSS3**, this frontend connects directly to the [Full Stack Prototype Backend](https://github.com/mariofbarros/Full-Stack-Prototype-Backend).

## Features

- **Real-time Order Management**: View, create, edit, and delete orders instantly.
- **Responsive Design**: Clean card-based layout for desktop and mobile.
- **Security**: Includes client-side XSS protection via `escapeHtml()` utility.
- **Error Handling**: Graceful fallbacks if the backend is unreachable.
- **Zero Dependencies**: No build tools or frameworks required; runs directly in the browser.

## Tech Stack

- **Core**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **HTTP Client**: Native `fetch` API
- **Backend Integration**: Connects to `http://localhost:5000`
