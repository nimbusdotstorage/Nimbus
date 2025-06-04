# Contributing to Nimbus

Thank you for your interest in contributing to Nimbus! This guide will help you set up the development environment.

## Prerequisites

- [Bun](https://bun.sh/) (JavaScript runtime)
- [Docker](https://www.docker.com/) (for running PostgreSQL)
- Git

## Quickstart

### 1. Clone the Repository

```bash
git clone https://github.com/nimbusdotstorage/Nimbus.git
cd Nimbus
```

### 2. Install Dependencies

```bash
bun i
```

### 3. Set Up Postgres with Docker

We use Docker to run a PostgreSQL database for local development. Follow these steps to set it up:

1. **Start the database**:

   ```bash
   bun db:up
   ```

   This will start a Postgres container with default credentials:

   - Host: `localhost`
   - Port: `5432`
   - Database: `nimbus`
   - Username: `postgres`
   - Password: `postgres`

2. **Verify the database is running if running a detatched container**:

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

Copy the `.env.example` file to `.env` using this command, `cp .env.example .env` and fill in these values:

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# To generate a secret, just run `openssl rand -base64 32`
BETTER_AUTH_SECRET=
```

### 5. Run Database Migrations

After setting up the database, run the migrations:

```bash
bun db:migrate
```

### 6. Start the Development Server

In a new terminal, start the development server:

> NOTE: this starts both the web and server development servers, to run just one, use `bun dev:web` or `bun dev:server`.
> Both will need the db running to work.

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
git remote add upstream https://github.com/nimbusdotstorage/nimbus.git
```

> Make sure to pull from the upstream repo to keep your fork up to date using `git pull upstream main`

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
- **Permission issues**: On Linux, you might need to run Docker commands with `sudo` or add your user to the `docker`
  group with the command `sudo usermod -aG docker $USER`
- **Database connection issues**: Ensure the database is running and the connection string in your `.env` file is
  correct

## License

By contributing to this project, you agree that your contributions will be licensed under its
[Apache License 2.0](LICENSE).

---

## For new contributors

We want everyone to be able to contribute something to Nimbus. So we set up a list of a few items that can get you
started contributing to the project. You can also check out the [roadmap](https://nimbus.nolt.io/) for ideas. This will
be updated as needed.

### 1. Storage source support

If you have experience with the APIs or specs for S3, R2, OneDrive, or any other storage source, we would love it if you
help us add support for it. Try to stay as close to the API spec as possible, especially for S3 storage so we can
support S3 compatible storage sources like MinIO.

### 2. UI/UX improvements

Some items to get started with:

- Add a missing page or component
- Add error or loading states to a page or component
- Add custom file icons for specific file types
- Create modals for file actions (add, delete, rename, move, etc.)
- Create modals for adding new storage sources
- Create modals for tag management (add, delete, edit, rename, etc.)
- Create pop ups for uploading files & folders
- Notification dropdown
- A settings page that functions with the providers and user settings
- Add folder tree navigation, breadcrumbs, or a file previewer

We realize that many of these changes will not have total functionality hooked up yet. Thats fine, just make sure to add
dummy data so we can see the UI and make sure it works as expected before adding real data.

### 3. Backend Improvements

Some items to get started with:

- Any security related changes
- tRPC support with [Hono](https://hono.dev/docs/guides/rpc). Add the provider and migrate a few routes that haven't
  been migrated.
- Add in storage support drivers like OneDrive, S3, etc.
- Add account linking to the Better-Auth config if needed.
- Add authentication to the API routes if needed.
- Add rate limiting to the API routes if needed.
- Add database tables and migrations if needed for new features.
- Add or improve logging with a lightweight logger.
- Improve error handling.

### 4. Design

Some items to get started with:

- We need a logo.
- Tag color selection
- Visual hierarchy improvements
- Transitions and component design
- Any errors in spacing, margin, sizing, mode toggling, or responsiveness that you can find.

### 5. General Improvements/Features

Some items to get started with:

- Update the README.md or CONTRIBUTING.md if they are out of date.
- Improve error messages on both the frontend and backend.
- Add tests to the backend using Vitest
- Add tests to the frontend using Playwright
- Help us build a public API for Nimbus
- Build a CLI for that API to upload/download/manage files form the terminal
