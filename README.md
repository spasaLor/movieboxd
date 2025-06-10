# Movieboxd

## Description

Movieboxd is a member-only movie review website where everyone can register and log in, but only the one who who possess a secret code can create posts sharing their reviews, first impressions, and thoughts about movies. The project was built to learn and implement user authentication using Passport.js with a local strategy, session management, and secure content posting.

## Features

- User registration and login with authentication via Passport.js
- Secret code required to control membership
- Authenticated members can create new movie review posts
- Admins can remove posts
- Session management to keep users logged in securely
- Server-side rendered pages using EJS templates
- Input validation and sanitization to ensure data integrity

## Technologies Used

- Backend: Node.js with Express framework
- Authentication: Passport.js (local strategy)
- View Engine: EJS (Embedded JavaScript templates)
- Database: PostgreSQL hosted on Neon
- Frontend: JavaScript, CSS
- Hosting: Render

## Live Demo

Check out the live deployed version here:  
[https://movieboxd-m4nu.onrender.com](https://movieboxd-m4nu.onrender.com)

## Installation

To run Movieboxd locally for development:

1. Clone the repository:

    ```
    git clone [your-repository-url]
    ```

2. Navigate into the project directory:

    ```
    cd [your-project-folder]
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Set up your PostgreSQL database (e.g., on Neon) and configure environment variables by creating a `.env` file in the root directory with:

    ```
    DATABASE_URL=your_postgresql_database_url
    SESSION_SECRET=your_session_secret
    SECRET_CODE=your_secret_registration_code
    ```

5. Start the application:

    ```
    npm start
    ```

6. Open your browser and visit `http://localhost:3000` to access the site.

## Usage

- Register a new account.
- Log in with your credentials.
- Input the secret code (if you know it!)
- Create new movie review posts sharing your thoughts and impressions.
- Browse posts created by other members.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

    ```
    git checkout -b feature/your-feature
    ```

3. Commit your changes with a descriptive message.
4. Push your branch to your forked repository:

    ```
    git push origin feature/your-feature
    ```

5. Open a pull request describing your changes.

## License

This project currently does not specify a license. Please contact the author if you wish to use or contribute to the code.

## Contact

For questions or feedback, please open an issue on the GitHub repository.
