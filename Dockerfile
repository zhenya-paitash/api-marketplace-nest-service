# --┌───────────┬─────────────────────────────────────────────────────────────┐
# --├ @stage      Base configuration
# --│
# --├ @directory  ┌ /usr/src/app ──────┐
# --│             │ *                 │
# --│             └────────────────────┘
# --└───────────┴─────────────────────────────────────────────────────────────┘
FROM oven/bun:1 as base
WORKDIR /usr/src/app
# Copy only dependencies for Docker caching 
COPY package.json bun.lock* ./
RUN bun install


# --┌───────────┬─────────────────────────────────────────────────────────────┐
# --├ @stage      Development Build
# --│
# --├ @directory  ┌ /usr/src/app ──────┐
# --│             │ *                 │
# --│             └────────────────────┘
# --└───────────┴─────────────────────────────────────────────────────────────┘
FROM base as development
WORKDIR /usr/src/app
# Copy node_modules from base image
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY . .
CMD ["bun", "run", "start:dev"]


# --┌───────────┬─────────────────────────────────────────────────────────────┐
# --├ @stage      Production Build
# --│
# --├ @directory  ┌ /usr/src/app ──────┐
# --│             │ *                 │
# --│             └────────────────────┘
# --└───────────┴─────────────────────────────────────────────────────────────┘
FROM base as production
WORKDIR /usr/src/app
# Install production dependencies
RUN bun install --production
COPY . .
RUN bun run build
CMD ["node", "dist/main.js"]

