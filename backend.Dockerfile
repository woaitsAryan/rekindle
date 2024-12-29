FROM oven/bun:latest AS base

WORKDIR /

COPY . .

ENV NODE_ENV=production

RUN bun install --production --frozen-lockfile

RUN bun run backend:build

USER bun
EXPOSE 8000/tcp
ENTRYPOINT [ "bun", "run", "backend:start" ]