# Etapa 1: Instalación y construcción
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar el package.json global y las dependencias
COPY package*.json ./

# Instalar las dependencias globales una vez
RUN npm install --force

# Copiar el código de todas las aplicaciones para tener acceso global
COPY . .

# Construir la aplicación específica (esto se define cuando construimos la imagen)
ARG app_name
RUN npx nx run ${app_name}:build

# Etapa 2: Servir la aplicación construida
FROM node:18-alpine AS runnerx
WORKDIR /app

# Copiar los archivos construidos de la aplicación específica
COPY --from=builder /app .

# Exponer el puerto que usará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación específica usando NX
CMD ["npx", "nx", "run", "${app_name}:start"]