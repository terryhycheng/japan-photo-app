FROM node:lts-alpine AS base


FROM base AS pruner
WORKDIR /app
COPY . .
RUN npm install -g turbo
RUN turbo prune --scope=frontend --docker

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

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .
RUN npm install -g pnpm
RUN pnpm turbo run build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

EXPOSE 3000

CMD ["node", "apps/frontend/server.js"]