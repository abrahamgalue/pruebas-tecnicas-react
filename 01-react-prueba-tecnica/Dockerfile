# Stage 1: Build the React app
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . ./
RUN npm run build

# Stage 2: Development environment
FROM node:22-alpine AS development
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . ./

EXPOSE 5173
CMD ["npm", "run", "dev"]

# Stage 3: Production environment
FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Stage 4: Test environment
FROM node:22 AS test
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
RUN npx playwright install --with-deps

COPY . ./

EXPOSE 5173

CMD ["sh", "-c", "npm run dev & sleep 5 && npx playwright test"]