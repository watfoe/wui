# Stage 1: Dependencies
FROM node:alpine AS deps
WORKDIR /app
# Install pnpm
RUN npm install -g pnpm@8.8.0
# Copy package files
COPY package.json pnpm-lock.yaml* ./
# Install dependencies with cache mounting
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:alpine AS builder
WORKDIR /app
# Copy deps from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm@8.8.0
# Build the application
RUN pnpm run build

# Stage 3: Final
FROM joseluisq/static-web-server:2-alpine

# Copy static files from builder
COPY --from=builder /app/build /public

# Set the correct permissions
RUN chown -R 1000:1000 /public && chmod -R a+rx /public
# Switch to a non-root user
USER 1000

EXPOSE 3000
CMD ["--port", "3000"]