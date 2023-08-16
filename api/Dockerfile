# syntax=docker/dockerfile:1
FROM node:18-bullseye-slim AS nodedeps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm install -g @nestjs/cli

FROM nodedeps AS build

COPY . .

RUN npm run build && \
    mkdir -p /out && \
    mv /app/node_modules /out && \
    mv /app/dist /out && \
    mv /app/migrator /out && \
    mv /app/static /out && \
    mv /app/package.json /out && \
    mv /app/package-lock.json /out

FROM gcr.io/distroless/nodejs18-debian11

COPY --from=build /out /app
WORKDIR /app

CMD ["dist/src/main.js"]
