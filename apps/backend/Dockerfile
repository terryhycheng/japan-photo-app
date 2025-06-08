FROM node:lts-alpine AS base

FROM base AS pruner
WORKDIR /app
COPY . .
RUN npm install -g turbo
RUN turbo prune --scope=api --docker

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

# Turborepo remote cache
ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM
 
ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .
RUN npm install -g pnpm
RUN pnpm turbo run build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/ .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]

