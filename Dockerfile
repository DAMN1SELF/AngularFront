# Etapa de construcción
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Etapa de ejecución
FROM nginx:alpine

# Copia los archivos de la build de Angular
COPY --from=build /app/dist/SingPlayAngularProyecto/browser /usr/share/nginx/html

# Agrega la configuración NGINX directamente en el Dockerfile
RUN echo ' \
server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
\
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
\
    location /api/ { \
        proxy_pass http://app-back:8083/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
    } \
} \
' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
