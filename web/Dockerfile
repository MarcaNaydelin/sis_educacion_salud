#Version del node
FROM node:18-alpine
# Directorio en el que se trabaja
WORKDIR /code
#copia y pega
COPY . ./

RUN npm install -g @angular/cli@16.1.4
##COPY package-lock.json package-lock.json
RUN npm install

COPY . .

CMD [ "ng","serve", "--host","0.0.0.0"]
