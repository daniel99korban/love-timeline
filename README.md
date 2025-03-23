# Love Timeline

**Our Time** is a personalized website generator for couples that celebrates the journey of their relationship using visual and textual elements. The project is built using React with Vite, Tailwind CSS for styling, and TypeScript on the frontend, with Spring Boot powering the backend.

## Features

- **Customizable Website:**  
  Create a website with a personalized title, message, and photo gallery.
- **Relationship Timer:**  
  A dynamic timer widget that displays the duration of the relationship.
- **Internationalization:**  
  Supports multiple languages (English, Portuguese, and Spanish) using react-i18next.
- **Responsive Design:**  
  Styled with Tailwind CSS to ensure a modern, responsive interface.

## Project Structure

```
my-app/
├── node_modules/
├── public/
│   ├── favicon.ico
│   └── index.html            # Base HTML file
├── src/
│   ├── assets/               # Static assets (images, icons, etc.)
│   ├── components/           # Reusable components (LanguageDropdown, Timer, etc.)
│   ├── pages/                # Page components (Home, Form, About)
│   ├── locales/              # Translation files for internationalization
│   ├── services/             # API configuration for backend calls
│   ├── styles/               # Global styles and Tailwind CSS configuration
│   ├── App.tsx               # Root component organizing routes and layout
│   ├── routes.tsx            # React Router configuration
│   └── main.tsx              # Application entry point
├── package.json              # Project configuration and dependencies
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration for development and production builds
```

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/our-time.git
   ```

2. **Install Dependencies:**

   ```bash
   cd our-time
   npm install
   ```

3. **Start the Development Server:**

   ```bash
   npm run dev
   ```

4. **Open the App:**

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Internationalization

The project uses **react-i18next** for internationalization. The translation files are stored in the `src/locales/` folder, with keys organized by pages (e.g., `home`, `form`, `about`, and `common`). This structure helps maintain the translations more efficiently.

## Backend Integration

The backend is implemented using Spring Boot. Make sure your backend server is running and update the API base URL in `src/services/api.ts` if needed.

## Contributing

Contributions are welcome! If you'd like to improve the project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.