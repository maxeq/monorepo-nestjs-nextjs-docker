# Базовый образ
FROM node:21-alpine AS base 

# development stage
FROM base AS development 
ARG APP 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV}
WORKDIR /nest/${APP}

# Устанавливаем глобально Nest CLI
RUN npm install -g @nestjs/cli

# Копируем только файлы package.json и package-lock.json для установки зависимостей
COPY nest/${APP}/package*.json ./

# Устанавливаем зависимости для разработки
RUN npm install

# Копируем все файлы приложения
COPY nest/${APP} .   

# Собираем приложение
RUN npm run build

# production stage
FROM base AS production 
ARG APP
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV} 
WORKDIR /nest/${APP}

# Копируем только package.json и package-lock.json для установки production зависимостей
COPY nest/${APP}/package*.json ./
RUN npm install --omit=dev

# Копируем скомпилированные файлы из development stage
COPY --from=development /nest/${APP}/dist ./dist 

# Копируем остальные файлы приложения, такие как конфигурационные файлы
COPY nest/${APP} . 

# Add an env to save ARG
ENV APP_MAIN_FILE=./dist/main.js

# Устанавливаем команду запуска для production
CMD ["node", "${APP_MAIN_FILE}"]