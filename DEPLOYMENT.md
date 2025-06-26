## ✈️ Deployment to Fly.io

> Note: This guide is based on this demo repo:
> [deploy-fly-bun-hono-nextjs](https://github.com/bauchdj/deploy-fly-bun-hono-nextjs)

Make sure you have the Fly.io CLI installed and are logged in:

```bash
fly auth login
```

Also authenticate docker to push to Fly.io registry:

```bash
fly auth docker
```

## ✈️ First-Time Deployment to Fly.io

Follow these steps to deploy your application for the first time:

### Prerequisites

- [Docker](https://www.docker.com/) running locally
- [Fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/) installed and authenticated
- [Fly.io & Docker](https://fly.io/docs/blueprints/using-the-fly-docker-registry/#authenticating-and-pushing-to-the-registry)
  installed and authenticated
- Root `.env` file configured with your environment variables.

### 1. Copy .env.production.example to .env

Copy and edit the `VALKEY_PASSWORD` to something random. Update the app names and hosts accordingly.

```bash
cp .env.production.example .env
```

Copy .env to child directories

```bash
bun run env:sync
```

### 2. Create Cache App and Deploy

Navigate to cache directory

```bash
cd packages/cache
```

Run the launch script to create the app on Fly.io

```bash
fly launch --no-deploy
```

**Create a new Fly.io app**

- Type `y` to use the existing configuration
- Type `y` again to configure it. This will open a browser tab.

Navigate to root

```bash
cd ../../
```

### 3. Run the Server Deployment Script

Navigate to server directory

```bash
cd apps/server
```

Run the deploy script

```bash
bun run fly:deploy
```

### 4. Configure Your Server and Postgres Fly.io Apps

1. **Create a new Fly.io app**
   - **IMPORTANT**: Run the recommended command that the deploy script generated for you
     - Example:
       `fly launch --no-deploy --name bun-hono-api --internal-port 8080 --vm-cpu-kind shared --vm-cpus 1 --vm-memory 256`
   - Type `y` to use the existing configuration
   - Type `y` again to configure it. This will open a browser tab.

2. **Configure Postgres in Browser**
   - Select a Postgres option
   - Give it a name. It has to be unique.
     - Example: `bun-hono-api-db`
   - For development, you may want to scale down resources
   - Adjust CPU, memory, and other settings as needed

3. **Docker Configuration**
   - **IMPORTANT**: Type `n` when asked to create `.dockerignore` from `.gitignore`. It will ask after the postgres app
     finishes.

### 5. Save Database Connection Info

After the Postgres app is created, **carefully save the connection information** displayed in the terminal. You'll need
these details for your `.env` file.

Example connection info:

```console
Postgres cluster bun-hono-api-db created
  Username:    postgres
  Password:    DrHjcNSjz1c7wN7
  Hostname:    bun-hono-api-db.internal
  Flycast:     fdaa:a:1733:0:1::6
  Proxy port:  5432
  Postgres port:  5433
  Connection string: postgres://postgres:DrHjcNSjz1c7wN7@bun-hono-api-db.flycast:5432
```

### 6. Verify Deployment of Server and Postgres

Once the Postgres deployment completes, your postgres app will be available at the name you configured. Check by running
`fly apps list`.

Example output:

```console
% fly apps list
NAME              	OWNER   	STATUS   	LATEST DEPLOY
bun-hono-api      	personal	pending
bun-hono-api-cache	personal	pending
bun-hono-api-db   	personal	deployed
```

### 7. Create / Update .env file for Database Migrations

Navigate to root

```bash
cd ../../
```

**IMPORTANT**: Update the database variables based on the info it gave you. Change the `DATABASE_URL` temporarily so
that the `<postgres-app-name>.flycast` is `localhost`.

> Note: I changed `.internal` to `.flycast`. Read more here [flycast](https://fly.io/docs/networking/flycast/).

Example database env variables:

```env
DATABASE_APP_NAME=bun-hono-api-db
DATABASE_URL=postgres://postgres:DrHjcNSjz1c7wN7@localhost:5432
DATABASE_HOST=bun-hono-api-db.flycast
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=DrHjcNSjz1c7wN7
POSTGRES_DB=bun-hono-api
```

Then copy .env file to child directories

```bash
bun run env:sync
```

### 8. Proxy the Database on Fly.io and Run Migrations

Open a new terminal or tab and proxy the database on Fly.io

```bash
fly proxy 5432 -a <postgres-app-name>
```

Run migrations from root directory

```bash
bun run db:push
```

### 9. Update .env file for final deployment

Edit .env file. Update the `DATABASE_URL` so the host is `<postgres-app-name>.flycast` again.

Example database env variables:

```env
DATABASE_APP_NAME=bun-hono-api-db
DATABASE_URL=postgres://postgres:DrHjcNSjz1c7wN7@bun-hono-api-db.flycast:5432
DATABASE_HOST=bun-hono-api-db.flycast
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=DrHjcNSjz1c7wN7
POSTGRES_DB=bun-hono-api
```

Then copy .env file to child directories

```bash
bun run env:sync
```

### 10. Run the Web Deployment Script

Navigate to web directory

```bash
cd apps/web
```

Run the deploy script

```bash
bun run fly:deploy
```

### 11. Configure Your Web Fly.io App

1. **Create a new Fly.io app**
   - **IMPORTANT**: Run the recommended command that the deploy script generated for you
     - Example:
       `fly launch --no-deploy --name bun-nextjs-web --internal-port 3000 --vm-cpu-kind shared --vm-cpus 1 --vm-memory 256`
   - Type `y` to use the existing configuration
   - Type `y` again to configure it. This will open a browser tab.

2. **Docker Configuration**
   - **IMPORTANT**: Type `n` when asked to create `.dockerignore` from `.gitignore`

### 12. Verify App Creation

Now your web app will be available on Fly.io at the name you configured. Check by running `fly apps list`.

Example output:

```console
% fly apps list
NAME              	OWNER   	STATUS    	LATEST DEPLOY
bun-hono-api      	personal	pending
bun-hono-api-cache	personal	pending
bun-hono-api-db   	personal	deployed
bun-nextjs-web    	personal	pending
```

### 13. Deploy Server and Web apps

Navigate to root

```bash
cd ../../
```

Bump all versions by <major|minor|patch>. This will make each image on fly's registry unique.

```bash
bun run bump-all-versions
```

Deploy all apps

```bash
bun run fly:deploy
```

This does the following:

- It will delete all `.env` files in child directories and copy the root `.env` files to the child directories.
- Then it will update the `secrets` and `stage` them on fly based on the env file.
- Then it will `build` and `deploy` the **cache** app
- Then it will `build` and `deploy` the **server** app
- Then it will `build` and `deploy` the **web** app

### 14. Verify Deployment and Celebrate! 🎉

List your apps

```bash
fly apps list
```

Example output:

```console
% fly apps list
NAME              	OWNER   	STATUS  	LATEST DEPLOY
bun-hono-api      	personal	deployed	1m15s ago
bun-hono-api-cache	personal	deployed	1m45s ago
bun-hono-api-db   	personal	deployed
bun-nextjs-web    	personal	pending
```

If everything was successful, you should be able to navigate to `<web-app-name>.fly.dev`, for ex.
[bun-nextjs-web.fly.dev](https://bun-nextjs-web.fly.dev), and see `"Hello Hono!"`

If you refresh the page a few times, you should get a 429 error. This is because the rate limiter is in effect. Valkey
is working!
