FROM node:21-alpine AS base 

# development stage
FROM base AS development 
ARG APP 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app 
COPY nest-mono-applications .   
RUN npm install 
RUN npm run build ${APP}

# production stage
FROM base AS production 
ARG APP 
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV} 
WORKDIR /usr/src/app 
COPY nest-mono-applications . 
RUN npm install --prod
COPY --from=development /usr/src/app/dist ./dist 
 
# Add an env to save ARG
ENV APP_MAIN_FILE=${APP}/dist/main 
CMD node ${APP_MAIN_FILE}