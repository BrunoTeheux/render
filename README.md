# LaTeX Equation Renderer

## Overview

LaTeX Equation Renderer is a web application that allows users to input LaTeX equations and render them in real-time. It also provides the functionality to copy the rendered equation as an image to the clipboard. This app is particularly useful for students, educators, and professionals who frequently work with mathematical equations and need a quick way to visualize and share them.

This project was created with the assistance of an AI language model (Claude) that provided all the coding and guidance throughout the development process.

## Features

- Real-time rendering of LaTeX equations
- Copy rendered equations as images to the clipboard
- Responsive design for various screen sizes
- Error handling for invalid LaTeX input

## Technologies Used

- React.js
- KaTeX for LaTeX rendering
- html2canvas for converting rendered equations to images
- Tailwind CSS for styling

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/latex-equation-renderer.git
   cd latex-equation-renderer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

To deploy this app to a production environment:

1. Build the app:
   ```
   npm run build
   ```

2. Deploy the contents of the `build` folder to your web server.

3. If deploying to a subdirectory (e.g., user directory on Apache), ensure your server is configured to handle client-side routing. An example `.htaccess` file for Apache is provided in the project root.

## Usage

1. Enter your LaTeX equation in the text area.
2. The equation will be rendered in real-time below the input area.
3. Click the "Copy to Clipboard" button to copy the rendered equation as an image.
4. Paste the image into your desired application.


## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- This project was created with the assistance of Claude, an AI language model developed by Anthropic.
- Thanks to the developers of KaTeX, html2canvas, and other open-source libraries used in this project.


---

Happy equation rendering!
