FROM oven/bun:slim

WORKDIR /app

COPY dist/index.js .
COPY health-check.js .

EXPOSE 1284

CMD ["bun", "index.js"]
