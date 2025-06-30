
# Builder stage
FROM oven/bun AS builder
WORKDIR /app

# Copy package files for dependency installation
COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/
COPY packages/ ./packages/

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Set public environment variables
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL:-http://localhost:1284}
ENV NEXT_PUBLIC_FRONTEND_URL=${NEXT_PUBLIC_FRONTEND_URL:-http://localhost:3000}
ENV NEXT_PUBLIC_CALLBACK_URL=${NEXT_PUBLIC_CALLBACK_URL:-http://localhost:3000/app}

# Install production dependencies only
RUN bun install

# Build the application
WORKDIR /app/apps/web
RUN bun run build
WORKDIR /app

# Create production directories
RUN mkdir -p /app/dist/apps/web/.next/static /app/dist/apps/web/public

# Copy built assets
RUN cp -r /app/node_modules /app/dist/ && \
    cp -r /app/apps/web/.next/standalone/* /app/dist/ && \
    cp -r /app/apps/web/.next/static /app/dist/apps/web/.next/ && \
    cp -r /app/apps/web/public/* /app/dist/apps/web/public/

# Production image
FROM oven/bun AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/dist/ .

# Switch to non-root user
USER nodejs

EXPOSE ${PORT}

# Start the application
CMD ["bun", "apps/web/server.js"]
