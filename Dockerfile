# build app
FROM node:lts as build-app
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY public public
COPY src src
RUN npm run build


# use nginx to host
FROM nginx:alpine
COPY --from=build-app /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
