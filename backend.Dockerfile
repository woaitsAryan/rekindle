FROM oven/bun:latest AS base

WORKDIR /

FROM base AS install

COPY . .

RUN bun install --frozen-lockfile

FROM base AS build

COPY --from=install /node_modules /node_modules
COPY . .

RUN bun run backend:build

FROM base AS release

COPY --from=build /apps/backend/dist/index.js /index.js
COPY --from=build /node_modules/@prisma/client /node_modules/@prisma/client
COPY --from=build /node_modules/.prisma /node_modules/.prisma

USER bun
EXPOSE 8000/tcp
ENTRYPOINT [ "bun", "run", "index.js" ]