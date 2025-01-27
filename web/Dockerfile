FROM node:18 as builder
WORKDIR /code

COPY package.json package.json
##COPY package-lock.json package-lock.json
RUN npm install --force

RUN npm install -g @angular/cli@16.1.4

FROM node:18 as prod
WORKDIR /code

COPY . .
COPY --from=builder /code/node_modules ./node_modules
#configurando la fecha
ENV TZ=America/La_Paz
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 4200
CMD [ "npm", "start"]
