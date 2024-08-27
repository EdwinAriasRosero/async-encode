FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --development

FROM nginx:alpine
COPY --from=build /app/dist/spa/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]