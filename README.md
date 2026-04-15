# LaTeX Equation Renderer

## Overview

LaTeX Equation Renderer is a web application that allows users to input LaTeX equations and render them in real-time. It also provides the functionality to copy the rendered equation as an image to the clipboard. This app is particularly useful for students, educators, and professionals who frequently work with mathematical equations and need a quick way to visualize and share them.

This project was created with the assistance of an AI language model (Claude) that provided all the coding and guidance throughout the development process.

## Features

- **HTML Preview Mode**: Render markdown text with embedded LaTeX math expressions in a beautiful, readable layout (perfect for working with Claude Code output)
- **Image Export Mode**: Copy rendered LaTeX equations as PNG images to the clipboard
- Real-time rendering with KaTeX
- Support for both inline (`$...$`) and display (`$$...$$`) math notation
- Multi-line math expressions supported
- Responsive design for various screen sizes
- Error handling for invalid LaTeX input

## Technologies Used

- React.js
- KaTeX for LaTeX rendering and math display
- html2canvas for converting rendered equations to images
- Inline CSS styling for UI components

## Installation

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/brunoteheux/latexify.git
   cd latexify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   
   **Note:** If you encounter an OpenSSL error on newer Node.js versions, use:
   ```bash
   NODE_OPTIONS=--openssl-legacy-provider npm start
   ```

4. The browser should automatically open to [http://localhost:3000](http://localhost:3000)

5. You'll see the LaTeX Renderer app with the **HTML Preview** mode active by default

### Troubleshooting

- **"Module not found" errors**: Run `npm install` again to ensure all dependencies are installed
- **Port 3000 already in use**: Either kill the process using port 3000 or start the server on a different port with `PORT=3001 npm start`
- **Build errors with Node.js v17+**: Use the `NODE_OPTIONS=--openssl-legacy-provider` environment variable as shown above

## Deployment

To deploy this app to a production environment:

1. Build the app:
   ```
   npm run build
   ```

2. Deploy the contents of the `build` folder to your web server.

3. If deploying to a subdirectory (e.g., user directory on Apache), ensure your server is configured to handle client-side routing. An example `.htaccess` file for Apache is provided in the project root.

## Usage

The app has two modes accessible via toggle buttons at the top:

### HTML Preview Mode (Default)

Perfect for reading and reviewing LaTeX-heavy content alongside regular text:

1. Enter markdown text with embedded LaTeX math expressions
2. Use `$...$` for inline math (renders within text)
3. Use `$$...$$` for display math (renders on separate lines)
4. The preview displays in a clean, reading-friendly layout with Georgia serif font
5. Math expressions are rendered in real-time as you type

**Example:**
```
Recall that elements of $n_{\mathcal{A}}(\mathbf{A})$ are tuples,
where $x$ ranges over all homomorphisms $x: \mathbf{A} \to \mathbf{M}$.
```

### Image Export Mode

For exporting individual equations as images:

1. Enter a pure LaTeX equation in the text area
2. The equation renders in real-time below the input
3. Click "Copy to Clipboard" to copy the rendered equation as a PNG image
4. Paste the image into emails, documents, or other applications

**Example:**
```
f(x) = \int_{-\infty}^{\infty} \hat{f}(\xi) e^{2\pi i \xi x} d\xi
```

### Markdown Math Syntax

- **Inline math**: `$E = mc^2$` renders math within the text flow
- **Display math**: `$$E = mc^2$$` renders math on its own line
- Math expressions can span multiple lines within delimiters
- Supports all standard LaTeX commands and macros


## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- This project was created with the assistance of Claude, an AI language model developed by Anthropic.
- Thanks to the developers of KaTeX, html2canvas, and other open-source libraries used in this project.


---

Happy equation rendering!
