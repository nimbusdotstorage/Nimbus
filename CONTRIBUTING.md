# Contributing to Nimbus

Thank you for your interest in contributing to Nimbus! This guide will help you set up the development environment.

## Prerequisites

- [Bun](https://bun.sh/) (JavaScript runtime)
- [Docker](https://www.docker.com/) (for running PostgreSQL)
- Git

## Quickstart

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nimbus.git
cd nimbus
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Postgres with Docker

We use Docker to run a PostgreSQL database for local development. Follow these steps to set it up:

1. **Start the database**:

   ```bash
   docker compose up
   ```

   This will start a Postgres container with default credentials:

   - Host: `localhost`
   - Port: `5432`
   - Database: `nimbus`
   - Username: `postgres`
   - Password: `postgres`

2. **Verify the database is running**:

   ```bash
   docker compose ps
   ```

   You should see the `nimbus-db` container in the list with a status of "Up".

3. **Connect to the database** (optional):
   ```bash
   # Using psql client inside the container
   docker compose exec postgres psql -U postgres -d nimbus
   ```

### 4. Environment Setup

Copy the `.env.example` file to `.env` and fill in the values using this command, `cp .env.example .env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nimbus
```

### 5. Run Database Migrations

After setting up the database, run the migrations:

```bash
bun db:migrate
```

### 6. Start the Development Server

In a new terminal, start the development server:

> NOTE: this starts both the web and server development servers, to run just one, use `bun dev:web` or `bun dev:server`. Both will need the db running to work.

```bash
bun dev
```

The application should now be running at http://localhost:3000

## Making Changes

### Fork the repo

- On GitHub, click the "Fork" button and make your own fork of the repo

### Clone your fork locally

```bash
git clone https://github.com/\<yourusername\>/nimbus.git
cd nimbus
```

### Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

Add the original repo as a remote:

```bash
git remote add upstream https://github.com/logscore/nimbus.git
```

> Make sure to pull from the upstream repo to keep your fork up to date

### Commit your changes

```bash
git add .
git commit -m "Your commit message"
```

### Push to the branch

```bash
git push origin feature/your-feature-name
```

### Open a pull request

- Go to GitHub and open a pull request from your feature branch

## Useful Commands

- **Stop the database**:

  ```bash
  bun db:down
  ```

- **Reset the database** (deletes all data):

  ```bash
  bun db:reset
  ```

## Troubleshooting

- **Port conflicts**: If port 5432 is already in use, just change the port mapping in `docker-compose.yml`
- **Permission issues**: On Linux, you might need to run Docker commands with `sudo` or add your user to the `docker` group with the command `sudo usermod -aG docker $USER`
- **Database connection issues**: Ensure the database is running and the connection string in your `.env` file is correct

## License

By contributing to this project, you agree that your contributions will be licensed under its [Apache License 2.0](LICENSE).
