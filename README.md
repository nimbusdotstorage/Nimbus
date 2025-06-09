# Nimbus cloud storage

A better cloud

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
# For more information on how to get these values, see https://www.better-auth.com/docs/authentication/google
# Authorised JavaScript origins: http://localhost:1284
# Authorised redirect URIs: http://localhost:1284/api/auth/callback/google
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

The application should now be running at [http://localhost:3000](http://localhost:3000)

## Our Amazing Contributors

<a href="https://github.com/nimbusdotstorage/Nimbus/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nimbusdotstorage/Nimbus" />
</a>
