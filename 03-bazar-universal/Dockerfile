# Build Stage
FROM node:22-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production Stage
FROM build AS production

COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

CMD npm start