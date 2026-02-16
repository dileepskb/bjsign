FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat

RUN corepack enable && corepack prepare pnpm@latest --activate

# 🔒 STOP ALL lifecycle scripts (postinstall, prisma, etc.)
ENV npm_config_ignore_scripts=true

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Scripts wapas allow karo
ENV npm_config_ignore_scripts=false

# Prisma schema now exists
COPY prisma ./prisma

RUN pnpm prisma generate --schema=prisma/schema.prisma

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]
