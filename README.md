# Express-Auth-Frontend

Express-Auth-Frontend is a web application built with React and TypeScript
that provides a user interface for authentication and authorization functionalities.
This project aims to offer a robust and secure frontend for managing user authentication.

## Features

- **User Authentication:** Secure user authentication using various strategies.
  - `JWT Authentication`: JSON Web Tokens for stateless authentication.
- **User Authorization:** Role-based access control to manage user permissions.
  - `Admin Role`: Full access to all resources and functionalities.
  - `User Role`: Limited access based on user permissions.
- **Password Management:** Secure password handling and management.
  - `Password Reset`: Functionality to reset forgotten passwords.
- **Responsive Design:** Ensures the application is usable on various devices.
- **Dark Mode:** Supports both light and dark themes.

## Technologies Used

- React: JavaScript library for building user interfaces.
- TypeScript: Typed superset of JavaScript that compiles to plain JavaScript.
- React Router: Library for routing in React applications.
- Axios: Promise-based HTTP client for the browser and Node.js.
- Tailwind CSS: Utility-first CSS framework for rapid UI development.
- shadcn/ui: Component library for building user interfaces.
- zod: TypeScript-first schema declaration and validation library.

## Installation

To set up and run this project locally, you'll need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Follow these steps:

1. Clone the repository: `git clone https://github.com/nureka-rodrigo/Express-Auth-Frontend.git`
2. Navigate into the project directory: `cd Express-Auth-Frontend`
3. Install the dependencies: `npm install`
4. Start the application: `npm run dev`

The application will start running on `http://localhost:3000/`.

## Environment Variables

The project uses the following environment variable, which is stored in a `.env` file:

- `VITE_APP_BACKEND_URL`: The URL of the backend API (e.g., http://localhost:8000).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the terms of the [MIT license](https://github.com/nureka-rodrigo/Express-Auth-Frontend/blob/main/LICENSE).