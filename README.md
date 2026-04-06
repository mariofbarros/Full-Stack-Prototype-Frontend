[![Status: Academic Project](https://img.shields.io/badge/Status-Academic_Project-orange)]()
[![Warning: Not for Production](https://img.shields.io/badge/Warning-Not_for_Production-red)]()

# Coffee Shop Order Interface

A lightweight, responsive web interface for managing coffee shop orders. Built with **Vanilla JavaScript**, **HTML5**, and **CSS3**, this frontend connects directly to the [Full Stack Prototype Backend](https://github.com/mariofbarros/Full-Stack-Prototype-Backend).


https://github.com/user-attachments/assets/4a8496d6-62c8-4996-8c27-f369667e292e


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

## Prerequisites

- **Web Browser** (Google Chrome, Firefox or any other)
- **Git**
- A code editor (e.g., VS Code)

## Setup Guide

In order to see this aplication in full potencial, please, follow the instructions demonstraded in the [Full Stack Prototype Backend](https://github.com/mariofbarros/Full-Stack-Prototype-Backend) repository.

## ⚠️ Disclaimer

> **Academic Project Notice**
>
> This repository contains a **university project** developed for educational purposes and as a **Proof of Concept (PoC)**. It is **not** intended for production use, commercial deployment, or handling sensitive data.
>
> **Key Limitations:**
> - **Security:** The application lacks robust security measures (e.g., authentication, authorization, input sanitization beyond basics, and secure data encryption) required for real-world environments.
> - **Scalability:** The architecture is designed for a single-user/local environment and does not support high traffic, concurrent users, or distributed systems.
> - **Features:** Several features are incomplete or simplified to focus on core learning objectives.
>
> **Future Roadmap:**
> This project is a work in progress. I intend to continue developing it to address these limitations, implement security best practices, and explore scalability solutions as part of my ongoing learning journey.
>
> **Usage:**
> Feel free to review the code for educational insights, but please do not deploy this in a live environment without significant refactoring and security auditing.
