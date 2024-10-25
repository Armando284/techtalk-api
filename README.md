# TechTalk API
This is the backend API for the TechTalk platform, built with Express.js and PostgreSQL. It serves as the foundation for user authentication, posts, comments, and other core features of the social platform for developers.

## Requirements
Node.js (v14 or higher)
PostgreSQL (v13 or higher)
npm (v6 or higher)
Setup
1. ### Clone the repository
```bash
git clone https://github.com/your-username/techtalk-api.git
cd techtalk-api
```
2. ### Install dependencies
```bash
npm install
```
3. ### Create a `.env` file
Create a `.env` file in the root directory with the following contents:

```makefile
DATABASE_URL=your-postgresql-connection-string
PORT=3000
```
Make sure to replace `your-postgresql-connection-string` with your actual PostgreSQL connection details.

4. ### Run the development server
```bash
npm run dev
```
This will start the server in development mode. The API will be accessible at `http://localhost:3000`.

## Database
To set up the PostgreSQL database, ensure you have a local or remote instance running. You can use a tool like `pgAdmin` or the PostgreSQL CLI to create a database for the project.

To apply migrations (if using a migration tool like `sequelize` or `knex`):

```bash
npm run migrate
```

## Deployment
The API is currently deployed on an Express server. For production deployment, ensure the following:

Set the `NODE_ENV` constiable to `production`.
Use a process manager like `PM2` to keep the server running.
Ensure you have a secure PostgreSQL instance and update your `DATABASE_URL` in the production environment.

## Scripts
`npm run` dev: Start the development server.

`npm run migrate`: Run the database migrations.

`npm start`: Start the production server.

## License
This project is licensed under the MIT License.