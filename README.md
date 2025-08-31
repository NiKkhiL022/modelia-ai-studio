# Modelia AI Studio - Simplified AI Image Generation App

This project is a small React web application simulating a simplified AI studio experience. It allows users to upload images, provide text prompts, select visual styles, and generate styled images using a mocked AI generation API.

## Project Purpose

The goal of this assignment is to demonstrate skills in modern front-end engineering, including:

- Building reactive UI with **React** and **TypeScript**.
- Using **TailwindCSS** for styling and responsive layouts.
- Handling image uploads, previews, and client-side resizing.
- Implementing API interaction with error handling and retry logic.
- Managing application state and localStorage for generation history.
- Ensuring accessibility with keyboard navigation and ARIA attributes.
- Writing clean, maintainable code with ESLint and Prettier.
- Optionally adding unit and end-to-end tests following best practices.

This project simulates core parts of an AI image generation studio, focusing on UI/UX quality, functional correctness, code structure, and performance optimizations.

## Features

- Upload PNG/JPG images up to 10MB with live preview.
- Client-side downscaling for large images to improve performance.
- Text input for prompts and style selection from dropdown.
- Live summary displaying the selected image, prompt, and style.
- "Generate" button calls a mocked API with simulated latency, success, and failure responses.
- Retry mechanism on failures with exponential backoff and ability to abort requests.
- Stores last 5 generated images with prompts and styles in localStorage.
- History panel to restore previous generations.
- Fully keyboard accessible with visible focus states and ARIA support.

## Tech Stack

- React with TypeScript (strict mode enabled)
- TailwindCSS for styling
- ESLint and Prettier for code quality
- Mocked API implementation for generation simulation

(Optional bonus features):

- Unit tests using React Testing Library
- End-to-end tests with Cypress or Playwright
- PWA features including offline caching and manifest

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

